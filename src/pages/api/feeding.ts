import type { APIRoute } from "astro";

// @ts-ignore
export const GET: APIRoute = async () => {
  const currentYear = new Date().getFullYear();
  const fromDate = `${currentYear}0101`;
  const toDate = `${currentYear}1231`;
  const response = await fetch(
    `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=4e1af35dc1954eb8aaf573eff8653c43&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531381&MLSV_FROM_YMD=${fromDate}&MLSV_TO_YMD=${toDate}&pSize=365`,
  );
  const data = await response.json();
  return new Response(JSON.stringify(data.mealServiceDietInfo[1].row), {
    status: 200,
  });
};
