import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {Component} from "react";
import BottomTapNAvigator from './Componentes/BottomTapNavigation';
import { Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';
import * as Font from "expo-font";

export default class App extends Component{
  constructor(){
    super();
    this.state={
      fontLoaded:false
    };
  }
  async loadFonts(){
    await Font.loadAsync({
      Rajdhani_600SemiBold: Rajdhani_600SemiBold
    });
    this.setState({fontLoaded:true});
  }
  componentDidMount(){
    this.loadFonts();
  }
  render(){
    const{fontLoaded}=this.state;
        if(fontLoaded){
    return <BottomTapNAvigator/>;
        }
        return null;
  }
}
/*export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
});
*/
