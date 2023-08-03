import { BASE_URL } from "../constants/urls";
import { loginUser as login } from "../redux/loginSlice";

export const loginUser = async (email, password, dispatch) => {
    const data = {
        email,
        password
    };
    return await dispatch(login({ data, url: `${BASE_URL}/user/loginuser` }));
};