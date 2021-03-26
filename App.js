import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [home, setHome] = useState([]);
  const [link, setLink] = useState([]);
  const [linkChange, setLinkChange] = useState([]);

  useEffect(() => {
    readData();
    fetch('https://efs5i1ube5.execute-api.eu-central-1.amazonaws.com/prod')
      .then((response) => response.json())
      .then((json) => {
        saveData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const saveData = async (json) => {
    try {
      await AsyncStorage.setItem('link', json.link);
      await AsyncStorage.setItem('home', json.home);
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  };
  const readData = async () => {
    try {
      setLink(await AsyncStorage.getItem('link'));
      setHome(await AsyncStorage.getItem('home'));
      console.log('Data successfully readed');
    } catch (e) {
      console.log('Failed to fetch the data from storage');
    }
  };
  // console.log(home);
  // console.log(link);

  const actLink = async () => {
    try {
      // console.log(await AsyncStorage.getItem('link'));
      if ((await AsyncStorage.getItem('link')) !== []) {
        setLinkChange(home);
        await AsyncStorage.removeItemValue('link');
        await AsyncStorage.setItem('link', json.link);
      } else {
        setLinkChange(link);
      }
    } catch (e) {
      console.log('fail');
    }
  };
  actLink();
  console.log(linkChange);
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <WebView source={{ uri: `${linkChange}` }} />
      )}
    </View>
  );
};
