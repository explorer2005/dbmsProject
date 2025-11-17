# 🔥 How to Enable Firestore API

## Quick Fix

The error message shows that Firestore API needs to be enabled. Here's how:

## Method 1: Enable via Google Cloud Console (Recommended)

1. **Click this link:**
   ```
   https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=dbms-f81b8
   ```

2. **Click the "ENABLE" button** (big blue button)

3. **Wait 2-3 minutes** for the API to be activated

4. **Run the seeding script again:**
   ```powershell
   cd Hybrid_DB_Project\scripts
   node seed_firestore.js firebase-service-account.json
   ```

## Method 2: Enable via Firebase Console

1. Go to: https://console.firebase.google.com/
2. Select your project: **dbms-f81b8**
3. In the left sidebar, click **"Firestore Database"**
4. Click **"Create database"** button
5. Choose:
   - **Production mode** (for real app) or
   - **Test mode** (for development - allows all reads/writes for 30 days)
6. Select a **location** (choose closest to you)
7. Click **"Enable"**
8. Wait 2-3 minutes
9. Run the seeding script again

## After Enabling

Once Firestore is enabled, run:

```powershell
cd Hybrid_DB_Project\scripts
node seed_firestore.js firebase-service-account.json
```

You should see:
```
✓ Firebase Admin initialized successfully
🚀 Starting Firestore seeding...
📦 Seeding products_cache collection...
✓ Successfully seeded 6 products to products_cache
🔔 Seeding notifications collection...
✓ Successfully seeded 5 notifications
✅ Firestore seeding completed successfully!
```

## Troubleshooting

- **Still getting errors?** Wait 5-10 minutes after enabling, APIs can take time to propagate
- **Permission denied?** Make sure you're using the correct service account JSON
- **API not found?** Make sure you're logged into the correct Google account

