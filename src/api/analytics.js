import { supabase } from "../utils/supabase";
import { logApi } from "../utils/api_logger";

async function trackAnalytics(event, email, credentials, user_agent) {
  const { error } = await supabase
    .from("analytics_events")
    .upsert({ event, email, credentials, user_agent });
  logApi(`trackAnalytics`, error);
  return error;
}

async function trackPage(page, email, user_agent) {
  const { error } = await supabase
    .from("analytics_page_visits")
    .upsert({ page, email, user_agent });
  logApi(`trackPage`, error);
  return error;
}

async function getAnalyticsEventsApi() {
  const { data, error } = await supabase
    .from("analytics_events")
    .select()
    .order("id", { ascending: false });
  logApi(`getAnalyticsEventsApi`, error, data);
  return data;
}

async function getAnalyticsPageVisitsApi() {
  const { data, error } = await supabase
    .from("analytics_page_visits")
    .select()
    .order("id", { ascending: false });
  logApi(`getAnalyticsPageVisitsApi`, error, data);
  return data;
}

async function getAnalyticsPageVisitsByDayApi() {
  const { data, error } = await supabase
    .from("analytics_page_visits_by_day_view")
    .select();
  logApi(`getAnalyticsPageVisitsByDayApi`, error, data);
  return data;
}

export {
  trackPage,
  trackAnalytics,
  getAnalyticsEventsApi,
  getAnalyticsPageVisitsApi,
  getAnalyticsPageVisitsByDayApi,
};
