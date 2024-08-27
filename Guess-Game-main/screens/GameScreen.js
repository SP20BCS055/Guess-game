import { View, Text, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import Title from '../components/UI/Title';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/Game/NumberContainer'
import PrimaryButton from '../components/UI/PrimaryButton';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';
import GuessLogItem from '../components/Game/GuessLogItem'


function generateRandomBetween(min, max, exclude) {
    const random = Math.floor(Math.random() * (max - min)) + min;

    if (random === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return random;
    }
}

let min = 1;
let max = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
    let initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setguessRounds] = useState([initialGuess])

    const { width, height } = useWindowDimensions()

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        min = 1;
        max = 100;
    }, [])

    function nextGuessHandler(direction) {

        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't lie", 'You know this is wrong...', [
                { text: 'Sorry', style: 'cancel' }
            ])
            return;
        }

        if (direction === 'lower') {
            max = currentGuess;
        } else {
            min = currentGuess + 1;
        }
        const newRandomNumber = generateRandomBetween(min, max, currentGuess);
        setCurrentGuess(newRandomNumber)
        setguessRounds(prevGuessRounds => [newRandomNumber, ...prevGuessRounds])
    }


    const guessRoundListLength = guessRounds.length;


    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>

        <Card>
            <InstructionText style={styles.InstructionText}>Higher or Lower</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    if (width > 500) {
        content = <>
            <InstructionText style={styles.InstructionText}>
                Higher or Lower
            </InstructionText>
            <View style={styles.buttonContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>
        </>
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>

            {content}

            {/* <View>Log rounds</View> */}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}

                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) =>
                        <GuessLogItem
                            roundNumber={guessRoundListLength - itemData.index}
                            guess={itemData.item}
                        />
                    }
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    InstructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16
    },
    buttonContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})