import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Switch } from 'react-native-paper'
import OpportunityCard from './../components/OpportunityCard';
import { getOpportunitiesOffered, getOpportunitiesReceived } from './../utils/opportunities'



const initialLayout = { width: Dimensions.get('window').width };

export default function OpportunitiesTab() {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Oportunidades recibidas' },
    { key: 'second', title: 'Oportunidades realizadas' },
  ]);

  const OpportunitiesReceived = () => {

    const [error, setError] = React.useState('');
    const [opportunitiesReceived, setOpportunitiesReceived] = React.useState([]);

    const notOkCallback = (statusCode) => {
      setError(statusCode)
    };

    const errorCallback = (error) => {
      setError(error.message)
    };

    const fetchOpportunitiesReceived = () => {
      getOpportunitiesReceived(
        setOpportunitiesReceived,
        notOkCallback,
        errorCallback
      )
    }

    React.useEffect(() => {
      fetchOpportunitiesReceived()
    }, [])

    return (
      <ScrollView>
        {
          opportunitiesReceived.map((opportunity) =>
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              okCallBack={fetchOpportunitiesReceived}
              showButtons
            />
          )
        }
      </ScrollView>
    )

  };

  const OpportunitiesOffered = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const [error, setError] = React.useState('');
    const [opportunitiesOffered, setOpportunitiesOffered] = React.useState([]);

    const notOkCallback = (statusCode) => {
      setError(statusCode)
    };

    const errorCallback = (error) => {
      setError(error.message)
    };

    const fetchOpportunitiesOffered = () => {
      getOpportunitiesOffered(
        setOpportunitiesOffered,
        notOkCallback,
        errorCallback
      )
    }

    React.useEffect(() => {

      isSwitchOn ?
      setOpportunitiesOffered(
        opportunitiesOffered.filter(
          (opportunity) => opportunity.accepted === true))
        : fetchOpportunitiesOffered()

      if (opportunitiesOffered === null) {
        return <Text>No has ofrecido ninguna oportunidad aun</Text>
      } 
    }, [isSwitchOn])


    return (
      <ScrollView>
        <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 10 }}>
          Mostrar aceptadas
      <Switch
            color="#002884"
            value={isSwitchOn}
            onValueChange={onToggleSwitch} />
        </Text>
        {opportunitiesOffered.map((opportunity) => {
          return (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              okCallBack={fetchOpportunitiesOffered}
            />
          )
        }
        )}
      </ScrollView>
    )
  };

  const renderScene = SceneMap({
    first: OpportunitiesReceived,
    second: OpportunitiesOffered,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
