import type { APIRoute } from 'astro';
import pkg from 'comcigan.ts';
// @ts-ignore
const { School, Weekday } = pkg;

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const grade = parseInt(url.searchParams.get('grade') || '0');
    const classNum = parseInt(url.searchParams.get('classNum') || '0');

    if (!grade || !classNum) {
        return new Response('Invalid grade or classNum', { status: 400 });
    }

    try {
        const school = await School.fromName('근명고등학교');
        const weekdays = [Weekday.Monday, Weekday.Tuesday, Weekday.Wednesday, Weekday.Thursday, Weekday.Friday];
        const timetable: { [key: string]: any } = {};

        for (const day of weekdays) {
            timetable[Weekday[day]] = await school.getTimetable(grade, classNum, day);
        }

        return new Response(JSON.stringify(timetable), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching timetable:', error);
        return new Response('Error fetching timetable', { status: 500 });
    }
};
