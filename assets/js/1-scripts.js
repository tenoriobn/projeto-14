import emailValidator from "./2-emailValidator.js";

const requiredField = document.querySelectorAll("[required]");

requiredField.forEach((field) => {
    field.addEventListener("blur", () => checkField(field));
});

const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const messages = {
    emailField: {
        valueMissing: "Email cannot be empty",
        tooShort: "Need more characters in email",
        customError: "Please provide a valid email address",

    }
}

function checkField(field) {
    let message = '';
    field.setCustomValidity('');

    if (field.name === 'emailField') {
        emailValidator(field);
    }

    errorTypes.forEach(error => {
        if (field.validity[error]) {
            message = messages[field.name][error];
        }
    })

    let errorMessage = field.parentNode.querySelector('.error-message');
    let errorInput = field.parentNode.querySelector('.field__email');
    const inputValidator = field.checkValidity();
    
    if (!inputValidator) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorInput.classList.add('error-input');
        errorInput.placeholder = "E.g. example@email.com";
    } else {
        errorMessage.textContent = '';
        errorInput.classList.remove('error-input');
    }
}

