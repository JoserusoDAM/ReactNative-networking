import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import EmailValidator from 'email-validator';
import {loginUser} from '../utils/loginUser';

const background = require('../../assets/images/login_background.png');
const company = require('../../assets/images/company.logo.jpg');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendLoginRequest = () => {
    const notOkCallback = (statusCode) => {
      if (statusCode >= 500) {
        Snackbar.show({
          text: 'Algo fue mal en el servidor, inténtelo más tarde.',
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'black',
        });
      } else {
        Snackbar.show({
          text: 'Email o contraseña invalidos.',
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'black',
        });
      }
    };

    const errorCallback = (error) => {
      console.log(error)
      Snackbar.show({
        text: 'Error de red.',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'black',
      });
    };

    const okCallback = async () => {
      // AsyncStorage guardar token
      navigation.replace('Tabs');
    }

    loginUser(
      email,
      password,
      okCallback,
      notOkCallback,
      errorCallback
    );
  };

  const onHandleSubmit = () => {
    if (!EmailValidator.validate(email)) {
      Snackbar.show({
        text: 'Correo inválido.',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'black',
      });
    } else if (!password) {
      Snackbar.show({
        text: 'Contraseña incorrecta.',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'white',
        backgroundColor: 'black',
      });
    } else {
      sendLoginRequest();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background}>
        <Card>
          <Card.Cover source={company} style={styles.company} />
          <Card.Content>
            <TextInput
              label="Email"
              textContentType="emailAddress"
              selectionColor="grey"
              mode="outlined"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              label="Contraseña"
              selectionColor="grey"
              mode="outlined"
              secureTextEntry={true}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </Card.Content>
          <Card.Content>
            <Button
              style={styles.button}
              color="darkblue"
              mode="contained"
              onPress={onHandleSubmit}
              icon="login">
              Iniciar sesión
            </Button>
          </Card.Content>
        </Card>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
  company: {
    marginBottom: 10,
    marginTop: 10,
  },
});

export default LoginScreen;
