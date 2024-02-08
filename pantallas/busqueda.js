import React, {Component} from "react";
import { StyleSheet, Text, View } from 'react-native';

export default class BusquedaPantalla extends Component {
    render(){
        return (
            <View style={styles.container}>
              <Text style={styles.text}>Pantalla Busqueda</Text>
            </View>
          );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#5653D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:"purple",
    fontSize:30
  }
});
