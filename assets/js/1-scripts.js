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
### O desafio

Os usuários devem ser capazes de:
- Veja o layout ideal para o site, dependendo do tamanho da tela do dispositivo***

- Veja os estados de foco para todos os elementos interativos na página***

- Envie seu endereço de e-mail usando um campo `input`***

- Receba uma mensagem de erro quando o `formulário` for enviado se:
    + O campo `input` está vazio. A mensagem desse erro deve ser 
        "Opa! Parece que você esqueceu de adicionar seu e-mail"***
    + O endereço de e-mail não está formatado corretamente 
        (ou seja, um endereço de e-mail correto deve ter esta estrutura: `name@host.tld`). 
        A mensagem para este erro deve dizer *"Forneça um endereço de e-mail válido"***
*/