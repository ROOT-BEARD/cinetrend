import { createClient } from "@supabase/supabase-js";
//connects to the supabase project via API key
export const supabase = createClient(
    'https://zvyvrpmouxztsxhpijxc.supabase.co',
    'sb_publishable_pZpOffC-Qp5oe2AQuABaCw_lLQDhkyR'
);