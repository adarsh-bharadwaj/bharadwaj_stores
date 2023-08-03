import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

export const widthCalc=(value)=>{
    return value*width/100;
}

export const heightCalc=(value)=>{
    return value*height/100;
}