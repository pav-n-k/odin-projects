import './style.css';

const signUpForm = document.getElementById('sign-up-form');
const message = document.getElementById('message');

const updateMessage = (message, color) => {
    message.textContent = message;
    message.style.color = color;
}

document.addEventListener('DOMContentLoaded', () => {

    let messageText = 'Must be at least 8 characters';
    message.textContent = messageText;

    signUpForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const data = new FormData(signUpForm);
        const result = {};
        for (let [key, value] of data) {
            result[key] = value;
        };
        if (result['confirm-password'] === result['password']) {
            updateMessage('The form data has been successfully submitted', 'green');
        } else {
            updateMessage('passwords must match', 'red');
        }
    });
});
