-- Fix Orders RLS Policies
-- Allow admins and managers to create orders
-- Run this in Supabase SQL Editor

-- Drop existing insert policy
DROP POLICY IF EXISTS "Salesmen can create orders" ON orders;

-- Create new policy that allows admins and managers to create orders
CREATE POLICY "Users can create orders" ON orders
    FOR INSERT WITH CHECK (
        user_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor')
        )
    );

-- Also allow admins to update any order (not just their own)
DROP POLICY IF EXISTS "Salesmen can update own orders" ON orders;

CREATE POLICY "Users can update orders" ON orders
    FOR UPDATE USING (
        user_id = auth.uid() 
        AND status != 'invoiced'
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor')
        )
    );

-- Verify policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'orders'
ORDER BY policyname;


