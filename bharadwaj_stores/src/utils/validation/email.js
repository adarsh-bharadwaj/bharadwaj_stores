import { emptyValidation } from "./empty"
import { nameValidation } from "./name";

export const emailValidation = async (email) => {
    if (!emptyValidation(email)) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address.';
        }
        else
        {
            return "";
        }
    }
    else {
        return "Email Cannot be Empty";
    }
}