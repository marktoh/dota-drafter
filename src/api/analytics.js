import { supabase } from "../utils/supabase";
import { logApi } from "../utils/api_logger";

async function trackAnalytics(event, email, analytics) {
    const { error } = await supabase.from('analytics').upsert({ event, email, analytics });
    logApi(`trackAnalytics`, error);
    return error;
}

export {
    trackAnalytics
}