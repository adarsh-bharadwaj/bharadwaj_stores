import { postData } from "../redux/registerationSlice";
import { getScreen1 } from "../utils/registerformlStorage/Screen1";
import { getScreen2 } from "../utils/registerformlStorage/Screen2";
import { getScreen3 } from "../utils/registerformlStorage/Screen3";

export const registerUser = async(dispatch) => {
    // console.log("check email",email);
    const data = {
        ...await getScreen1(),
        ...await getScreen2(),
        ...await getScreen3()
    };
    return await dispatch( postData({data,url:'http://192.168.29.106:5000/api/user/registeruser'}));
};