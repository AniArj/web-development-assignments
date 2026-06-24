// JavaScript code for form validation
document.getElementById('myForm').addEventListener('submit', function(event) {
// Prevent form from submitting
event.preventDefault();

// Retrieve the input field value
const inputValue = document.getElementById('inputField').value;

// Regular expression pattern for alphanumeric input
const alphanumericPattern = /^[a-zA-Z0-9]+$/;

// Check if the input value matches the pattern
if (alphanumericPattern.test(inputValue)) {

// Valid input: display confirmation and submit the form
let messageElement = document.getElementById('formFeedback');
if (!messageElement) {
    messageElement = document.createElement('p');
    messageElement.id = 'formFeedback';
    document.getElementById('myForm').appendChild(messageElement);
}
messageElement.textContent = "Form submitted successfully!";
messageElement.style.color = "green";
messageElement.style.fontWeight = "bold";
messageElement.style.marginTop = "15px";

} else {

// Invalid input: display error message
let messageElement = document.getElementById('formFeedback');
if (!messageElement) {
    messageElement = document.createElement('p');
    messageElement.id = 'formFeedback';
    document.getElementById('myForm').appendChild(messageElement);
}
messageElement.textContent = "Error: Input must be alphanumeric only (letters and numbers, no spaces).";
messageElement.style.color = "red";
messageElement.style.fontWeight = "bold";
messageElement.style.marginTop = "15px";

}
});