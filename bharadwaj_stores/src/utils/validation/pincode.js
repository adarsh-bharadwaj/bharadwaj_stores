import { emptyValidation } from "./empty";

export const pincodeValidation = async (pincode) => {
    if (!emptyValidation(pincode)) {
        if (!isNaN(pincode)) {
            if (pincode.length === 6) {
                return "";
            }
            else {
                return "Invalid Pincode";
            }
        }
        else {
            return "Invalid Pincode"
        }
    }
    else {
        return "Pincode Cannot be Empty";
    }
}