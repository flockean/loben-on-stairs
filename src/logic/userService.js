import type {CurrentUser} from "./collections";


export class UserService{

    static currentUser: CurrentUser = { name: '', password: '', profile: {}};

    getCurrentUser(): CurrentUser {
        return JSON.parse(localStorage.getItem("currentUser"))
    }

    setCurrentUser(user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
    }

    clearCurrentUser() {
        localStorage.clear()
    }

    isLoggedIn() {
        return localStorage.getItem("currentUser") != null
    }

    async login(name: String, password: String) {
        const headers = new Headers({"Content-Type": "application/json"});
        try {
            const response = await fetch( (process.env.BACKEND_URL || "http://localhost:5000") + "/login", {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            })
            if (response.status === 200) {
                let data = await response.json()
                UserService.currentUser.name = data.name
                UserService.currentUser.password = "****"
                UserService.currentUser.profile = data.profile
                this.setCurrentUser(UserService.currentUser)
                return true;
            } else {
                return false
            }
        } catch (err) {console.log(err)}
    }

    async register(name: String, password: String) {
        const headers = new Headers({"Content-Type": "application/json"});
        try {
            const response = await fetch( (process.env.BACKEND_URL || "http://localhost:5000") + "/createUser", {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    password: password,
                    profile: {
                        lobe: 0,
                        gelobt: 0
                    }
                })
            })
            if (response.status === 200) {
                let data = await response.json()
                UserService.currentUser.name = data.name
                UserService.currentUser.password = "****"
                UserService.currentUser.profile = data.profile
                return true;
            } else {
                return false
            }
        } catch (err) {console.log(err)}
    }

    logout(){
        this.clearCurrentUser()
    }
}
