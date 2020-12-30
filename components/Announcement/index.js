import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Container = styled.View``;
const Text = styled.Text``;

const Basic = () => {
    return (
        <Wrapper>
        <Text>This is Announcement page.</Text>
        </Wrapper>
    );
}

export default Basic;