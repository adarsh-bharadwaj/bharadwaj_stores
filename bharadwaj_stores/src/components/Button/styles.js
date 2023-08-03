import { StyleSheet } from 'react-native';
import normalize from '../../utils/normalize';
import { gray, violet } from '../../constants/colors';
import { useDimensions } from '../../hooks/useDimensions';

const buttonStyles = () => {
    const { heightCalc } = useDimensions();

    return StyleSheet.create({
        touchableOpacity: {
            backgroundColor: violet,
            margin: '5%',
            alignSelf: 'center',
            borderRadius: 30,
            height: '23%',
            elevation: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: gray,
            // paddingLeft: '6%',
            // paddingRight: '11%'
        },
        text: {
            paddingTop:'1%',
            paddingRight:'2%',
            textAlign: 'center',
            color: 'white',
            fontSize: normalize(8),
            fontWeight: 'bold'
        }
    })
}

export default buttonStyles;