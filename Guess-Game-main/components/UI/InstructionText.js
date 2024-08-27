import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/colors'

const InstructionText = ({children, style}) => {
    return (
        <View>
            <Text style={[styles.instructionText, style]}>{children}</Text>
        </View>
    )
}

export default InstructionText;

const styles = StyleSheet.create({
    instructionText: {
    color: Colors.primary3,
    fontSize: 24
},
})