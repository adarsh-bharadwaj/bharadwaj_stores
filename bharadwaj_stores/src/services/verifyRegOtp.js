import { postData } from "../redux/registerationSlice";

export const verifyRegOtp = async (email, otp, dispatch) => {
    // console.log("check email",email);
    const data = {
        email, otp
    };
    return await dispatch(postData({ data, url: 'http://192.168.29.106:5000/api/user/verifyemailotp' }));
};