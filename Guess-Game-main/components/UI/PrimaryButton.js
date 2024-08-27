import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/colors'

const PrimaryButton = ({ children, onPress }) => {
    return (
        <View style={style.buttonOuterContainer}>
            <Pressable 
                android_ripple={{ color: Colors.primary2 }} 
                style={({pressed}) => pressed ? [style.container,style.presed] : style.container}
                onPress={onPress}
            >
                <Text style={style.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const style = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden"
    },
    container: {
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    presed: {
        opacity: 0.75
    }
})