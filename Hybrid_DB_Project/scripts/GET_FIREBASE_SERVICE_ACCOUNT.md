# How to Get Firebase Service Account JSON

## Step-by-Step Instructions

### Step 1: Go to Firebase Console
1. Open your browser and go to: https://console.firebase.google.com/
2. Sign in with your Google account

### Step 2: Select Your Project
1. Click on your project: **dbms-f81b8**
   - If you don't see it, make sure you're logged in with the correct account

### Step 3: Open Project Settings
1. Click the **gear icon (⚙️)** in the top left corner (next to "Project Overview")
2. Select **Project settings** from the dropdown menu

### Step 4: Navigate to Service Accounts Tab
1. In the Project settings page, click on the **"Service accounts"** tab
   - It's located at the top of the settings page, next to "General", "Cloud Messaging", etc.

### Step 5: Generate New Private Key
1. Scroll down to the section titled **"Firebase Admin SDK"**
2. You'll see a code snippet and a button
3. Click the button that says **"Generate new private key"**
   - It's usually a blue button

### Step 6: Confirm and Download
1. A warning dialog will appear saying: "You are about to generate a new private key..."
2. Click **"Generate key"** to confirm
3. A JSON file will automatically download to your computer
   - The filename will look like: `dbms-f81b8-firebase-adminsdk-xxxxx-xxxxxxxxxx.json`

### Step 7: Save the File Securely
1. **IMPORTANT:** Move the downloaded file to a secure location
2. Recommended location: `Hybrid_DB_Project/scripts/`
3. Rename it to something simple like: `firebase-service-account.json`
4. **NEVER commit this file to git!** (It's already in .gitignore)

### Step 8: Verify the File
The JSON file should contain:
- `type`: "service_account"
- `project_id`: "dbms-f81b8"
- `private_key_id`: (a long string)
- `private_key`: (starts with "-----BEGIN PRIVATE KEY-----")
- `client_email`: (ends with @dbms-f81b8.iam.gserviceaccount.com)
- And other fields

### Security Notes
⚠️ **CRITICAL:**
- This file gives full admin access to your Firebase project
- Never share it publicly
- Never commit it to version control
- Keep it secure and private
- If compromised, delete it and generate a new one immediately

### Alternative: Using Firebase CLI
If you prefer using the command line:

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize (if needed)
firebase init

# The service account can also be accessed via gcloud CLI
```

---

## After Getting the Service Account JSON

Once you have the file:

1. **Place it in:** `Hybrid_DB_Project/scripts/firebase-service-account.json`

2. **Seed Firestore:**
   ```bash
   cd Hybrid_DB_Project/scripts
   node seed_firestore.js firebase-service-account.json
   ```

3. **Update Backend .env:**
   - Add to `Hybrid_DB_Project/backend/.env`:
   ```
   FIREBASE_SERVICE_ACCOUNT_PATH=../scripts/firebase-service-account.json
   ```

4. **Restart Backend** to enable Firebase Admin features

---

## Troubleshooting

### "File not found" error
- Check the file path is correct
- Use absolute path if relative path doesn't work
- On Windows, use forward slashes or escaped backslashes

### "Permission denied" error
- Make sure the service account has proper permissions in Firebase Console
- Check Firestore is enabled in your Firebase project
- Verify the project ID matches: `dbms-f81b8`

### "Invalid credentials" error
- Regenerate the service account JSON
- Make sure you downloaded the correct file
- Verify the file wasn't corrupted during download

