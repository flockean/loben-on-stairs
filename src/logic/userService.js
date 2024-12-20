import type {CurrentUser} from "./collections";
import {backendurl} from "../App";


export class UserService{

    static currentUser: CurrentUser = { name: '', password: '', profile: {}};

    getCurrentUser(): CurrentUser {
        return JSON.parse(localStorage.getItem("currentUser"))
    }

    setCurrentUser(currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
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
            const response = await fetch( backendurl.BACKEND_URL + "/login", {
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
                UserService.currentUser.password = data.password
                UserService.currentUser.profile = data.profile
                let currentUser = UserService.currentUser
                this.setCurrentUser(currentUser)
                return true;
            } else {
                return false
            }
        } catch (err) {console.log(err)}
    }

    async register(name: String, password: String) {
        const headers = new Headers({"Content-Type": "application/json"});
        try {
            const response = await fetch(  backendurl.BACKEND_URL + "/createUser", {
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
                UserService.currentUser.password = data.password
                UserService.currentUser.profile = data.profile
                let currentUser = UserService.currentUser
                this.setCurrentUser(currentUser)
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
