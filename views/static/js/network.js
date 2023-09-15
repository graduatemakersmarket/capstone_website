const MULTIPART = { 'Content-Type': 'multipart/form-data' };

/*************************************************************************************************/
/* Convert FormData objects into something body-parser can understand
/*************************************************************************************************/
const convertFormData = (formData) => {
  const temp = {};
  formData.forEach((value, key) => { temp[key] = value; });
  return temp;
};

/*************************************************************************************************/
/* Send login request to the backend
/*************************************************************************************************/
$(document).on('submit', '.loginForm', async (e) => {
  e.preventDefault();

  axios.post(e.target.action, convertFormData(new FormData(e.target))).then( async () => {
    window.location.href = '/account/manage'
  }).catch((error) => {
    $('#login-response').empty().show().html(`<div class="response-error"><i class="fa-solid fa-triangle-exclamation"></i> ${error.response.data.error}`).delay(4000).fadeOut(300);
  });
});

/*************************************************************************************************/
/* Send account registration request to the backend
/*************************************************************************************************/
$(document).on('submit', '.registerForm', async (e) => {
  e.preventDefault();

  axios.post(e.target.action, convertFormData(new FormData(e.target))).then( async () => {
    window.location.href = '/account/manage'
  }).catch((error) => {
    $('#register-response').empty().show().html(`<div class="response-error"><i class="fa-solid fa-triangle-exclamation"></i> ${error.response.data.error}`).delay(4000).fadeOut(300);
  });
});

/*************************************************************************************************/
/* Send account update request to the backend
/*************************************************************************************************/
$(document).on('submit', '.updateAccount', async (e) => {
  e.preventDefault();

  axios.put(e.target.action, new FormData(e.target), { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
      $('#update-account-response').empty().show().html(`<div class="response-success"><i class="fa-solid fa-circle-check"></i> ${response.data.response}`).delay(4000).fadeOut(300);
    }).catch((error) => {
      $('#update-account-response').empty().show().html(`<div class="response-error"><i class="fa-solid fa-triangle-exclamation"></i> ${error.response.data.error}`).delay(4000).fadeOut(300);
    });
});

/*************************************************************************************************/
/* Send social media link creation request to the backend
/*************************************************************************************************/
$(document).on('submit', '.createSocialMediaLink', async (e) => {
  e.preventDefault();

  axios.post(e.target.action, convertFormData(new FormData(e.target))).then( async (response) => {
    $('#create-socials-response').empty().show().html(`<div class="response-success"><i class="fa-solid fa-circle-check"></i> Successfully added ${response.data.link}`).delay(4000).fadeOut(300);
    $('#link-table').removeAttr('hidden').show();
    $('#link-table').append(`<tr id="row-${response.data.id}"><td>${response.data.link}</td><td><form class="deleteSocialMediaLink" id="${response.data.id}" action="/api/socials/delete"><button class="btn btn-dark w-100 py-2">DELETE</button></form></td></tr>`);
    $('#no-links').empty();
  }).catch((error) => {
    $('#create-socials-response').empty().show().html(`<div class="response-error"><i class="fa-solid fa-triangle-exclamation"></i> ${error.response.data.error}`).delay(4000).fadeOut(300);
  });
});

/*************************************************************************************************/
/* Send social media link deletion request to the backend
/*************************************************************************************************/
$(document).on('submit', '.deleteSocialMediaLink', async (e) => {
  e.preventDefault();

  axios.delete(e.target.action, {data: {id: e.target.id}}).then((response) => {
    $('#create-socials-response').empty().show().html(`<div class="response-success"><i class="fa-solid fa-circle-check"></i> ${response.data.response}`).delay(4000).fadeOut(300);
    $(`#row-${e.target.id}`).remove();
  }).catch((error) => {
    $('#create-social-response').empty().show().html(`<div class="response-error"><i class="fa-solid fa-triangle-exclamation"></i> ${error.response.data.error}`).delay(4000).fadeOut(300);
  });
});

/*************************************************************************************************/
/* Send product creation request to the backend
/*************************************************************************************************/
$(document).on('submit', '.createProduct', async (e) => {
  e.preventDefault();

  axios.post(e.target.action, new FormData(e.target), { headers: { 'Content-Type': 'multipart/form-data' } }).then( async (response) => {
    $('#create-product-response').empty().show().html(`<div class="response-success"><i class="fa-solid fa-circle-check"></i> Successfully added ${response.data.product}`).delay(4000).fadeOut(300);
    $('#product-table').removeAttr('hidden').show();
    $('#product-table').append(`<tr id="row-${response.data.id}"><td>${response.data.product}</td><td><button class="btn btn-dark w-100 py-2" onclick="window.location.href='/products/edit/${response.data.id}';">EDIT</button></td></tr>`);
    $('#no-products').empty();
  }).catch((error) => {
    $('#create-product-response').empty().show().html(`<div class="response-error"><i class="fa-solid fa-triangle-exclamation"></i> ${error.response.data.error}`).delay(4000).fadeOut(300);
  });
});

/*************************************************************************************************/
/* Send product update request to the backend
/*************************************************************************************************/
$(document).on('submit', '.updateProduct', async (e) => {
  e.preventDefault();

  axios.put(e.target.action, new FormData(e.target), { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
      location.reload();
    }).catch((error) => {
      $('#update-product-response').empty().show().html(`<div class="response-error"><i class="fa-solid fa-triangle-exclamation"></i> ${error.response.data.error}`).delay(4000).fadeOut(300);
    });
});

/*************************************************************************************************/
/* Send product image deletion request to the backend
/*************************************************************************************************/
$(document).on('submit', '.deleteProductImage', async (e) => {
  e.preventDefault();

  axios.delete(e.target.action, {data: {id: e.target.id}}).then((response) => {
    $(`#card-${e.target.id}`).empty().remove();
  }).catch((error) => {
    $('#delete-image-response').empty().show().html(`<div class="response-error"><i class="fa-solid fa-triangle-exclamation"></i> ${error.response.data.error}`).delay(4000).fadeOut(300);
  });
});