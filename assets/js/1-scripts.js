import emailValidator from "./2-emailValidator.js";

const btnForm = document.querySelector(".field__btn");
const form = document.querySelector(".form");
const requiredField = document.querySelectorAll("[required]");

btnForm.addEventListener("click", () => {
    const fieldEmail = document.querySelector(".field__email");

    if (fieldEmail.value === '') {
        let message = messages[fieldEmail.name].valueMissing;
        let errorMessage = fieldEmail.parentNode.querySelector('.error-message');
        let errorInput = fieldEmail.parentNode.querySelector('.field__email');

        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorInput.classList.add('error-input');
        errorInput.placeholder = "E.g. example@email.com";

        return false;
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailRegistration = {
        "emailField": e.target.elements["emailField"].value
    }

    sessionStorage.setItem("register", JSON.stringify(emailRegistration));

    window.location.href = 'thankYouPage.html';
})

requiredField.forEach((field) => {
    field.addEventListener("blur", () => checkField(field));
    field.addEventListener("invalid", event => event.preventDefault());
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

/*
    - Adicionar submit ao formulário
    - Só é possível dar submit se o campo estiver preenchido
        + Se não estiver preenchido e tentar submit aparecera mensagem.
*/