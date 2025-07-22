export interface SupabaseResponse<T> {
  data: T | null; // The actual data returned by Supabase
  error: any; // Error object, if any
  status: number; // HTTP status code
  statusText: string; // HTTP status text
}
