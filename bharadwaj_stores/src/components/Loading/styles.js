import { StyleSheet } from 'react-native';
import { black, white } from '../../constants/colors';
import normalize from '../../utils/normalize';
import { useDimensions } from '../../hooks/useDimensions';


export const loadingStyles = () => {
    const { height, width } = useDimensions();
    return StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            height,
            width,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        loadingContainer: {
            width: '15%',
            height: '7%',
            backgroundColor: white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
        },
        color: black

    })
}