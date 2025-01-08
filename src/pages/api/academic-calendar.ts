import type { APIRoute } from "astro";

// @ts-ignore
export const GET: APIRoute = async () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const year = today.getMonth() < 2 ? currentYear - 1 : currentYear; // 3월 1일 이전이면 전년도 사용
  const fromDate = `${year}0301`;
  const toDate = `${year}1231`;
  const response = await fetch(
    `https://open.neis.go.kr/hub/SchoolSchedule?KEY=4e1af35dc1954eb8aaf573eff8653c43&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531381&AA_FROM_YMD=${fromDate}&AA_TO_YMD=${toDate}&pSize=365`,
  );
  const data = await response.json();
  return new Response(JSON.stringify(data.SchoolSchedule[1].row), {
    status: 200,
  });
};
