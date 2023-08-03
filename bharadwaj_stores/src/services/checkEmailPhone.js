import { postData } from "../redux/registerationSlice";

export const checkEmailPhone = async(email, mobile,dispatch) => {
    // console.log("check email",email);
    const data = {
        email, mobile
    };
    return await dispatch( postData({data,url:'http://192.168.29.106:5000/api/user/checkemailmobile'}));
};