export const checkValidity = (value, rules) => {
    let isValid = true;

    if(!rules) {
        return true;
    }

    // Fixing common validation gotcha
    // Now all rules need to resolve to true not just one
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
};