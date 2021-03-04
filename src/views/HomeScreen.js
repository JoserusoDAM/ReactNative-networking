import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet, StatusBar, Text} from 'react-native';
import CompanyCard from './CompanyCard';
import {API_SERVER_URI} from './../constants/constants'

const facua = require('../../assets/images/facua-logo.jpg');
const alquilandia = require('../../assets/images/alquilandia-logo.jpeg');

const HomeScreen = () => {

  const [listOfCompanies, setListOfCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${API_SERVER_URI}/companies/`)
        .then(response => response.json())
        .then((data) => {
          setListOfCompanies(data)
        })
        .catch((err) => console.log('Error: ' + err));
    };
    fetchData();
  }, []);

  const renderCompany = ({item}) => (
    <CompanyCard
      title={item.name}
      description={item.description}
      id={item.id}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {listOfCompanies.length ? <FlatList
        data={listOfCompanies}
        renderItem={renderCompany}
        keyExtractor={item => item.id.toString()}
      /> : <Text style={styles.text}>No hay compañías para mostrar</Text>}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'blue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  text: {
    marginLeft: 10,
    fontSize: 15
  }
});

export default HomeScreen;