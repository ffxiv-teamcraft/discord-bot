import * as admin from 'firebase-admin';

// const serviceAccount = require(process.env.SERVICE_ACCOUNT);

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
        if (DatabaseCommand.APP === undefined) {
        //    DatabaseCommand.APP = admin.initializeApp({
        //        credential: admin.credential.cert(serviceAccount),
        //        databaseURL: 'https://ffxivteamcraft.firebaseio.com'
        //   });
        }
    }
}