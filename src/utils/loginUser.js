import { API_SERVER_URI } from './../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (
    mail,
    password,
    okCallback = () => {},
    notOkCallback = (statusCode) => {},
    errorCallback = (error) => {}
  ) => {
    try {
      const response = await fetch(`${API_SERVER_URI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: mail, password: password }),
        credentials: "include",
      });
      // If its ok...
      if (response.ok) {
        const setCookie = response.headers.map['set-cookie'];
        var splitted = setCookie.split('auth-token=');
        var splitted = splitted[1].split(';');
        AsyncStorage.setItem('token', splitted[0])
        okCallback();
        return ;
      }
      // If its not ok...
      notOkCallback(response.status);
    } catch (error) {
      // If an error occurs...
      errorCallback(error);
    }
  };

