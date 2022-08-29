const addMessage = (message) => {
  const messagesDiv = document.querySelector('#console');
  messagesDiv.style.display = 'block';
  messagesDiv.innerHTML += '<br>' + '> ' + message ;
  console.log('StripeSamplesDebug:', message);
};

var originalButtonText = null;

const buttonStateProcessing = (buttonText) => {
  const button = document.querySelector('button');
  button.disabled = true;
  originalButtonText = button.innerHTML;
  button.innerHTML = (buttonText == null) ? 'Processing...' : buttonText;
  button.classList.remove("bg-indigo-500");
  button.classList.add("bg-indigo-400");
};

const buttonStateReset = () => {
  const button = document.querySelector('button');
  button.disabled = false;
  const buttonText = originalButtonText;
  button.innerHTML = buttonText;
  button.classList.remove("bg-indigo-400");
  button.classList.add("bg-indigo-500");
};

const enableButton = () => {
  const button = document.querySelector('button').disabled = false;
};

export default addMessage;
