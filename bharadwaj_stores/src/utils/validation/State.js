import { emptyValidation } from "./empty";
import { nameValidation } from "./name";

export const stateValidation = async (state) => {
    if (!emptyValidation(state)) {
        if (state.trim().length >= 3) {
            return nameValidation(state);
        }
        else {
            return "City Should Contain Atleast 3 character";
        }
    }
    else {
        return "City Cannot be Empty";
    }
}