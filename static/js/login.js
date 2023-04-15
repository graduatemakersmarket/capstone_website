// Process account login queries
const accountLoginForm = document.getElementById("login")
accountLoginForm.addEventListener("submit", (event) => {

    event.preventDefault()

    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value

    axios.post("/api/artists/login/", 
    {username, password})
    .then(response =>{
        window
        .location = "/"
    })
    .catch(error => {
        document
        .getElementById("errors")
        .innerHTML = error.response.data.error
    })
})