import { emptyValidation } from "./empty";

export const mobileValidation = async (mobileNumber) => {
    if (!emptyValidation(mobileNumber)) {
        const digitRegex = /^\d+$/;

        if (!digitRegex.test(mobileNumber)) {
            return 'Please enter only digits (numeric characters).';
        }

        const mobileRegex = /^\d{10}$/;

        if (!mobileRegex.test(mobileNumber)) {
            return 'Please enter a valid 10-digit mobile number.';
        }

        return "";
    }
    else {
        return "Mobile Number Cannot be Empty";
    }
}