import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vzeyacagvxspqxlybxij.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6ZXlhY2FndnhzcHF4bHlieGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNjA3NjMsImV4cCI6MjA0NDgzNjc2M30.U0oA5hsABGyy1xUFg4chtYlY4g-MFfJ4p88S16qAbbM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
