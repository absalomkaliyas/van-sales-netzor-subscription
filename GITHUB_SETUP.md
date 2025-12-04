# Step-by-Step Guide: Setting Up GitHub Cloud Sync

## Prerequisites
- ✅ Git is already initialized in your project
- ✅ You have a GitHub account (if not, create one at https://github.com)

---

## Step 1: Create a New Repository on GitHub

1. **Go to GitHub**: Open your web browser and navigate to https://github.com
2. **Sign in** to your GitHub account
3. **Click the "+" icon** in the top right corner
4. **Select "New repository"** from the dropdown menu
5. **Fill in the repository details**:
   - **Repository name**: `van-sales-netzor-subscription` (or your preferred name)
   - **Description**: (Optional) Add a description like "VAN Sales Netzor Subscription Project"
   - **Visibility**: Choose **Public** or **Private**
   - **⚠️ IMPORTANT**: Do NOT check any of these boxes:
     - ❌ "Add a README file"
     - ❌ "Add .gitignore"
     - ❌ "Choose a license"
   - (Leave all checkboxes unchecked since you already have these files locally)
6. **Click "Create repository"**

---

## Step 2: Copy Your Repository URL

After creating the repository, GitHub will show you a page with setup instructions. You'll see a URL that looks like:
- `https://github.com/yourusername/van-sales-netzor-subscription.git`

**Copy this URL** - you'll need it in the next step.

---

## Step 3: Connect Your Local Repository to GitHub

Open PowerShell in your project directory and run these commands:

### 3a. Add the Remote Repository
Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example** (if your username is `johndoe` and repo is `van-sales-netzor-subscription`):
```powershell
git remote add origin https://github.com/johndoe/van-sales-netzor-subscription.git
```

### 3b. Verify the Remote Was Added
```powershell
git remote -v
```

You should see your repository URL listed.

---

## Step 4: Push Your Code to GitHub

Push your local code to GitHub:

```powershell
git push -u origin main
```

**Note**: If this is your first time using Git with GitHub, you may be prompted to:
- Enter your GitHub username
- Enter a Personal Access Token (password authentication is no longer supported)

### If You Need to Create a Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "VAN Sales Project")
4. Select scopes: Check **"repo"** (this gives full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. When prompted for password in PowerShell, paste the token instead

---

## Step 5: Verify Your Code is on GitHub

1. **Refresh your GitHub repository page** in your browser
2. You should now see:
   - Your `README.md` file
   - Your `.gitignore` file
   - All your project files

---

## Step 6: Future Sync Operations

### To Upload Changes to GitHub:
```powershell
git add .
git commit -m "Description of your changes"
git push
```

### To Download Changes from GitHub:
```powershell
git pull
```

### To Check Status:
```powershell
git status
```

---

## Troubleshooting

### Error: "remote origin already exists"
If you see this error, remove the existing remote first:
```powershell
git remote remove origin
```
Then run Step 3a again.

### Error: "authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Verify the token has "repo" permissions

### Error: "repository not found"
- Double-check the repository URL
- Make sure the repository exists on GitHub
- Verify you have access to the repository

---

## Success! 🎉

Once you've completed these steps, your project is now synced with GitHub. Any changes you make locally can be pushed to GitHub, and you can access your code from anywhere!

