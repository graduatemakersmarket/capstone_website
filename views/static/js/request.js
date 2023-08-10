const MULTIPART = { 'Content-Type': 'multipart/form-data' };

// POST (CREATE)
function postData(formID, outputID, endpoint, location, token) {
  const form = document.getElementById(formID);
  const formData = new FormData(form);
  const args = {};

  if (formData.has('g-recaptcha-response')) {
    formData.delete('g-recaptcha-response');
    formData.append('captcha', token);
  }

  formData.forEach((value, key) => {
    args[key] = value;
  })

  axios.post(endpoint, args).then((response) => {
    if (location) {
      window.location = location;
    }

    displayMessage(response.data.response, outputID, 'success');
  }).catch((error) => {
    displayMessage(error.response.data.error, outputID, 'error');
  });
}

// PUT (UPDATE)
function putData(formID, outputID, endpoint, location, token) {
  const form = document.getElementById(formID);
  const formData = new FormData(form);
  const args = {};

  if (formData.has('g-recaptcha-response')) {
    formData.delete('g-recaptcha-response');
    formData.append('captcha', token);
  }

  formData.forEach((value, key) => {
    args[key] = value;
  })

  axios.put(endpoint, args).then((response) => {
    if (location) {
      window.location = location;
    }

    displayMessage(response.data.response, outputID, 'success');
  }).catch((error) => {
    displayMessage(error.response.data.error, outputID, 'error');
  });
}

// DELETE
function deleteData(formID, outputID, endpoint, location, token) {
  const form = document.getElementById(formID);
  const formData = new FormData(form);
  const args = {};

  if (formData.has('g-recaptcha-response')) {
    formData.delete('g-recaptcha-response');
    formData.append('captcha', token);
  }

  formData.forEach((value, key) => {
    args[key] = value;
  })

  axios.delete(endpoint, args).then((response) => {
    if (location) {
      window.location = location;
    }

    displayMessage(response.data.response, outputID, 'success');
  }).catch((error) => {
    displayMessage(error.response.data.error, outputID, 'error');
  });
}

// GET (READ)
function getData(formID, outputID, endpoint, location, token) {
  const form = document.getElementById(formID);
  const formData = new FormData(form);
  const args = {};

  if (formData.has('g-recaptcha-response')) {
    formData.delete('g-recaptcha-response');
    formData.append('captcha', token);
  }

  formData.forEach((value, key) => {
    args[key] = value;
  })

  axios.get(endpoint, args).then((response) => {
    if (location) {
      window.location = location;
    }

    displayMessage(response.data.response, outputID, 'success');
  }).catch((error) => {
    displayMessage(error.response.data.error, outputID, 'error');
  });
}

// MULTIPART PUT (UPDATE)
function putMultipart(formID, outputID, fileID, endpoint, location, token) {
  const form = document.getElementById(formID);
  const { files } = document.getElementById(fileID);
  const formData = new FormData(form);

  if (formData.has('g-recaptcha-response')) {
    formData.delete('g-recaptcha-response');
    formData.append('captcha', token);
  }

  if (files[0] && files[0].size > 1048576) {
    displayMessage('Your avatar may not exceed 1MB', outputID, 'error');
    return false;
  }

  if (files) {
    formData.append(fileID, files);
  }

  axios.put(endpoint, formData, { headers: MULTIPART }).then((response) => {
    if (location) {
      window.location = location;
    }

    displayMessage(response.data.response, outputID, 'success');
  }).catch((error) => {
    displayMessage(error.response.data.error, outputID, 'error');
  });
}