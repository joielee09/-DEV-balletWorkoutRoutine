import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { store } from "../Store";
import { secToMin } from "../utils";
import * as Font from 'expo-font';
import { AppLoading } from "expo";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const EvenWrapper = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/10.7}px;
    background-color: #D5ADA6;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 8px;
`;
const OddWrapper = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/10.7}px;
    background-color: #FFF6F6 ;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 8px;
`;
const OddText = styled.Text`
    color: #E1CD87 ;
    font-size: 18px;
`;
const EvenText = styled.Text`
    color: #726056 ;
    font-size: 18px;
`;
const OddNumber = styled.Text`
    font-size: 24px;
    color: #E1CD87;
    /* position: absolute;
    top: 8px;
    right: 115px; */
    opacity: 0.7;
`;
const EvenNumber = styled.Text`
    font-size: 24px;
    color: #5F4C3F;
    opacity: 0.7;
`;
const OddDuration = styled.Text`
    font-size: 20px;
    color: #E1CD87;
    /* position:absolute;
    top: 10px;
    right: 15px; */
    opacity: 0.7;
`;
const EvenDuration = styled.Text`
    font-size: 20px;
    color: #5F4C3F;
    /* position:absolute;
    top: 10px;
    right: 15px; */
    opacity: 0.7;
`;
const PlusSection = styled.View`
    /* position: absolute;
    top: 10px;
    right: 80px; */
`;
const MinusSection = styled.View`
    /* position: absolute;
    top: 10px;
    right: 140px; */
`;
const TextContainer = styled.View`
    width: 100px;
`;



const Component = ({ 
    audio_id, 
    title, 
    duration,
    count, 
}) => {

    const [value, setValue] = useState(0);

    const handleValue = (input) => {
        if(input==='Warm Up') {
            setValue(store.getState().warmUp.count);
            console.log(store.getState().warmUp.count);
        } else if(input==='Plie') {
            setValue(store.getState().plie.count);
            console.log(store.getState().plie.count);
        } else if(input==='Tendus') {
            setValue(store.getState().tendus.count);
        } else if(input==='Jete') {
            setValue(store.getState().jete.count);
        } else if(input==='Degage') {
            setValue(store.getState().degage.count);
        } else if(input==='Rond De Jumbe') {
            setValue(store.getState().rondDeJumbe.count);
        } else if(input==='Battemant') {
            setValue(store.getState().battemant.count);
        } else if(input==='Grand Battemant') {
            setValue(store.getState().grandBattemant.count);
        } else if(input==='Jumps') {
            setValue(store.getState().jumps.count);
        }
    }

    const handlePlus = (title) => {
        console.log(title);
        store.dispatch({ type: `${title}_INCRE` });
        handleValue(title);
    }

    const handleMinus = async(title) => {
        store.dispatch({ type: `${title}_DECRE` });
        handleValue(title);
    }

    useEffect(()=> {
        handleValue(title);
    }, []);

    useEffect(() => {
    }, [value]);

    const [loaded] = Font.useFonts({
        'Alegreya-Medium': require('../assets/fonts/Alegreya-Medium.ttf'),
    });
    const loadAssets = () => {}
    const onFinish = () => {
    }

    if(loaded){
        return audio_id%2? (
            <OddWrapper them={audio_id} >
            <TextContainer>
            <OddText style={{ fontFamily: 'Alegreya-Medium' }}>{title}</OddText>
            </TextContainer>
            <MinusSection>
            <TouchableOpacity onPress={()=>handleMinus(title)}>
            <Feather 
                name="minus-circle"
                size={25}
                color="#E1CD87"
            />
            </TouchableOpacity>
            </MinusSection>
    
            <OddNumber style={{ fontFamily: 'Alegreya-Medium' }}>{value}</OddNumber>
    
            <PlusSection>
            <TouchableOpacity onPress={()=>handlePlus(title)}>
            <Feather 
                name="plus-circle"
                size={25}
                color="#E1CD87"
            />
            </TouchableOpacity>
            </PlusSection>
    
            <OddDuration style={{ fontFamily: 'Alegreya-Medium' }}>{secToMin(duration*value)}</OddDuration>
            </OddWrapper>
        ): (
            <EvenWrapper them={audio_id} >
            <TextContainer>
            <EvenText style={{ fontFamily: 'Alegreya-Medium' }}>{title}</EvenText>
            </TextContainer>
    
            <MinusSection>
            <TouchableOpacity onPress={()=>handleMinus(title)}>
            <Feather 
                name="minus-circle"
                size={25}
                color="#887468"
            />
            </TouchableOpacity>
            </MinusSection>
    
            <EvenNumber style={{ fontFamily: 'Alegreya-Medium' }}>{value}</EvenNumber>
            
            <PlusSection>
            <TouchableOpacity onPress={()=>handlePlus(title)}>
            <Feather 
                name="plus-circle"
                size={25}
                color="#887468"
            />
            </TouchableOpacity>
            </PlusSection>
    
            <EvenDuration style={{ fontFamily: 'Alegreya-Medium' }}>{secToMin(duration*value)}</EvenDuration>
            </EvenWrapper>
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

const mapStateToProps = ( state ) => {
    return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
    return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



