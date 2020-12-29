import React, { useState } from "react";
import styled from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import Player from "../components/Home";
import Setting from "../components/Setting";
import { Octicons } from '@expo/vector-icons';
import Youtube from "../components/Youtube/Youtube";
import { Entypo } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import Modal from 'react-native-modal';
import {Button, View} from 'react-native';
import { TouchableOpacity } from 'react-native';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Stack = createStackNavigator();

export default () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle:{backgroundColor:'#D5ADA6'},
                headerTintColor: "#F0EFEB"
            }}
        >
            <Stack.Screen 
                options={({ navigation }) => ({
                headerTitle: "",
                headerRight:() =>(
                    <TouchableOpacity onPress={()=>navigation.navigate("Setting")}>
                        <Octicons 
                        name="three-bars" 
                        size={35} 
                        color="#F0EFEB"
                        style={{ marginRight:10 }}
                        />
                    </TouchableOpacity>
                ),
                headerLeft:() => (
                    <TouchableOpacity onPress={()=>navigation.navigate("Youtube")}>
                    <Entypo 
                        name="youtube" 
                        size={35} 
                        // color="#E1CD87"
                        color="#F0EFEB"
                        style={{ marginLeft:10 }}
                    />
                    </TouchableOpacity>
                )
            })}
            name="Player" 
            component={Player} 
            />
            <Stack.Screen 
            options={{ 
                headerTitle: ""
            }}
            name="Setting" 
            component={Setting} 
            />
            <Stack.Screen 
            options={{ 
                headerTitle: ""
            }}
            name="Youtube" 
            component={Youtube} />
        </Stack.Navigator>
    );
}