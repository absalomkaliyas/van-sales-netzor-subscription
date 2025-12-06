-- Fix: Add foreign key constraint for customers.price_list_id
-- Run this in Supabase SQL Editor

-- Add foreign key constraint if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'fk_customers_price_list'
    ) THEN
        ALTER TABLE customers 
        ADD CONSTRAINT fk_customers_price_list 
        FOREIGN KEY (price_list_id) 
        REFERENCES price_lists(id) 
        ON DELETE SET NULL;
    END IF;
END $$;

-- Verify the constraint was added
SELECT 
    conname as constraint_name,
    conrelid::regclass as table_name,
    confrelid::regclass as referenced_table
FROM pg_constraint
WHERE conname = 'fk_customers_price_list';


