export const feedSchema = {
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

export const userSchema = {
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
                gelobt: {
                    type: 'string'
                }
            }
        },
    },
    required: ['name', 'password'],
    encrypted: ['password']
}