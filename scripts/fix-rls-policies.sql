-- Fix RLS Policies - Remove Infinite Recursion
-- This fixes the circular dependency issue in users table policies

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- Create fixed policies that avoid recursion
-- Use auth.uid() directly instead of querying users table

-- Users can read their own profile (using auth.uid() directly)
CREATE POLICY "Users can read own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Allow all authenticated users to read users table
-- (We'll handle admin checks in application code, not in RLS)
CREATE POLICY "Authenticated users can read users" ON users
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow users to update their own record
CREATE POLICY "Users can update own record" ON users
    FOR UPDATE USING (auth.uid() = id);

-- For admin operations, we'll use service_role key in server-side code
-- This avoids the recursion issue

