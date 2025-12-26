import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Admin client with service role key (for backend operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper to get user from JWT token
export const getUserFromToken = async (token) => {
  if (!token) {
    throw new Error('No token provided');
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  
  if (error || !user) {
    throw new Error('Invalid token or user not found');
  }

  return user;
};
