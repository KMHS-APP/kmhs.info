addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname.split("/");

  if (request.method === "OPTIONS") {
    return handleOptions(request);
  } else if (request.method === "POST" && path[1] === "shorten") {
    return handleShorten(request);
  } else if (request.method === "GET" && path[1]) {
    return handleRedirect(path[1]);
  } else {
    return new Response("Not Found", {
      status: 404,
      headers: getCorsHeaders(),
    });
  }
}

async function handleShorten(request) {
  const { url } = await request.json();
  const shortId = generateShortId();
  // @ts-ignore
  await LINKS.put(shortId, url);
  const shortUrl = `${new URL(request.url).origin}/${shortId}`;
  return new Response(JSON.stringify({ shortUrl }), {
    headers: getCorsHeaders(),
  });
}

async function handleRedirect(shortId) {
  // @ts-ignore
  const url = await LINKS.get(shortId);
  if (url) {
    return Response.redirect(url, 302, { headers: getCorsHeaders() });
  } else {
    return new Response("URL not found", {
      status: 404,
      headers: getCorsHeaders(),
    });
  }
}

function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function generateShortId() {
  return Math.random().toString(36).substring(2, 8);
}
