-- Row Level Security (RLS) Policies
-- Run this AFTER setup-database.sql
-- This creates basic access control policies

-- ============================================
-- USERS TABLE POLICIES
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Admins can read all users
CREATE POLICY "Admins can read all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can manage all users
CREATE POLICY "Admins can manage all users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================
-- HUBS TABLE POLICIES
-- ============================================

-- Authenticated users can read hubs
CREATE POLICY "Authenticated users can read hubs" ON hubs
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admins and hub managers can manage hubs
CREATE POLICY "Admins and hub managers can manage hubs" ON hubs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager')
        )
    );

-- ============================================
-- CUSTOMERS TABLE POLICIES
-- ============================================

-- Admins, managers, and supervisors can read all customers
CREATE POLICY "Managers can read all customers" ON customers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor')
        )
    );

-- Salesmen can read customers in their assigned routes
CREATE POLICY "Salesmen can read route customers" ON customers
    FOR SELECT USING (
        route_id IN (
            SELECT id FROM routes
            WHERE assigned_user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor')
        )
    );

-- Admins and managers can manage customers
CREATE POLICY "Admins can manage customers" ON customers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager')
        )
    );

-- ============================================
-- PRODUCTS TABLE POLICIES
-- ============================================

-- Authenticated users can read products
CREATE POLICY "Authenticated users can read products" ON products
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admins and hub managers can manage products
CREATE POLICY "Admins can manage products" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager')
        )
    );

-- ============================================
-- PRICE LISTS POLICIES
-- ============================================

-- Authenticated users can read price lists
CREATE POLICY "Authenticated users can read price lists" ON price_lists
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admins can manage price lists
CREATE POLICY "Admins can manage price lists" ON price_lists
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================
-- INVENTORY TABLE POLICIES
-- ============================================

-- Users can read inventory for their hub
CREATE POLICY "Users can read hub inventory" ON inventory
    FOR SELECT USING (
        hub_id IN (
            SELECT hub_id FROM users WHERE id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager')
        )
    );

-- Hub managers and admins can manage inventory
CREATE POLICY "Managers can manage inventory" ON inventory
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager')
        )
    );

-- ============================================
-- ORDERS TABLE POLICIES
-- ============================================

-- Salesmen can create orders
CREATE POLICY "Salesmen can create orders" ON orders
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can read their own orders
CREATE POLICY "Users can read own orders" ON orders
    FOR SELECT USING (user_id = auth.uid());

-- Admins and managers can read all orders
CREATE POLICY "Managers can read all orders" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor', 'finance')
        )
    );

-- Salesmen can update their own orders (if not invoiced)
CREATE POLICY "Salesmen can update own orders" ON orders
    FOR UPDATE USING (
        user_id = auth.uid() 
        AND status != 'invoiced'
    );

-- ============================================
-- INVOICES TABLE POLICIES
-- ============================================

-- Users can read invoices they created
CREATE POLICY "Users can read own invoices" ON invoices
    FOR SELECT USING (user_id = auth.uid());

-- Admins and managers can read all invoices
CREATE POLICY "Managers can read all invoices" ON invoices
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor', 'finance')
        )
    );

-- Admins and finance can manage invoices
CREATE POLICY "Admins can manage invoices" ON invoices
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'finance')
        )
    );

-- ============================================
-- PAYMENTS TABLE POLICIES
-- ============================================

-- Users can read payments they collected
CREATE POLICY "Users can read own payments" ON payments
    FOR SELECT USING (user_id = auth.uid());

-- Users can create payments
CREATE POLICY "Users can create payments" ON payments
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admins and managers can read all payments
CREATE POLICY "Managers can read all payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor', 'finance')
        )
    );

-- Finance and admins can manage payments
CREATE POLICY "Finance can manage payments" ON payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'finance')
        )
    );

-- ============================================
-- ATTENDANCE TABLE POLICIES
-- ============================================

-- Users can read their own attendance
CREATE POLICY "Users can read own attendance" ON attendance
    FOR SELECT USING (user_id = auth.uid());

-- Users can create their own attendance records
CREATE POLICY "Users can create own attendance" ON attendance
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own attendance (checkout)
CREATE POLICY "Users can update own attendance" ON attendance
    FOR UPDATE USING (user_id = auth.uid());

-- Managers can read all attendance
CREATE POLICY "Managers can read all attendance" ON attendance
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor')
        )
    );

-- ============================================
-- LOCATION TRACKING POLICIES
-- ============================================

-- Users can create their own location tracking
CREATE POLICY "Users can create own location" ON location_tracking
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can read their own location history
CREATE POLICY "Users can read own location" ON location_tracking
    FOR SELECT USING (user_id = auth.uid());

-- Managers can read all location tracking
CREATE POLICY "Managers can read all location" ON location_tracking
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor')
        )
    );

-- ============================================
-- ROUTES TABLE POLICIES
-- ============================================

-- Authenticated users can read routes
CREATE POLICY "Authenticated users can read routes" ON routes
    FOR SELECT USING (auth.role() = 'authenticated');

-- Salesmen can read their assigned routes
CREATE POLICY "Salesmen can read assigned routes" ON routes
    FOR SELECT USING (
        assigned_user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager', 'supervisor')
        )
    );

-- Admins and supervisors can manage routes
CREATE POLICY "Admins can manage routes" ON routes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'supervisor')
        )
    );

-- ============================================
-- PRODUCT RETURNS POLICIES
-- ============================================

-- Users can create returns
CREATE POLICY "Users can create returns" ON product_returns
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can read their own returns
CREATE POLICY "Users can read own returns" ON product_returns
    FOR SELECT USING (user_id = auth.uid());

-- Managers can read and approve returns
CREATE POLICY "Managers can manage returns" ON product_returns
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND role IN ('admin', 'hub_manager')
        )
    );

-- ============================================
-- SYNC QUEUE POLICIES
-- ============================================

-- Users can manage their own sync queue
CREATE POLICY "Users can manage own sync queue" ON sync_queue
    FOR ALL USING (user_id = auth.uid());

-- ============================================
-- NOTES
-- ============================================

-- These are basic policies. You may need to adjust based on:
-- 1. Your specific business requirements
-- 2. Multi-tenant needs (if supporting multiple companies)
-- 3. Data isolation requirements
-- 4. Audit and compliance needs

-- To test policies, use:
-- SET ROLE authenticated;
-- SELECT * FROM users;
-- RESET ROLE;

