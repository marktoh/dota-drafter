import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getAnalyticsPageVisitsByDayApi } from "../../api/analytics";

import "./AnalyticsPageVisitsByDayView.css";

const MyChart = ({ data }) => {
  const formattedData = data
    ?.map((datum) => ({
      ...datum,
      day: new Date(datum?.day).toLocaleDateString(),
    }))
    .reverse();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={formattedData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total_visits"
          stroke="var(--gold)"
          fill="var(--gold)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
/**
 * Reference: https://www.calculatorsoup.com/calculators/algebra/percent-change-calculator.php
 * @param {*} initial_num The old number
 * @param {*} final_num The new number
 * @returns
 */
function getPercentageChange(initial_num, final_num) {
  const numerator = final_num - initial_num;
  const denominator = Math.abs(initial_num);
  const change = numerator / denominator;
  const percentageChange = change * 100;
  return percentageChange;
}
function FigCaption({ data }) {
  function formatText(data) {
    const today = data[0]?.total_visits;
    const yesterday = data[1]?.total_visits;
    const percentageChange = getPercentageChange(yesterday, today).toFixed(0);
    return `There has been a ${Math.abs(percentageChange)}% change in page visits over the past day.`;
  }
  return <figcaption>{formatText(data)}</figcaption>;
}
function AnalyticsPageVisitsByDayView() {
  const [data, setData] = useState([]);
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
  function Display() {
    return (
      <div className="display">
        {isLoading ? (
          "Loading..."
        ) : (
          <figure>
            <MyChart data={data} />
            <FigCaption data={data} />
          </figure>
        )}
      </div>
    );
  }
  return (
    <div className="analytics-page-visits-by-day-view">
      <Display />
    </div>
  );
}

export default AnalyticsPageVisitsByDayView;
