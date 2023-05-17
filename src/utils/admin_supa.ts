import { createClient } from '@supabase/supabase-js';

// Need to create a user client...
export const admin_client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
