import React, {Component} from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import TranssaccionPantalla from "../pantallas/movimientos";
import BusquedaPantalla from "../pantallas/busqueda";
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();
export default class BottomTapNAvigator extends Component{
    render(){
        return(
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route})=>({
                        tabBarIcon:({focused,color,size})=>{
                            let iconName;
                            if(route.name==="movimiento"){
                                iconName = "book";
                            }else if(route.name==="busqueda"){
                                iconName = "search";
                            }
                            return(
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                    />
                            );
                        }
                    })}
                    tabBarIcon={{
                        activeTintColor:"#FFFFFF",
                        inactiveTintColor:"black",
                        style:{
                            height:130,
                            borderTopWidth:0,
                            backgroundColor:"5653d4",
                        },
                        labelStyle:{
                            fontSize:20,
                            fontFamily:"Rajdhani_600SemiBold"
                        },
                        labelPosition: "beside-icon",
                        tabStyle: {
                        marginTop: 25,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 30,
                        borderWidth: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#5653d4"
                        }
                    }}
                    >
                    <Tab.Screen name="movimiento" component={TranssaccionPantalla}/>
                    <Tab.Screen name="busqueda" component={BusquedaPantalla}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}