-- Add Sample Price Lists
-- Run this in Supabase SQL Editor

-- Insert 5 sample price lists
INSERT INTO price_lists (name, description, is_default) VALUES
('Standard Price List', 'Default pricing for regular customers', true),
('Wholesale Price List', 'Special pricing for wholesale customers with bulk orders', false),
('Retail Price List', 'Pricing for retail customers and small shops', false),
('Premium Price List', 'Premium pricing for high-value customers', false),
('Promotional Price List', 'Special promotional pricing for limited time offers', false)
ON CONFLICT DO NOTHING;

-- Verify price lists were added
SELECT id, name, description, is_default, created_at 
FROM price_lists 
ORDER BY is_default DESC, created_at;

