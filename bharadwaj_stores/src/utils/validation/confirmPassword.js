export const confirmPasswordValidation = async (password,confirmPassword) => {
    if (password.trim() === '') {
        return 'Please enter a password first.';
    }

    if(password===confirmPassword)
    {
        return "";
    }
    else
    {
        return "Password Doesn't Match";
    }

}