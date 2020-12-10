import React from "react";
import styled from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import Player from "../components/Home";
import Setting from "../components/Setting";
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import Youtube from "../components/Youtube/Youtube";

const Wrapper = styled.View``;
const Text = styled.Text``;

const Stack = createStackNavigator();

export default () => {

    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle:{backgroundColor:'#D5ADA6'}
            }}
        >
            <Stack.Screen 
            options={({ navigation }) => ({
                headerTitle: "",
                headerRight:() =>(
                    <TouchableOpacity onPress={()=>navigation.navigate("Setting")}>
                    <Octicons 
                    name="three-bars" 
                    size={30} 
                    color="#F0EFEB"
                    style={{ marginRight:10 }}
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