import { createClient } from "@supabase/supabase-js";

const getSupabase = (access_token) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  if (access_token) {
    supabase.auth.session = () => ({
      access_token,
    });
  }

  return supabase;
};

export { getSupabase };
