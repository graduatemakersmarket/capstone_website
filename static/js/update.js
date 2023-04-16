// Process multi-part update form queries
const form = document.getElementById("update");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  formData.append("firstname", document.querySelector("#firstname").value)
  formData.append("lastname", document.querySelector("#lastname").value)
  formData.append("instagram", document.querySelector("#instagram").value)
  formData.append("facebook", document.querySelector("#facebook").value)
  formData.append("twitter", document.querySelector("#twitter").value)
  formData.append("website", document.querySelector("#website").value)
  formData.append("biography", document.querySelector("#biography").value)
  axios
    .post("/api/artists/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
        window
        .location = "/artists/update/"
    })
    .catch(error => {
        document
        .getElementById("errors")
        .innerHTML = error.data.error
    });
});