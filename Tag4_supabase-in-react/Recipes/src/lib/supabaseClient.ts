import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function createClient() {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();
