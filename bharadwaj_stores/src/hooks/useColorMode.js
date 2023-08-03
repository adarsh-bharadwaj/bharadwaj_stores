import { useColorScheme, Appearance } from "react-native";
import { useState,useEffect } from "react";

//Returns the color scheme whether the device is in dark mode or light mode
export const useColorMode = () => {

    //State Variable thar stores the information about the color scheme
    const [colorSchemeInfo, setColorSchemeInfo] = useState(useColorScheme());

    //To apply immediate effect when the color scheme is changed
    useEffect(() => {

        //Event listener
        const onChange = (result) => {
            setColorSchemeInfo(result.colorScheme);
        }

        //Creating an eventlistener on the change of color
        const value = Appearance.addChangeListener(onChange);

        return () => value.remove() //Removing the event listener
    }, []);

    //returns whether the device is in dark mode or not
    return {
        isDarkMode: colorSchemeInfo === 'dark'
    }
};