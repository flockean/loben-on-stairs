import ApiService from "./apiService"

class UserService{

    constructor() {
        this.apiService = ApiService
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"))
    }

    setCurrentUser(currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }

    clearCurrentUser() {
        localStorage.removeItem("currentUser")
    }

    isLoggedIn() {
        return localStorage.getItem("currentUser") != null
    }

    login(name, password) {
        try {
            return this.apiService.doRequestJson("/login", "POST", {
                name: name,
                password: password
            }).then(data => {
                this.setCurrentUser(data)
                console.log(data)
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