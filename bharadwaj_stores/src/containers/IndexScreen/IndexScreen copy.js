import React, { useEffect, useState } from 'react';
import { Text, Animated, useWindowDimensions, TouchableOpacity } from 'react-native';
import StatusBar from '../../components/StatusBar';
import indexScreenStyles from './styles';

const IndexScreen = ({ navigation }) => {
    const styles = indexScreenStyles();
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
    const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));
    const textContent = (`Bharadwaj Stores`).trim().split(' ');
    const [animatedValues3, setAnimatedValues3] = useState(textContent.map((_, i) => {
        return new Animated.Value(0.01);
    }));
    const [animatedValue4, setAnimatedValue4] = useState(new Animated.Value(0));

    const { height, width } = useWindowDimensions();

    const heightCalc = (value) => {
        return height * value / 100;
    }
    console.log("height-full:"+heightCalc(100))
    const animatedButtons = [{ style: { opacity: animatedValue4 }, text: 'Sign In', onPress: () => navigation.navigate('LoginScreen') },
    { style: { opacity: animatedValue4 }, text: 'Sign Up', onPress: () => navigation.navigate('SignUp Screen 1') }
    ]

    useEffect(() => {

        Animated.sequence([Animated.stagger(300, [
            Animated.timing(animatedValue, {
                toValue: heightCalc(100),
                duration: 1500,
                useNativeDriver: false
            }),
            Animated.timing(animatedValue1, {
                toValue: heightCalc(100),
                duration: 1500,
                useNativeDriver: false
            }),
            Animated.timing(animatedValue2, {
                toValue: heightCalc(100),
                duration: 1500,
                useNativeDriver: false
            }),
        ].concat(textContent.map((_, i) => {
            return Animated.timing(animatedValues3[i], {
                toValue: 1,
                duration: 500,
                delay: 1200,
                useNativeDriver: false
            })
        })).concat(
            Animated.timing(animatedValue4, {
                toValue: heightCalc(100),
                duration: 1500,
                delay: 2000,
                useNativeDriver: false
            })
        ))]).start();
    }, [height]);

    const animatedStyle = {
        height: animatedValue
    }

    const animatedStyle1 = {
        height: animatedValue1
    }

    const animatedStyle2 = {
        height: animatedValue2
    }
    // console.log(animatedValues3.map((_,i)=>{console.log("height:"+height+"/"+(animatedValues3.length-i*(i-10))); return i;}),animatedValues3.map((_,i)=>heightCalc(100)/(animatedValues3.length-i*1)))
    console.log(animatedValues3.map((_,i)=>{console.log(i+"height:"+heightCalc(33+(i*8))); return i;}),animatedValues3.map((_,i)=>heightCalc(100)/(animatedValues3.length-i*1)))
    return (
        <Animated.View style={styles.container}>
            <StatusBar />
            {
                textContent.map((word, index) => {
                    return <Animated.Text key={`${word}-${index}`} style={[styles.text, {
                        opacity: animatedValues3[index],
                        top:height>width?(heightCalc(30+(index*8.61))):(heightCalc(index==0?0.1*17:index*17)),
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
            <Animated.View style={[styles.box, animatedStyle]} />
            <Animated.View style={[styles.box, animatedStyle1]} />
            <Animated.View style={[styles.box, animatedStyle2]} />

            <Animated.View style={styles.buttonsContainer}>
                {animatedButtons.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={item.onPress} >
                            <Animated.View style={[styles.button, item.style]}>
                                <Animated.Text style={[styles.buttonText, { opacity: animatedValue4 }]}>{item.text}</Animated.Text>
                            </Animated.View>
                        </TouchableOpacity>
                    )
                })}

            </Animated.View>
        </Animated.View>
    )
}



export default IndexScreen;