import { emptyValidation } from "./empty"
import { nameValidation } from "./name";

export const lastNameValidation = async (value) => {
    console.log(emptyValidation(value));
    if(emptyValidation(value))
    {
        return "";
    }
    else
    {
        return nameValidation(value);
    }
}