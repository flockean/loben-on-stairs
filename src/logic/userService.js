import ApiService from "./apiService"
import { decodeToken } from "react-jwt";

class UserService{

    constructor() {
        this.apiService = ApiService;
    }

    initCurrentUser(token) {
        const decodedToken = decodeToken(token)
        console.log(decodedToken)
        const reqPath = "/user/" + decodedToken.user_id.userId
        this.apiService.doRequestJson(reqPath, "GET").then(data => {
        this.setCurrentUser(data)
        })
    } 

    getAuthToken() {
        return localStorage.getItem("token")
    }

    setAuthToken(token) {
        localStorage.setItem("token", token)
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"))
    }

    setCurrentUser(currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }

    clearCurrentUser() {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("token")
    }

    isLoggedIn() {
        return localStorage.getItem("token") != null
    }

    login(name, password) {
        try {
            return this.apiService.login("/login", "POST", {
                name: name,
                password: password
            }).then(data => {
                this.setAuthToken(data.token)
                const decodedToken = decodeToken(data.token)
                const reqPath = "/user/" + decodedToken.user_id.userId
                this.apiService.doRequestJson(reqPath, "GET").then(data => {
                    this.setCurrentUser(data)
                })
                return true
            })
        }
        catch (err) {
            console.log(err)
            return false
        }
    }

    register(name, password, profile) {
        try {
            return this.apiService.doRequestJson("/register", "POST", {
                name: name,
                password: password,
                profile: profile
            }).then(data => {
                this.setCurrentUser(data)
                console.log(data)
                return true
            }) 
        }
        catch (err) {console.log(err)}
    }

    updatePassword(newPassword) {
        try {
            return this.apiService.doRequestJson("/updateUser", "PUT", {
                name: this.getCurrentUser().name, 
                password: newPassword   
                }).then(data => {
                    console.log(data)
                })
            }
        catch (err) {console.log(err)}
    }

    logout(){
        this.clearCurrentUser()
    }
}

UserService = new UserService()
export default UserService;