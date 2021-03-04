import * as React from 'react';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CompanyCard = ({title, description, source, id}) => {

  const navigation = useNavigation();
  const facua = require('../../assets/images/facua-logo.jpg');
  
  return (
    <SafeAreaView>
      <Card style={styles.card}>
        <Card.Cover source={{ uri:'https://mindbodymoms.com/wp-content/uploads/2018/06/Your-Logo-here.png'}} />
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() => navigation.navigate('CreateOportunity', {id: id})}
            mode="contained"
            color="darkblue">
            Ofrecer oportunidad
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
});

export default CompanyCard;