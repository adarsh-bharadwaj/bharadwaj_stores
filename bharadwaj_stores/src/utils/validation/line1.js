import { emptyValidation } from "./empty";

export const line1Validation = async (line1) => {
    if (!emptyValidation(line1)) {
        return "";
    }
    else {
        return "Field Cannot be Empty";
    }
}