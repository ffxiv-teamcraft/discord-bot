import * as admin from 'firebase-admin';

export abstract class DatabaseCommand {
    protected static APP: admin.app.App;

    protected get auth(): admin.auth.Auth {
        return DatabaseCommand.APP.auth();
    }

    protected get rtdb(): admin.database.Database {
        return DatabaseCommand.APP.database();
    }

    protected get firestore(): admin.firestore.Firestore {
        return DatabaseCommand.APP.firestore();
    }

    protected constructor() {
        try {
            const serviceAccount = require(process.env.SERVICE_ACCOUNT);
            if (DatabaseCommand.APP === undefined && serviceAccount !== {}) {
                DatabaseCommand.APP = admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: 'https://ffxivteamcraft.firebaseio.com'
                });
            }
        } catch (e) {
            // You don't have a service account, well, no db commands for you.
        }
    }
}
