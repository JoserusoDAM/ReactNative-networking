import React, {useState} from 'react';
import {StyleSheet, ImageBackground, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {Switch} from 'react-native-paper';
import {createOpportunity} from './../utils/createOportunity'
import Snackbar from 'react-native-snackbar';

const background = require('../../assets/images/login_background.png');

const OpportunityFormScreen = ({route}) => {

  const {id} = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [notOwner, setNotOwner] = useState(false);


  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
    setNotOwner(!notOwner)
  };

  const extraInputs = ( 
    <ScrollView>
    <Card>
        <TextInput
            label="Nombre"
            selectionColor="grey"
            mode="outlined"
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            label="Correo electrónico"
            selectionColor="grey"
            mode="outlined"
            value={mail}
            onChangeText={(mail) => setMail(mail)}
          />
          <TextInput
            label="Teléfono"
            selectionColor="grey"
            mode="outlined"
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
          />
          </Card>
    </ScrollView>
    )

    const handleSubmitData = async () => {
      
      const opportunity = {
        title: title,
        content: content,
        IdCompanyReceived: parseInt(id),
        contactName: name,
        contactMail: mail,
        contactPhone: phone,
        notOwner: notOwner,
      };
  
      const okCallback = () => {
        Snackbar.show({
          text: 'Oportunidad creada correctamente.',
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: 'black',
        });
      };

        const notOkCallback = (statusCode) => {
          if (statusCode > 500) {
            Snackbar.show({
              text: 'Algo fue mal en el servidor, inténtelo más tarde.',
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              backgroundColor: 'black',
            });
          } else if (statusCode === 500) {
            Snackbar.show({
              text: '¡No eres una compañía!',
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              backgroundColor: 'black',
            });
          } else if (statusCode === 403) {
            Snackbar.show({
              text: '¡No puedes realizarte una oferta a ti mismo!',
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

        if(title.length <= 0) {
          Snackbar.show({
            text: 'Algun campo está vacío.',
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'black',
          });
        } else {
          createOpportunity(opportunity, okCallback, notOkCallback, errorCallback);
        clearFields();
        }   
      } 

    const clearFields = () => {
      setTitle("");
      setContent("");
      setName("");
      setMail("");
      setPhone("");
    };
 

  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView style={styles.container}>
        <Card>
          <Card.Title title="Ofrecer una oportunidad de colaboración"/>
          <Card.Content>
            <TextInput
              label="Título"
              selectionColor="grey"
              mode="outlined"
              value={title}
              onChangeText={(title) => setTitle(title)}
            />
            <TextInput
              label="Descripción"
              selectionColor="grey"
              mode="outlined"
              multiline
              numberOfLines={4}
              value={content}
              onChangeText={(content) => setContent(content)}
            />
          </Card.Content>
          <Card.Content>
            <Text style={styles.text}>No soy el anunciante</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color="blue"
            />
          </Card.Content>
          <Card.Content>{notOwner && extraInputs}</Card.Content>
          <Card.Actions>
            <Button
              style={styles.button}
              color="red"
              mode="contained"
              onPress={clearFields}
              icon="cancel">
              Cancelar
            </Button>
            <Button
              style={styles.button}
              color="darkblue"
              mode="contained"
              onPress={handleSubmitData}
              icon="send">
              Enviar
            </Button>
          </Card.Actions>
        </Card>
    </ScrollView>
    </ImageBackground>
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
    marginRight: 15,
    alignItems: 'center'
  },
  company: {
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    alignSelf: 'flex-end',
    marginTop: 15
  }
});

export default OpportunityFormScreen;