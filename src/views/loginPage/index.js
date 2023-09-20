import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage=()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (values) => {
    let data = new FormData()
    data.append("email", email )
    data.append("password", password )
  };

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          name="email"
          placeholder="email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'gray',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    borderColor:"gray",
    borderWidth: 1
  },
  inputText: {
    height: 50,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#a9aaff',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default LoginPage;
