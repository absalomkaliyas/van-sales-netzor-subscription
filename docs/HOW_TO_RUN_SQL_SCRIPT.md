# How to Run the Database Setup Script - Step by Step

## ❌ Common Mistake

**DON'T** type or paste the file path like this:
```
scripts/setup-database.sql
```

**DO** open the file, copy its SQL content, and paste that content.

---

## ✅ Correct Method

### Step 1: Open the SQL File on Your Computer

1. Navigate to your project folder: `B:\VAN Sales Netzor Subscription`
2. Open the folder: `scripts`
3. Open the file: `setup-database.sql`
   - You can use:
     - **VS Code** (if you have it)
     - **Notepad** (Windows)
     - **Notepad++**
     - Any text editor

### Step 2: Select and Copy ALL Content

1. **Select All**: Press `Ctrl + A` (or `Cmd + A` on Mac)
2. **Copy**: Press `Ctrl + C` (or `Cmd + C` on Mac)
3. You should have copied the entire SQL script (about 430 lines)

### Step 3: Go to Supabase SQL Editor

1. Open your Supabase project dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"** button (or use the existing editor)

### Step 4: Paste the SQL Content

1. Click in the SQL Editor text area
2. **Paste**: Press `Ctrl + V` (or `Cmd + V` on Mac)
3. You should see the entire SQL script pasted, starting with:
   ```sql
   -- Field Sales & Automatic Invoicing System
   -- Database Setup Script for Supabase PostgreSQL
   -- Run this script in your Supabase SQL Editor
   
   -- Enable UUID extension
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

### Step 5: Run the Script

1. Look at the bottom right of the SQL Editor
2. Click the **"Run"** button (or press `Ctrl + Enter`)
3. Wait for execution (10-30 seconds)
4. You should see: ✅ **"Success. No rows returned"**

---

## 📋 Visual Guide

```
Your Computer                    Supabase Dashboard
┌─────────────────┐            ┌──────────────────┐
│ setup-database  │            │                  │
│     .sql        │   Copy     │   SQL Editor     │
│                 │  ────────> │                  │
│ CREATE TABLE... │            │ CREATE TABLE...  │
│ CREATE TABLE... │            │ CREATE TABLE...  │
│ ...             │            │ ...              │
└─────────────────┘            └──────────────────┘
     File                          Paste & Run
```

---

## 🔍 Verify You Copied the Right Content

The SQL script should:
- Start with: `-- Field Sales & Automatic Invoicing System`
- Contain: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
- Contain: `CREATE TYPE user_role AS ENUM`
- Contain: `CREATE TABLE users`
- Be about 430 lines long
- End with: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`

---

## 🆘 Alternative: Direct Copy Method

If you're having trouble, here's the file location:

**Full Path**: 
```
B:\VAN Sales Netzor Subscription\scripts\setup-database.sql
```

**Quick Access**:
1. Open File Explorer
2. Navigate to: `B:\VAN Sales Netzor Subscription\scripts\`
3. Right-click `setup-database.sql`
4. Select "Open with" → Choose a text editor
5. Select All → Copy → Paste in Supabase

---

## ✅ Success Indicators

After running, you should see:

1. **In SQL Editor**:
   - ✅ "Success. No rows returned"
   - ✅ Execution time shown (e.g., "1234ms")

2. **In Table Editor**:
   - Go to "Table Editor" in Supabase
   - You should see 20+ tables listed:
     - users
     - hubs
     - customers
     - products
     - orders
     - invoices
     - payments
     - etc.

---

## ❌ If You Still Get Errors

### Error: "syntax error at or near 'scripts'"
- **Cause**: You pasted the file path instead of file content
- **Fix**: Open the file, copy its content, then paste

### Error: "extension already exists"
- **Cause**: Running script multiple times
- **Fix**: ✅ Safe to ignore, continue

### Error: "type already exists"
- **Cause**: Enum types already created
- **Fix**: ✅ Safe to ignore, continue

### Error: "table already exists"
- **Cause**: Tables already created
- **Fix**: Either drop tables first OR ignore and continue

---

## 📝 Quick Checklist

- [ ] Opened `scripts/setup-database.sql` file
- [ ] Selected ALL content (Ctrl+A)
- [ ] Copied content (Ctrl+C)
- [ ] Opened Supabase SQL Editor
- [ ] Pasted content (Ctrl+V)
- [ ] Clicked "Run" button
- [ ] Saw "Success" message
- [ ] Verified tables in Table Editor

---

## 🎯 Next Steps After Success

1. **Run RLS Policies**: Execute `scripts/setup-rls-policies.sql` (same method)
2. **Get API Keys**: Settings → API → Copy credentials
3. **Create Admin User**: Authentication → Users → Add user
4. **Update User Role**: Run SQL to set role to 'admin'

---

**Remember**: You're copying the SQL **code** from the file, not the file path! 📋

