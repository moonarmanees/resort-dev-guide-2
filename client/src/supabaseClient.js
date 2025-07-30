// client/src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bzwbgulnrwqxtoxjwtfw.supabase.co'
const supabaseAnonKey = 'SECRET_REMOVED'


// Validate the key format
if (!supabaseAnonKey.startsWith('eyJ')) {
  console.error('❌ API key does not start with eyJ - this is not a valid JWT token');
} else {
  console.log('✅ API key format looks correct');
}

console.log('🔧 Debug Info:');
console.log('Supabase URL:', supabaseUrl);
console.log('Key length:', supabaseAnonKey.length);
console.log('Key preview:', `${supabaseAnonKey.substring(0, 20)}...${supabaseAnonKey.substring(supabaseAnonKey.length - 10)}`);

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase connection test failed:', error.message);
  } else {
    console.log('✅ Supabase connection test successful');
  }
});