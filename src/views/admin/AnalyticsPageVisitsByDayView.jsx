import { useState, useEffect } from 'react';

import { getAnalyticsPageVisitsByDayApi } from '../../api/analytics';

import './AnalyticsPageVisitsByDayView.css';

function formatDate(date, option) {
    switch (option) {
        case 'text':
            const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }
            return date.toLocaleString('fr-fr', options)
        case 'numeric':
        default:
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}-${month}-${day}`;
    }
}
function Table({ data }) {
    function Row({ datum }) {
        return <tr>
            <td style={{ textAlign: 'left' }}>{formatDate(new Date(datum?.day), 'text')}</td>
            <td style={{ textAlign: 'right' }}>{datum?.total_visits}</td>
        </tr>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th style={{ textAlign: 'left' }}>Day</th>
                    <th style={{ textAlign: 'right' }}>Total Visits</th>
                </tr>
            </thead>
            <tbody>
                {data?.map(datum => <Row datum={datum} />)}
            </tbody>
        </table>
    )
}
function AnalyticsPageVisitsByDayView() {
    const [data, setData] = useState(undefined);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        async function getAnalyticsPageVistsByDay() {
            setLoading(true);
            const data = await getAnalyticsPageVisitsByDayApi();
            setData(data);
            setLoading(false);
        }
        getAnalyticsPageVistsByDay();
    }, []);
    return (
        <div className="analytics-page-visits-by-day-view">
            {isLoading ? 'Loading...' : <div><Table data={data} /></div>}
        </div>
    )
}

export default AnalyticsPageVisitsByDayView;