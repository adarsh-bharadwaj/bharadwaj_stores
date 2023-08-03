import { postData } from "../redux/registerationSlice";

export const verifyEmail = async(email,dispatch) => {
    // console.log("check email",email);
    const data = {
        email:"bharadwaj.adarsh4@gmail.com"
    };
    return await dispatch( postData({data,url:'http://192.168.29.106:5000/api/user/verifyemail'}));
};