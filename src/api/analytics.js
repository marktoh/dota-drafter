import { supabase } from "../utils/supabase";
import { logApi } from "../utils/api_logger";

async function trackAnalytics(event, email, credentials, user_agent) {
    const { error } = await supabase.from('analytics_events').upsert({ event, email, credentials, user_agent });
    logApi(`trackAnalytics`, error);
    return error;
}

async function trackPage(page, email, user_agent) {
    const { error } = await supabase.from('analytics_page_visits').upsert({ page, email, user_agent });
    logApi(`trackPage`, error);
    return error;
}

export {
    trackPage,
    trackAnalytics
}