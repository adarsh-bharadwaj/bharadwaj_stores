import { useWindowDimensions } from "react-native";

//Returns the color scheme whether the device is in dark mode or light mode
export const useDimensions = () => {
    const windowDimensions = useWindowDimensions();

    const widthCalc = (percentage) => {
        return (percentage / 100) * windowDimensions.width;
    };

    const heightCalc = (percentage) => {
        return (percentage / 100) * windowDimensions.height;
    };

    const dimensionCalc = (percentage) =>{
        return (percentage/100)*(windowDimensions.height*windowDimensions.width);
    }
    return {
        widthCalc,
        heightCalc,
        dimensionCalc,
        isPotrait:windowDimensions.height>windowDimensions.width,
        height:windowDimensions.height,
        width:windowDimensions.width
    };
};