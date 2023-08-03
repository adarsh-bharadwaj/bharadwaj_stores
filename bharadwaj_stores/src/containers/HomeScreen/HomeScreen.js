import React from 'react';
import { View } from 'react-native';
import StatusBar from '../../components/StatusBar';
import { authenticateActions } from '../../redux/loginSlice';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button/Button';

const HomeScreen = () => {
    const dispatch = useDispatch();
    return (
        <View>
            <StatusBar />
            <Button title="Logout" onPress={() => dispatch(authenticateActions.logout())} />
        </View>
    )
}

export default HomeScreen;