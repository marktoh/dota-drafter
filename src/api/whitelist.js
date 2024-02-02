import { supabase } from "../utils/supabase";
import { logApi } from "../utils/api_logger";

async function getWhitelist({ email }) {
  const { data, error } = await supabase
    .from("edit_whitelist")
    .select()
    .match({ email });
  logApi(`getWhitelist`, error, data);
  return data?.[0];
}

export { getWhitelist };
