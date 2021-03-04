import * as React from 'react';
import { Button, Card, Title, Paragraph, Text, Divider } from 'react-native-paper';
import {responseToOpportunity} from './../utils/opportunities'


const OpportunityCard = ({opportunity, okCallBack, showButtons = false}) => {

  const {
    id, 
    title, 
    content, 
    contactName, 
    contactMail, 
    contactPhone, 
    accepted,
    idCompanyOffered,
    idCompanyReceived,
  } = opportunity;

  const [error, setError] = React.useState('')

  const notOkCallBack = (statusCode) => {
    setError(statusCode)
  }

  const errorCallBack = (error) => {
    setError(error.message)
  }

  // Accepts an opportunity
  const accept = () => {
    responseToOpportunity(
    id,
    true,
    title,
    idCompanyOffered,
    idCompanyReceived,
    okCallBack,
    notOkCallBack,
    errorCallBack
    )
  }

  // Rejects an opportunity
  const reject = () => {
    responseToOpportunity(
    id,
    false,
    title,
    idCompanyOffered,
    idCompanyReceived,
    okCallBack,
    notOkCallBack,
    errorCallBack
    )
  }

  return (
  <Card style={{paddingBottom: 15}}>
    <Card.Title title={title} />
    <Card.Content>
      <Text style={{marginBottom: 10}}>{content}</Text>
      <Text style={{fontWeight: "bold"}}>Datos de contacto</Text>
      <Text style={{fontWeight: "bold"}}>Nombre: <Text>{contactName}</Text></Text>
      <Text style={{fontWeight: "bold"}}>Correo: <Text>{contactMail}</Text></Text>
      <Text style={{fontWeight: "bold"}}>Teléfono: <Text>{contactPhone}</Text></Text>
    </Card.Content>
    {showButtons && <Card.Actions>
      <Button 
      mode='contained' 
      color="#002884" 
      onPress={accept}
      disabled={accepted !== null && accepted}
      >
      { accepted === null || !accepted
      ? "Aceptar"
      : "Aceptada"}
      </Button>
      <Button
      style={{marginLeft: 30}} 
      mode='contained' 
      color="red"
      onPress={reject}
     disabled={accepted !== null && !accepted}
      >
      {accepted === null || accepted
      ? "Rechazar"
      : "Rechazada"}
      </Button>
    </Card.Actions>
    }
    <Divider />
  </Card>
  )
};

export default OpportunityCard;