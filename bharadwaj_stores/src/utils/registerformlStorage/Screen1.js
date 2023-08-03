import { getAsyncData } from "../localStorage/getData";
import { storeAsyncData } from "../localStorage/storeData";

export const storeScreen1 = async(value)=>{
   await storeAsyncData('@form-screen1',value);
}

export const getScreen1 = async()=>{
    return await getAsyncData('@form-screen1');
}