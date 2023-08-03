import { getAsyncData } from "../localStorage/getData";
import { storeAsyncData } from "../localStorage/storeData";

export const storeScreen3 = async(value)=>{
   await storeAsyncData('@form-screen3',value);
}

export const getScreen3 = async()=>{
    return await getAsyncData('@form-screen3');
}