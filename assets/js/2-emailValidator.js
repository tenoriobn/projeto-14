export default function emailValidator(field) {
    validEmailRules(field)
}

function validEmailRules(field) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (field.value.length < 8) {
        return false;
    }   else if (!emailRegex.test(field.value)) {
        field.setCustomValidity('Invalid email address');
        return false;
    }
}