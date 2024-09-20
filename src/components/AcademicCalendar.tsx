import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface AcademicEvent {
    EVENT_NM: string;
    EVENT_CNTNT: string;
    AA_YMD: string;
}

const AcademicCalendar: React.FC = () => {
    const [academicEvents, setAcademicEvents] = useState<AcademicEvent[]>([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log('useEffect called'); // useEffect가 호출되는지 확인
        async function fetchAcademicCalendar() {
            try {
                console.log('Fetching academic calendar'); // fetch 요청이 시작되는지 확인
                const response = await fetch('https://open.neis.go.kr/hub/SchoolSchedule?KEY=4e1af35dc1954eb8aaf573eff8653c43&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531381&AA_FROM_YMD=20240301&AA_TO_YMD=20241231&pSize=365');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('API response:', data); // API 응답을 콘솔에 출력
                if (data.SchoolSchedule && data.SchoolSchedule[1] && data.SchoolSchedule[1].row) {
                    setAcademicEvents(data.SchoolSchedule[1].row);
                } else {
                    console.log('No events found in API response');
                }
            } catch (error) {
                console.error('Error fetching academic calendar:', error);
            }
        }
        fetchAcademicCalendar().catch(error => console.error('Error in useEffect:', error));
    }, []);

    const tileContent = ({ date, view }: { date: Date, view: 'month' | 'year' | 'decade' | 'century' }) => {
        if (view === 'month') {
            const event = academicEvents.find(event => new Date(event.AA_YMD).toISOString().split('T')[0] === date.toISOString().split('T')[0]);
            return event ? <p>{event.EVENT_NM}</p> : null;
        }
    };

    return (
        <div>
            <h1>Academic Calendar</h1>
            <Calendar
                onChange={(value) => setDate(value as Date)}
                value={date}
                tileContent={tileContent}
            />
        </div>
    );
};

export default AcademicCalendar;
