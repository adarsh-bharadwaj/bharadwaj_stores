import { BASE_URL } from "../constants/urls";
import { accessToken } from "../redux/loginSlice";
import CookieManager from "@react-native-cookies/cookies";

export const getAccessToken = async (dispatch) => {
    const cookie = await CookieManager.get(BASE_URL);
    console.log(await CookieManager.get(BASE_URL));
    if (cookie) {
        console.log("I'm In");
        return await dispatch(accessToken({ data: {}, url: `${BASE_URL}/user/refreshtoken` }));
    }
};