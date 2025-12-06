# 📝 Codemagic Environment Variables - Detailed Instructions

## Adding Environment Variables in Codemagic

When adding environment variables, you'll see a **"Group"** field. Here's what to do:

---

## Option 1: Create a New Group (Recommended)

### For First Variable:
1. **Variable name**: `EXPO_PUBLIC_SUPABASE_URL`
2. **Variable value**: `https://lhledsnjzovhamddrjas.supabase.co`
3. **Group**: 
   - Click the dropdown
   - Click **"Create new group"**
   - Enter name: `expo_secrets`
   - Click "Create"
4. **Click**: "Add"

### For Second Variable:
1. **Variable name**: `EXPO_PUBLIC_SUPABASE_ANON_KEY`
2. **Variable value**: (Your Supabase anon key)
3. **Group**: 
   - Click the dropdown
   - Select: `expo_secrets` (the group you just created)
4. **Click**: "Add"

---

## Option 2: Use Default Group (Simpler)

If you don't want to create a group:

### For First Variable:
1. **Variable name**: `EXPO_PUBLIC_SUPABASE_URL`
2. **Variable value**: `https://lhledsnjzovhamddrjas.supabase.co`
3. **Group**: 
   - Leave as default (usually "Default" or "Common")
   - OR click dropdown and select existing default group
4. **Click**: "Add"

### For Second Variable:
1. **Variable name**: `EXPO_PUBLIC_SUPABASE_ANON_KEY`
2. **Variable value**: (Your Supabase anon key)
3. **Group**: 
   - Select the same default group as above
4. **Click**: "Add"

---

## ✅ Important Notes

- **Group is optional**: The build will work with or without grouping
- **Group name doesn't matter**: You can name it anything (`expo_secrets`, `mobile_app`, `default`, etc.)
- **Both variables must be added**: Make sure you add BOTH variables
- **Group consistency**: If you create a group, use the same group for both variables (easier to manage)

---

## 🎯 Quick Answer

**What to put in Group field?**

**Option A (Easiest)**: 
- Leave it as default/empty
- Or select "Default" from dropdown

**Option B (Organized)**:
- Click "Create new group"
- Name it: `expo_secrets`
- Use this group for both variables

**Both options work!** The group is just for organization - it doesn't affect the build.

---

## 📸 Visual Guide

When you see the form:
```
Variable name: [EXPO_PUBLIC_SUPABASE_URL]
Variable value: [https://lhledsnjzovhamddrjas.supabase.co]
Group: [Dropdown ▼] ← Click here
```

Click the dropdown and either:
- Select existing group (like "Default")
- OR click "Create new group" → Enter name → Create

---

## ✅ After Adding Both Variables

You should see:
- ✅ `EXPO_PUBLIC_SUPABASE_URL` in your variables list
- ✅ `EXPO_PUBLIC_SUPABASE_ANON_KEY` in your variables list

Then you're ready to build! 🚀

