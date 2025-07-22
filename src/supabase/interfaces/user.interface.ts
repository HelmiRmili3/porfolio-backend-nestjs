export interface User {
  id: string; // UUID from Supabase
  email: string;
  created_at: string; // Timestamp
  updated_at: string; // Timestamp
  username?: string; // Optional field
  avatar_url?: string; // Optional field
}
