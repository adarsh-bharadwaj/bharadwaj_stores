import { deleteAsyncData } from "../localStorage/deleteData";
import { getAsyncData } from "../localStorage/getData";
import { storeAsyncData } from "../localStorage/storeData";

const key = '@accessToken';

export const storeAccessToken = async (value) => {
    await storeAsyncData(key, value);
}

export const getAccessToken = async () => {
    return await getAsyncData(key);
}

export const deleteAccessToken = async () => {
    return await deleteAsyncData(key);
}