import { StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import  normalize  from '../../utils/normalize';


const indexScreenStyles = ()=>{
    const {width,height} = useWindowDimensions();
    console.log("normalize"+normalize(16))

    const heightCalc= (value)=>{
        return height*value/100;
    }

    const widthCalc = (value)=>{
        return width*value/100;
    }

    console.log(width);
   return StyleSheet.create({
        container: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            height: heightCalc(100),
        },
        box: {
            backgroundColor: '#4800ad',
            width: widthCalc(100) / 2
        },
        text: {
            alignSelf: 'center',
            color: 'white',
            fontSize: 50,
            // width: '100%',
            position: 'absolute',
            textAlign:'center',
            width:'100%',
            left:'2%',
            zIndex: 1,
            fontFamily: 'Pacifico-Regular',
            elevation: 8,
        },
        buttonsContainer: {
            opacity: 0.8,
            position: 'absolute',
            bottom: 120,
            display: 'flex',
            flexDirection: 'row',
            width:widthCalc(100),
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingLeft: widthCalc(5),
            paddingRight: widthCalc(5),
        },
        button: {
            elevation: 8,
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 30,
            borderColor: 'transparent',
            height: 50,
            width: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            color: 'black',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }
    })
}

export default indexScreenStyles;