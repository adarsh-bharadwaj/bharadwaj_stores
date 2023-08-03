import { StyleSheet } from "react-native";
import { useDimensions } from "../../hooks/useDimensions";
import normalize from "../../utils/normalize";

export const forgotPassScreenStyles = ()=>{
    const {widthCalc} = useDimensions();
    return StyleSheet.create({
        formContainer:{
            display:'flex',
            alignItems:'center',
            paddingBottom:'10%'
        },
        buttonContainer:{
            width:widthCalc(30)
        },
        buttonText:{
            fontSize:normalize(7)
        },
        otpSentText:{
            fontSize:normalize(7),
            fontWeight:'bold'
        },
        timer:{
            fontSize:normalize(6),
            width:widthCalc(80),
            textAlign:'left'
        },
        resendOtp:{
            fontSize:normalize(6),
            width:widthCalc(80),
            textAlign:'left',
            textDecorationLine:'underline'
        },
        resetButtonContainer:{
            marginTop:'6%',
            width:widthCalc(50),
            height:'12%'
        }
    });
}