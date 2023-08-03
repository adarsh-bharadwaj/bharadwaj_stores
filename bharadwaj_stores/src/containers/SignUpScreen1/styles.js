import { StyleSheet } from 'react-native';
import { useDimensions } from '../../hooks/useDimensions';

const signup1Styles = () => {
    const {widthCalc} = useDimensions();


    return StyleSheet.create({
        scrollContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            paddingTop: '20%'
        },
        scrollView: {
            alignSelf: 'center',
            width: '80%',
        },
        buttonContainer: {
            alignSelf: 'center',
            marginTop: '6%'
        },
        button: {
            width:widthCalc(40),
            height:'28%'
        },
        icon: { paddingTop: 4 }
    })
}

export default signup1Styles;