import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import * as Linking from 'expo-linking';
import { Link } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Font from 'expo-font';
import { AppLoading } from "expo";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View`
    width: 185px;
    height: 160px;
    border: gray 0.5px solid;
    margin: 10px 20px 10px 20px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    border-radius: 7px;
    justify-content: space-evenly;
    background-color: #FFF6F6;
`;
const Text = styled.Text``;
const Image = styled.Image`
    width: 160px;
    height: 90px;
`;

const HorizontalContent = ({
    id,
    title,
    link,
    image
}) => {

    const handleLink = (url) => {
        Linking.openURL(url)
    }
    const [loaded] = Font.useFonts({
        'IndieFlower': require('../../assets/fonts/IndieFlower-Regular.ttf'),
    });
    const loadAssets = () => {}
    const onFinish = () => {
    }

    if(loaded){
        return (
            <Wrapper>
            <TouchableOpacity onPress={()=>handleLink(link)}>
            <Image 
                source={{ uri:image }}
            />
            <Text style={{ fontFamily: 'IndieFlower' }}>{title.length>40? `${title.substring(0,40)}...` : title}</Text>
            </TouchableOpacity>
            </Wrapper>
        );
    } else {
        return(
        <AppLoading 
            startAsync={loadAssets}
            onFinish={onFinish}
            onError={console.error}
        />
        );
    }
    
}

export default HorizontalContent;