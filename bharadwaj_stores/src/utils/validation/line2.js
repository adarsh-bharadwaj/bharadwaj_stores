import { emptyValidation } from "./empty";

export const line2Validation = async (line2) => {
    if (!emptyValidation(line2)) {
        return "";
    }
    else {
        return "Field Cannot be Empty";
    }
}