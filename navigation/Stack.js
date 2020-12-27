import React from "react";
import styled from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import Player from "../components/Home";
import Setting from "../components/Setting";
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import Youtube from "../components/Youtube/Youtube";
import { Entypo } from '@expo/vector-icons'; 

const Wrapper = styled.View``;
const Text = styled.Text``;
const HeaderContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: red;
`;

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
                        color="#E1CD87"
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