export default class User {
    loggedIn = false
    id = null
    userName = null
    role = null

    constructor() {}

    set loggedIn(loggedIn) {
        this.loggedIn = loggedIn
    }

    set id(id) {
        this.id = id
    }

    set userName(userName) {
        this.userName = userName
    }

    set role(role) {
        this.role = role
    }
}