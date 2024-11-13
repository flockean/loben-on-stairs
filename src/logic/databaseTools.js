import {createRxDatabase, RxDatabase} from 'rxdb';
import {getRxStorageDexie} from 'rxdb/plugins/storage-dexie';
import {feedSchema, userSchema} from "./collections";
import {wrappedKeyEncryptionCryptoJsStorage} from "rxdb/plugins/encryption-crypto-js";

// import {createRxServer} from 'rxdb-server/plugins/server';
// import {RxServerAdapterExpress} from 'rxdb-server/plugins/adapter-express';


const encryptedDexieStorage = wrappedKeyEncryptionCryptoJsStorage({
    storage: getRxStorageDexie()
});

export async function createLobenDB() : Promise<RxDatabase> {
    const lobenDatabase = await createRxDatabase({
        name: 'lobendatabase',
        storage: encryptedDexieStorage,
        // This is cursed, change to env variable if possible e.g. process.env.VAR (does not work on my machine ;( )
        password: "LobenOnStairs123",
        multiInstance: true
    });
    console.log("Database created")

    await lobenDatabase.addCollections({
        feed: {name: 'feed', schema: feedSchema},
        user: {name: 'user', schema: userSchema}
    });
    console.log("Collections added")

    try {
        const UserAnon = await lobenDatabase.user.insert({
            name: 'Anonymous',
            password: 'Anonymous'
        });
        console.log("Anonymous added: " + UserAnon.name);
    } catch (err) {
        console.log("Anonymous is already added");
    }

    // This Smashes the Browser of the User with Mock-Data, find Workaround

    // try {
    //     MOCK_FEED.map(async post => {
    //         try {
    //         await lobenDatabase.feed.insert({
    //             id: post.id,
    //             username: post.username,
    //             fromUsername: 'Anonymous',
    //             caption: post.caption,
    //             timestamp: new Date().toISOString(),
    //             comments: post.comments
    //         })
    //     } catch (err) {
    //             console.log("I Love try catch")
    //         }
    //     })
    // } catch (err) {
    //     console.log(err)
    // }


    // const lobenServer = await createRxServer({
    //     database: lobenDatabase,
    //     adapter: RxServerAdapterExpress,
    //     port: 443
    // });
    // console.log("RxServer started")
    //
    // const feedEndpoint = lobenServer.addReplicationEndpoint({
    //     name: 'feedEndpoint',
    //     collection: feedSchema
    // });
    // console.log("feedEndpoint created" + feedEndpoint.toString())
    //
    // const userEndpoint = lobenServer.addReplicationEndpoint({
    //     name: 'userEndpoint',
    //     collection: userSchema
    // });
    // console.log("userEndpoint created" + userEndpoint.toString())

    return lobenDatabase
}





