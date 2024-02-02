import { useState, useEffect } from "react";

import { getAnalyticsPageVisitsApi } from "../../api/analytics";

import "./AnalyticsPageVisitsView.css";

function Table({ data }) {
  function Row({ datum }) {
    const { id, email, page, user_agent, created_at } = datum;
    return (
      <tr>
        <td>{id}</td>
        <td>{email}</td>
        <td>{page}</td>
        <td className="concise">{user_agent}</td>
        <td>{new Date(created_at).toLocaleString()}</td>
      </tr>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <td>Email</td>
          <td>Page</td>
          <td>User Agent</td>
          <td>Date Created</td>
        </tr>
      </thead>
      <tbody>
        {data?.map((datum) => (
          <Row key={datum?.id} datum={datum} />
        ))}
      </tbody>
    </table>
  );
}
function AnalyticsPageVisitsView() {
  const [pageVisits, setPageVisits] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getPageVisits() {
      setIsLoading(true);
      const data = await getAnalyticsPageVisitsApi();
      setPageVisits(data);
      setIsLoading(false);
    }
    getPageVisits();
  }, []);
  return (
    <div className="analytics-page-visits-view">
      {isLoading ? "Loading..." : <Table data={pageVisits} />}
    </div>
  );
}

export default AnalyticsPageVisitsView;
