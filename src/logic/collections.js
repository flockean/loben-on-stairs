
export class Comment {

    constructor(id, commentTimestamp, commentWriter, text) {
        this.id = id
        this.commentTimestamp = commentTimestamp
        this.commentWriter = commentWriter
        this.comment = text
    }
}

export class Post {

    constructor(id, timestamp, username, byUser, avatar, image, caption, comments) {
        this.id = id
        this.timestamp = timestamp
        this.username = username
        this.caption = caption
        this.byUser = byUser
        this.image = image
        this.comments = comments
    }
}

export class UserModel {
    constructor(id, creation, name, password, avatar, profile) {
        this.id = id
        this.creation = creation
        this.name = name
        this.password = password
        this.avatar = avatar
        this.profile = profile
    }
}