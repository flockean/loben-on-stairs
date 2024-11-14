
// This is a Crime, don't do it
export function login(name: String) {
    localStorage.setItem("currentUser", name)
}

export function loginAsGuest() {
    localStorage.setItem("currentUser", "Anonymous")
}


export function getCurrentUser(): String {
    return localStorage.getItem("currentUser")
}

export function logout() {
    localStorage.clear()
}
