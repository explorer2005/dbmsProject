# Firebase Setup Instructions

## Service Account JSON File

To seed Firestore using the admin SDK, you need a **Service Account JSON** file (different from the web config).

### How to Get Service Account JSON:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **dbms-f81b8**
3. Click the gear icon ⚙️ → **Project settings**
4. Go to the **Service accounts** tab
5. Click **Generate new private key**
6. Save the downloaded JSON file (e.g., `dbms-f81b8-firebase-adminsdk.json`)
7. Place it in a secure location (e.g., `Hybrid_DB_Project/scripts/`)

### Security Note:
- **NEVER commit the service account JSON to version control**
- Add it to `.gitignore`
- Store it with restricted permissions (600 on Linux/Mac)

### Running the Seed Script:

Once you have the service account JSON file:

```bash
cd Hybrid_DB_Project/scripts
node seed_firestore.js <path-to-service-account.json>
```

Example:
```bash
node seed_firestore.js ./dbms-f81b8-firebase-adminsdk.json
```

### What Gets Seeded:

- **products_cache** collection: 6 sample products (synced from PostgreSQL)
- **notifications** collection: 5 sample notifications

The script will verify the seeding and print confirmation messages.

