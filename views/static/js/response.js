const ICON_SUCCESS = 'fa-circle-check';
const ICON_ERROR = 'fa-triangle-exclamation';

function getIcon(type) {
  if (type === 'success') return ICON_SUCCESS;
  return ICON_ERROR;
}

function displayMessage(responseMsg, formID, responseType) {
  const output = `
    <div class="response-${responseType}">
        <i class="fa-solid ${getIcon(responseType)}"></i>&nbsp;${responseMsg}
    </div>
  `;
  document.getElementById(formID).innerHTML = output;
}