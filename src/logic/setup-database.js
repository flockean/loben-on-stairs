import {createRxDatabase, RxDatabase} from 'rxdb';
import {getRxStorageDexie} from 'rxdb/plugins/storage-dexie';

// import {createRxServer} from 'rxdb-server/plugins/server';
// import {RxServerAdapterExpress} from 'rxdb-server/plugins/adapter-express';

const dbPassword = process.env.DB_PASSWORD;

export async function createLobenDB() : Promise<RxDatabase> {
    const lobenDatabase = await createRxDatabase({
        name: 'lobendatabase',
        storage: getRxStorageDexie(),

        password: dbPassword,
        multiInstance: true
    });
    console.log("Database created")

    const collections = await lobenDatabase.addCollections({
        feed: {name: 'feed', schema: feedSchema},
        user: {name: 'user', schema: userSchema}
    });
    console.log("Collections added")

    if (collections.user.findOne('Anonymous') === null) {
        const UserAnon = await lobenDatabase.user.insert({
            name: 'Anonymous',
            password: 'Anonymous'
        })
        console.log("Anonymous added: " + UserAnon.name)
    }
    console.log("Anonymous already added")




    // const lobenServer = await createRxServer({
    //     database: lobenDatabase,
    //     adapter: RxServerAdapterExpress,
    //     port: 443
    // });
    // console.log("RxServer started")
    //
    // const feedEndpoint = lobenServer.addReplicationEndpoint({
    //     name: 'my-endpoint',
    //     collection: feedSchema
    // });
    // console.log("feedEndpoint created" + feedEndpoint.toString())
    //
    // const userEndpoint = lobenServer.addReplicationEndpoint({
    //     name: 'my-endpoint',
    //     collection: userSchema
    // });
    // console.log("userEndpoint created" + userEndpoint.toString())

    return lobenDatabase
}


const feedSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        username: {
            type: 'string'
        },
        fromUsername: {
            type: 'string'
        },
        caption: {
            type: 'string'
        },
        timestamp: {
            type: 'string',
            format: 'date-time'
        },
        comments: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer'
                    },
                    commentWriter: {
                        type: 'string'
                    },
                    comment: {
                        type: 'string'
                    }
                }
            }
        },
        attachments: {
        }
    },
    required: ['id', 'username', 'fromUsername', 'caption', 'timestamp', 'attachments']
}

const userSchema = {
    version: 0,
    primaryKey: 'name',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 100
        },
        password: {
            type: 'string'
        },
        profile: {
            type: 'object',
            properties: {
                lobe: {
                    type: 'string'
                },
                geLobt: {
                    type: 'string'
                }
            }
        },
    },
    required: ['name', 'password']
}





