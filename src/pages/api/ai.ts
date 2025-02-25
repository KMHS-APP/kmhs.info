import type { APIRoute } from "astro";

interface RequestBody {
    content: string;
}

export const POST: APIRoute = async ({ locals, request }) => {
    const { AI } = locals.runtime.env;

    try {
        const { content }: RequestBody = await request.json() as RequestBody;

        const messages = [
            { role: "system", content: "You are a friendly assistant" },
            { role: "user", content },
        ];

        const output = await AI.run("@cf/google/gemma-7b-it-lora", {
            messages,
            stream: false,
        });

        return new Response(JSON.stringify(output), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
};
