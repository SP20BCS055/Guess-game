import { View, Text, Image, StyleSheet, Dimensions, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'
import Title from '../components/UI/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/UI/PrimaryButton';

const GameOver = ({ roundsNumber, userNumber, onStartNewGame }) => {

  const { height, width } = useWindowDimensions()

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150
  }

  if (height < 380) {
    imageSize = 80
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>Game Over!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={require("../assets/success.png")} />
        </View>
        <Text style={styles.summaryText}>Your phone
          <Text style={styles.colorText}>{roundsNumber}</Text> rounds to guess the number
          <Text style={styles.colorText}>{userNumber}</Text>.
        </Text>

        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  )
}

export default GameOver;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary2,
    overflow: 'hidden',
    margin: 36
  },
  image: {
    width: '100%',
    height: '100%'
  },
  colorText: {
    color: Colors.primary
  },
  summaryText: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 24
  }
})