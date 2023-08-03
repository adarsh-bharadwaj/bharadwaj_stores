import { BASE_URL } from "../constants/urls";
import {  passReset } from "../redux/passResetSlice";

export const getForgotPassOtp = async (email, dispatch) => {
    const data = {
        email
    }
    return await dispatch( passReset({ data, url: `${BASE_URL}/user/forgotpassword` }));
};