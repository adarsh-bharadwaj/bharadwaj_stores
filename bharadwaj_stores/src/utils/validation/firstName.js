import { emptyValidation } from "./empty"
import { nameValidation } from "./name";

export const firstNameValidation = async (value) => {

    if (!emptyValidation(value)) {
        if (value.trim().length >= 3) {
            return nameValidation(value);
        }
        else {
            return "First Name Should Contain Atleast 3 character";
        }
    }
    else {
        return "First Name Cannot be Empty";
    }
}