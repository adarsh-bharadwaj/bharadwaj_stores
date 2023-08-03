import { getAsyncData } from "../localStorage/getData";
import { storeAsyncData } from "../localStorage/storeData";

export const storeScreen2 = async(value)=>{
    await storeAsyncData('@form-screen2',value);
}

export const getScreen2 = async()=>{
    return await getAsyncData('@form-screen2');
}