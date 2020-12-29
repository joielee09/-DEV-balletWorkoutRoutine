import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';
import { connect } from "react-redux";
import { store } from "../Store";
import { secToMin } from "../utils";
import { TouchableOpacity } from 'react-native';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const EvenWrapper = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/13}px;
    background-color: #FFF6F6;
    flex-direction: row;
    flex-wrap: wrap;
`;
const OddWrapper = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/13}px;
    background-color: #D5ADA6;
    flex-direction: row;
    flex-wrap: wrap;
`;
const Text = styled.Text`
    color: white;
    font-size: 15px;
    position: absolute;
    top: 10px;
    left: 10px;
`;
const Number = styled.Text`
    font-size: 20px;
    color: white;
    position: absolute;
    top: 8px;
    right: 115px;
    opacity: 0.7;
`;
const Duration = styled.Text`
    font-size: 15px;
    color: white;
    position:absolute;
    top: 10px;
    right: 15px;
    opacity: 0.7;
`;
const PlusSection = styled.View`
    position: absolute;
    top: 10px;
    right: 80px;
`;
const MinusSection = styled.View`
    position: absolute;
    top: 10px;
    right: 140px;
`;

const Basic = ({ 
    audio_id, 
    title, 
    duration,
    count
}) => {

    console.log(title);

    const handleWarmupPlus = () => {
        store.dispatch({ type: `warmUp_INCRE` });
        setValue(store.getState().warmUp.count);
    }
    
    const handleWarmupMinus = () => {
        if(!store.getState().warmUp)    return;
        store.dispatch({ type: `warmUp_DECRE` });
        setValue(store.getState().warmUp);
    }
    
    const handlePliePlus = () => {
        store.dispatch({ type: `plie_INCRE` });
        setValue(store.getState().plie);
    }
    
    const handlePlieMinus = () => {
        if(!store.getState().plie)    return;
        store.dispatch({ type: `plie_DECRE` });
        setValue(store.getState().plie);
    }

    const handleTendusPlus = () => {
        store.dispatch({ type: `tendus_INCRE` });
        setValue(store.getState().tendus);
    }
    
    const handleTendusMinus = () => {
        if(!store.getState().tendus)    return;
        store.dispatch({ type: `tendus_DECRE` });
        setValue(store.getState().tendus);
    }
    const handleJetePlus = () => {
        store.dispatch({ type: `jete_INCRE` });
        setValue(store.getState().jete);
    }
    
    const handleJeteMinus = () => {
        if(!store.getState().jete)    return;
        store.dispatch({ type: `jete_DECRE` });
        setValue(store.getState().jete);
    }
    const handleDegagePlus = () => {
        store.dispatch({ type: `degage_INCRE` });
        setValue(store.getState().degage);
    }
    
    const handleDegageMinus = () => {
        if(!store.getState().degage)    return;
        store.dispatch({ type: `degage_DECRE` });
        setValue(store.getState().degage);
    }
    const handleRondDuJumbePlus = () => {
        store.dispatch({ type: `rondDeJumbe_INCRE` });
        setValue(store.getState().rondDeJumbe);
    }
    
    const handleRondDuJumbeMinus = () => {
        if(!store.getState().rondDeJumbe)    return;
        store.dispatch({ type: `rondDeJumbe_DECRE` });
        setValue(store.getState().rondDeJumbe);
    }
    const handleEchappePlus = () => {
        store.dispatch({ type: `echappe_INCRE` });
        setValue(store.getState().echappe);
    }
    
    const handleEchappeMinus = () => {
        if(!store.getState().echappe)    return;
        store.dispatch({ type: `echappe_DECRE` });
        setValue(store.getState().echappe);
    }

    const handleBattemantPlus = () => {
        store.dispatch({ type: `battemant_INCRE` });
        setValue(store.getState().battemant);
    }
    
    const handleBattemantMinus = () => {
        if(!store.getState().battemant)    return;
        store.dispatch({ type: `battemant_DECRE` });
        setValue(store.getState().battemant);
    }
    const handleFonduPlus = () => {
        store.dispatch({ type: `fondu_INCRE` });
        setValue(store.getState().fondu);
    }
    
    const handleFonduMinus = () => {
        if(!store.getState().fondu)    return;
        store.dispatch({ type: `fondu_DECRE` });
        setValue(store.getState().fondu);
    }
    const handleGrandBattemantPlus = () => {
        store.dispatch({ type: `grandBattemant_INCRE` });
        setValue(store.getState().grandBattemant);
    }
    
    const handleGrandBattemantMinus = () => {
        if(!store.getState().grandBattemant)    return;
        store.dispatch({ type: `grandBattemant_DECRE` });
        setValue(store.getState().grandBattemant);
    }
    const handleJumpsPlus = () => {
        store.dispatch({ type: `jumps_INCRE` });
        setValue(store.getState().jumps);
    }
    
    const handleJumpsMinus = () => {
        if(!store.getState().jumps)    return;
        store.dispatch({ type: `jumps_DECRE` });
        setValue(store.getState().jumps);
    }

    const handleFreePlus = () => {
        store.dispatch({ type: `freeMusic_INCRE` });
        setValue(store.getState().freeMusic);
    }
    
    const handleFreeMinus = () => {
        if(!store.getState().freeMusic)    return;
        store.dispatch({ type: `freeMusic_DECRE` });
        setValue(store.getState().freeMusic);
    }

    const plusFunction = (title) => {
        switch(title){
            case 'warmUp':
                return handleWarmupPlus();
            case 'plie':
                return handlePliePlus();
            case 'tendus':
                return handleTendusPlus();
            case 'jete':
                return handleJetePlus();
            case 'degage':
                return handleDegagePlus();
            case 'rondDeJumbe':
                return handleRondDuJumbePlus();
            case 'echappe':
                return handleEchappePlus();
            case 'battemant':
                return handleBattemantPlus();
            case 'fondu':
                return handleFonduPlus();
            case 'grandBattemant':
                return handleGrandBattemantPlus();
            case 'jumps':
                return handleJumpsPlus();
            case 'freeMusic':
                return handleFreePlus();
        }
    }

    const minusFunction = (title) => {
        switch(title){
            case 'warmUp':
                return handleWarmupMinus();
            case 'plie':
                return handlePlieMinus();
            case 'tendus':
                return handleTendusMinus();
            case 'jete':
                return handleJeteMinus();
            case 'degage':
                return handleDegageMinus();
            case 'rondDeJumbe':
                return handleRondDuJumbeMinus();
            case 'echappe':
                return handleEchappeMinus();
            case 'battemant':
                return handleBattemantMinus();
            case 'fondu':
                return handleFonduMinus();
            case 'grandBattemant':
                return handleGrandBattemantMinus();
            case 'jumps':
                return handleJumpsMinus();
            case 'freeMusic':
                return handleFreeMinus();
        }
    }

    useEffect(() => {
    }, [value]);

    return id%2?(
        <OddWrapper them={id} >
        <Text>{title}</Text>

        <MinusSection>
        <TouchableOpacity onPress={()=>minusFunction(title)}>
        <Feather 
            name="minus-circle"
            size={25}
            color="white"
        />
        </TouchableOpacity>
        </MinusSection>

        <Number>{()=>stateFunc(title)}</Number>
        
        <PlusSection>
        <TouchableOpacity onPress={()=>plusFunction(title)}>
        <Feather 
            name="plus-circle"
            size={25}
            color="white"
        />
        </TouchableOpacity>
        </PlusSection>

        <Duration>{secToMin(duration*value)}</Duration>
        </OddWrapper>
    ): (
        <EvenWrapper them={id} >
        <Text>{title}</Text>

        <MinusSection>
        <TouchableOpacity onPress={()=>minusFunction(title)}>
        <Feather 
            name="minus-circle"
            size={25}
            color="white"
        />
        </TouchableOpacity>
        </MinusSection>

        <Number>{value}</Number>
        
        <PlusSection>
        <TouchableOpacity onPress={()=>plusFunction(title)}>
        <Feather 
            name="plus-circle"
            size={25}
            color="white"
        />
        </TouchableOpacity>
        </PlusSection>

        <Duration>{secToMin(duration*value)}</Duration>
        </EvenWrapper>
    );
}

const mapStateToProps = ( state ) => {
    return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
    return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Basic);