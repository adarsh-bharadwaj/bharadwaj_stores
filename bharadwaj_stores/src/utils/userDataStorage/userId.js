import { deleteAsyncData } from "../localStorage/deleteData";
import { getAsyncData } from "../localStorage/getData";
import { storeAsyncData } from "../localStorage/storeData";

const key = '@userId';

export const storeuserId = async (value) => {
    await storeAsyncData(key, value);
}

export const getuserId = async () => {
    return await getAsyncData(key);
}

export const deleteuserId = async () => {
    return await deleteAsyncData(key);
}