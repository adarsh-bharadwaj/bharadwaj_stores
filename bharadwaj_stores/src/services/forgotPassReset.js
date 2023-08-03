import { BASE_URL } from "../constants/urls";
import { passReset } from "../redux/passResetSlice";

export const forgotPassReset = async (email, otp, password, dispatch) => {
    const data = {
        email,
        otp,
        password
    }
    return await dispatch(passReset({ data, url: `${BASE_URL}/user/forgotpasswordreset` }));
};
