export default class User {
    loggedIn = false
    id = null
    role = null
    
    constructor() {}

    set loggedIn(loggedIn) {
        this.loggedIn = loggedIn
    }

    set id(id) {
        this.id = id
    }

    set role(role) {
        this.role = role
    }
}