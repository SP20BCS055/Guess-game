import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native'
import React from 'react';
import Colors from '../../constants/colors';

const Title = ({children}) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  )
}

export default Title;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    title: {
        fontSize: deviceWidth < 380 ? 18 : 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign:"center",
        borderWidth: 2,
        borderColor: Colors.primary3,
        padding: 12,
        maxWidth: '80%',
        width: 300
    }
})