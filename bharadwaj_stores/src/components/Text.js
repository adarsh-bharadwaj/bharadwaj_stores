import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { height, width } = Dimensions.get("window");

const Text = () => {
    const textContent = (`Bharadwaj Stores`).trim().split(' ');
    const [animatedValues3, setAnimatedValues3] = useState(textContent.map((_, i) => {
        // setAnimatedValues3(prev => prev.push(new Animated.Value(0)))
        return new Animated.Value(0);
    }));
    console.log(textContent);
    // const animated = (toValue = 1) => {
    //     const animations = textContent.map((_, i) => {
    //         return Animated.timing(animatedValues3[i], {
    //             toValue,
    //             duration: 500,
    //             useNativeDriver: true
    //         })
    //     })
    //     console.log(animations);
    //     Animated.stagger(100, animations).start();
    // }
    useEffect(() => {

        
        console.log("hello")
    }, []);


    return (
        <View style={styles.container}>
            {
                textContent.map((word, index) => {
                    return <Animated.Text key={`${word}-${index}`} style={[styles.text, {
                        opacity: animatedValues3[index],
                        top:height/(2.5 - +(`0.`+index*4)),
                        transform: [{
                            translateY: Animated.multiply(
                                animatedValues3[index],
                                new Animated.Value(-10)
                            ),
                        },
                    ]
                    }]}>
                        {word}
                        {`${index < textContent.length ? ' ' : ''}`}
                    </Animated.Text>
                })
            }


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 38,
        width: '100%',
        fontWeight: 'bold',
        position: 'absolute',
        top: height / 2.5,
        zIndex: 1,
        textAlign: 'center'
    }
})

export default Text;