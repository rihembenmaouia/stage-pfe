import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://npouyrppjqbxifuvpqan.supabase.co"
const supabaseAnonKey = "sb_secret_i1bGnoLOPvDPJuHfiV4znw_ynOW3raJ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)