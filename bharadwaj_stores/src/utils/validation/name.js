export const nameValidation = async (value) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (nameRegex.test(value)) {
        return ""
    }
    else {
        return "Name should contain only alphabets";
    }
}