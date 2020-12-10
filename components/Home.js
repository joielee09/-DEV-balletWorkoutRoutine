import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Audio from "./AudioPlayer";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Image = styled.Image`
    height: ${WIDTH*1.15}px;
    width: ${WIDTH}px;
`;
const Wrapper = styled.View`
    height: ${HEIGHT}px;
    background-color: #FFF6F6  ;
`;
const TopContainer = styled.View`
    background-color: #FAD6D6;
    /* height: 30px; */
`;

const Player = () => {
    return(
        <Wrapper>
        <TopContainer></TopContainer>
        <Image source={ require('../assets/playerimage.png') } />
        <Audio />
        </Wrapper>
    );
}

export default Player;