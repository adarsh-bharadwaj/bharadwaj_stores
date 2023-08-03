import { emptyValidation } from "./empty";
import { nameValidation } from "./name";

export const cityValidation = async (city) => {
    if (!emptyValidation(city)) {
        if (city.trim().length >= 3) {
            return nameValidation(city);
        }
        else {
            return "City Should Contain Atleast 3 character";
        }
    }
    else {
        return "City Cannot be Empty";
    }
}