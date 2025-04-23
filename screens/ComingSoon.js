import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const ComingSoon = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/come.png')} // optional: make sure you have an icon or illustration here
        style={styles.image}
      />
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>We're working on something awesome. Stay tuned!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
        <Text style={{ color: '#007BFF', marginTop: 20 }}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
