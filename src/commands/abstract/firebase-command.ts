import * as admin from 'firebase-admin';

export abstract class FirebaseCommand {
    protected static APP: admin.app.App;

    protected get auth(): admin.auth.Auth {
        return FirebaseCommand.APP.auth();
    }

    protected get rtdb(): admin.database.Database {
        return FirebaseCommand.APP.database();
    }

    protected get firestore(): admin.firestore.Firestore {
        return FirebaseCommand.APP.firestore();
    }

    protected constructor() {
        try {
            const serviceAccount = require(process.env.SERVICE_ACCOUNT);
            if (FirebaseCommand.APP === undefined && serviceAccount) {
                FirebaseCommand.APP = admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: 'https://ffxivteamcraft.firebaseio.com'
                });
            }
        } catch (e) {
            // You don't have a service account, well, no db commands for you.
        }
    }
}
