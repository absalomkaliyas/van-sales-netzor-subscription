-- Fix Invoices RLS Policies
-- Allow admins and managers to create invoices
-- Run this in Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own invoices" ON invoices;
DROP POLICY IF EXISTS "Managers can read all invoices" ON invoices;

-- Allow users to read their own invoices
CREATE POLICY "Users can read own invoices" ON invoices
    FOR SELECT USING (user_id = auth.uid());

-- Allow admins and managers to read all invoices
CREATE POLICY "Managers can read all invoices" ON invoices
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor', 'finance')
        )
    );

-- Allow admins and managers to create invoices
CREATE POLICY "Users can create invoices" ON invoices
    FOR INSERT WITH CHECK (
        user_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor', 'finance')
        )
    );

-- Allow admins and managers to update invoices
CREATE POLICY "Users can update invoices" ON invoices
    FOR UPDATE USING (
        user_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor', 'finance')
        )
    );

-- Verify policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'invoices'
ORDER BY policyname;

