import { supabase } from '../utils/supabase';
import { logApi } from '../utils/api_logger';

async function getMatchup({ table_id, main_hero_id, secondary_hero_id }) {
    const { data, error } = await supabase
    .from(`${table_id}_view`)
    .select().match({ main_hero_id, secondary_hero_id });
    logApi(`getPairings ${table_id}`, error, data);
    return data?.[0];
}

async function getPairings({ table_id, main_hero_id }) {
    const { data, error } = await supabase
    .from(`${table_id}_view`)
    .select().match({ main_hero_id });
    logApi(`getPairings ${table_id}`, error, data);
    return data;
}

async function upsertPairings({ table_id, main_hero_id, secondary_hero_id, description }) {
    const { error } = await supabase
    .from(table_id)
    .upsert({ main_hero_id, secondary_hero_id, description })
    logApi(`upsertPairings ${table_id}`, error);
    return error;
}

async function removePairings({ table_id, main_hero_id, secondary_hero_id }) {
    const { error } = await supabase.from(table_id).delete().match({ main_hero_id, secondary_hero_id })
    logApi(`removePairings ${table_id}`, error);
    return error;
}

export {
    getMatchup,
    getPairings,
    upsertPairings,
    removePairings
}