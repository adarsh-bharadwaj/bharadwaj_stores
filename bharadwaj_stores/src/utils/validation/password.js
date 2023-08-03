import { emptyValidation } from "./empty";
export const passwordValidation = async (password) => {
    {

        // Password requirements
        const minLength = 8; // Minimum length of 8 characters
        const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
        const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
        const hasDigit = /\d/.test(password); // At least one digit
        const hasSpecialChar = /[!@#$%^&*]/.test(password); // At least one special character

        if (password.trim() === '') {
            return 'Please enter a password.';
        }

        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }

        if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).';
        }

        // Form is valid, submit or perform further actions
        return "";
    };

}