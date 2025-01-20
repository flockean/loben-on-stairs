
class ApiService{

  constructor() {
    this.url = process.env.BACKEND_URL || "http://localhost:5000"
    this.headerJson = new Headers({"Content-Type": "application/json"})
  }

  async doRequestJson(urlPath, method, body){
    try {
      return fetch(this.url + urlPath, {
        method: method,
        headers: this.headerJson,
        body: JSON.stringify(body)
      }).then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw new Error(response.statusText)
        }
      })
    }
      catch (error) {
        console.log(error)
      }
    }

  getUrl() {
    return this.url
  }

  doRequestFormData(urlpath, method, body){
    try {
      return fetch(this.url + urlpath, {
        method: method,
        body: body
      }).then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw new Error(response.statusText)
        }
      })
    }
    catch (error) {
      console.log(error)
    }
  }
}

ApiService = new ApiService();
export default ApiService;


