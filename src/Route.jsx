import { Link, Navigate, Outlet } from "react-router-dom";

import "./Route.css";

function Protected({ isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
}
function AdminLayout() {
  return (
    <div className="admin">
      <nav className="admin-navbar">
        <Link to="/admin/analytics/events">Events</Link>
        <Link to="/admin/analytics/page-visits">Page Visits</Link>
        <Link to="/admin/analytics/page-visits-by-day">Page Visits By Day</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export { Protected, AdminLayout };
