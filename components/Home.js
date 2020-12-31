import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Button } from "react-native";
import Audio from "./AudioPlayer";
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useKeepAwake } from 'expo-keep-awake';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const ImageHome = styled.Image`
    width: ${WIDTH}px;
    height: ${WIDTH*1.14}px;
`;
const Wrapper = styled.View`
    height: ${HEIGHT}px;
    background-color: #FFF6F6  ;
`;
const TopContainer = styled.View`
    background-color: #FAD6D6;
    /* height: 30px; */
`;
const Image = styled.Image`
    width: ${WIDTH*0.9}px;
    height: ${HEIGHT*0.86}px;
    margin: auto auto;
    margin-top: 10px;
`;
const View = styled.View``;

const slides = [
    {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../assets/image/intro.png'),
    backgroundColor: '#59b2ab',
    },
];

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('visited', value.toString());
    } catch(e) {
        console.log(e);
    }
};

const getData = async() => {
    try {
        const value = await AsyncStorage.getItem('visited')
        if(value !== null){
            console.log('data from storage is: ', value);
            return value;
        }
        else {
            console.log('local storage is empty');
            return null;
        }
    } catch(e) {
        console.log(e);
    }
}

const removeData = async() => {
    try {
        await AsyncStorage.removeItem('visited')
        console.log('item deleted!')
    } catch(e) {
        console.log(e);
    }
}

let data = '';
const visitedChk = async ()=> {
    data = await getData();
    return data;
}
visitedChk();

const Player = () => {
    useKeepAwake();
    const [showRealApp, setShowRealApp] = useState(false);
    const renderItem = ({ item }) => {
        return (
            <View>
                <Image source={item.image} />
            </View>
        )
    }
    const _onDone = async() => {
        await storeData('true');
        setShowRealApp(true);
        console.log("on done activated");
    }
    useEffect(() => {
        if(data==='true'){
            setShowRealApp(true);
            console.log('there is data! and you have visited before!!!!');
        } else {
            setShowRealApp(false);
            console.log('there is no data and it is the first visit')
        }
    }, []);
    if(showRealApp){
        return(
            <Wrapper>
            <TopContainer></TopContainer>
            {/* <Button 
                title="visited?"
                onPress={()=>storeData('true')}
            />
            <Button 
                title="show visited value"
                onPress={async()=> console.log(await getData())}
            />
            <Button 
                title="delete item"
                onPress={removeData}
            />
            <Button 
                title="show item"
                onPress={()=>console.log(showRealApp)}
            />
            <Button 
                title="check visited"
                onPress={visitedChk}
            /> */}
            <ImageHome source={ require('../assets/playerimage.png') } />
            <Audio />
            </Wrapper>
        );
    }
    else {
        return <AppIntroSlider renderItem={renderItem} data={slides} onDone={_onDone} />;
    }
}

export default Player;