import React from 'react';
import { StatusBar as StBar,SafeAreaView } from 'react-native';

//Status Bar
const StatusBar = ()=>{
return (
    <SafeAreaView>
        <StBar translucent={false} backgroundColor='#4800ad' barStyle="light-content" />
   </SafeAreaView>
)
}

export default StatusBar;