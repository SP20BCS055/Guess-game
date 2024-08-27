import { View, Text, TextInput, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react';
import PrimaryButton from '../components/UI/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/UI/Title';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';


const StartGameScreen = ({ onPickNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState('');

    const { width, height } = useWindowDimensions()

    function numberInputHandler(enteredtext) {
        setEnteredNumber(enteredtext)
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const choseNumber = parseInt(enteredNumber);

        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to 0 to 99',
                [{ text: 'okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }

        onPickNumber(choseNumber)
    }

    const marginTopDistance = height < 400 ? 20 : 100

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    <View>
                        <Title>Guess My Number</Title>
                    </View>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput
                            style={styles.input}
                            maxLength={2}
                            keyboardType='number-pad'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>

                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        // marginTop: deviceHeight < 400 ? 40 :100,
        alignItems: 'center'
    },
    input: {
        height: 50,
        fontSize: 32,
        width: 50,
        borderBottomColor: Colors.primary3,
        borderBottomWidth: 2,
        color: Colors.primary3,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})