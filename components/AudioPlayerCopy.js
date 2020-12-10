import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Audio } from "expo-av";
import { Entypo } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { secToMin } from "../utils";
import { connect } from "react-redux";
import { store } from "../Store";
import { maybeCompleteAuthSession } from "expo-web-browser";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const TitleContainer = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/14}px;
    background-color: #ffccd5;
`;
const ProgressContainer = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/15}px;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 5px;
`;
const ButtonContainer = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/10}px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-right: 20px;
    padding-left: 20px;
`;
const SettingBtn = styled.View`
    width: 50px;
    height: 50px;
    padding-left: 18px;
    padding-top: 12px;
`;
const PlayPuaseBtn = styled.View`
    width: 50px;
    height: 50px;
`;
const NextBtn = styled.View`
    width: 50px;
    height: 50px;
    padding-top: 5px;
`;
const PrevBtn = styled.View`
    width: 50px;
    height: 50px;
    padding-top: 4px;
    padding-left: 10px;
`;
const StopBtn = styled.View`
    width: 50px;
    height: 50px;
    padding-top: 8px;
    padding-left: 3px;
`;

const TitleText = styled.Text`
    font-size: 18px;
    color: white;
    margin: auto auto;
`;
const CurrentContainer = styled.View`
    width:50px;
    height: 20px;
    position: absolute;
    left: 15px;
    top: 12px;
`;
const CurrentText = styled.Text`
    color: white;
`;
const DurationContainer = styled.View`
    width:50px;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 12px;
`;
const DurationText = styled.Text`
    color: white;
`;

const Soundobj = new Audio.Sound();
let cnt =1;

const SwitchAudio = (id) => {
    switch (id) {
        case 1:
            return require('../assets/audio/1.warmUp.mp3');
        case 2:
            return require('../assets/audio/2.plie.mp3');
        case 3:
            return require('../assets/audio/3.tendus.mp3');
        case 4:
            return require('../assets/audio/4.jete.mp3');
        case 5:
            return require('../assets/audio/5.degage.mp3');
        case 6:
            return require('../assets/audio/6.rondDeJumbe.mp3');
        case 7:
            return require('../assets/audio/7.battemant.mp3');
        case 8:
            return require('../assets/audio/8.grandBattemant.mp3');
        case 9:
            return require('../assets/audio/9.jumps.mp3');
    }
}

const idx = [ 'warmUp', 'plie', 'tendus', 'jete', 'degage', 'rondDeJumbe', 'battemant', 'grandBattemant', 'jumps'];

const AudioPlayer = () => {

    const [curTime, setCurTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("Warm Up");
    const [cnt, setCnt] = useState(1);

    const onPlaybackStatusUpdate = (obj) => {
        setCurTime(secToMin(obj.positionMillis));
        setDuration(secToMin(obj.durationMillis));
        if(obj.didJustFinish){
            console.log("fin.", cnt+1);
            setCnt(cnt+1);
        }
        setProgress(parseFloat((obj.positionMillis/obj.durationMillis).toFixed(4)));
    }

    const navigation = useNavigation();
    const goToSetting = () => {
        navigation.navigate("Setting",{});
    }

    const handlePlay = async(cnt) => {
        setIsPlaying(true);
        await Soundobj.unloadAsync();
        await Soundobj.loadAsync(SwitchAudio(parseInt(cnt)));
        await Soundobj.playAsync();
    }

    const handlePlayPause = async() => {
        if(Soundobj._loaded) await Soundobj.unloadAsync();
        await Soundobj.loadAsync(SwitchAudio(parseInt(cnt)));
        isPlaying? (
            await Soundobj.pauseAsync()
        ) : (
            await Soundobj.playAsync()
        )
        setIsPlaying(!isPlaying);        
    }

    const handleForward = () => {
        console.log("forward"+cnt+1);
        setCnt(cnt+1);
    }

    const handleBackward = () => {
        console.log("backward"+cnt+1);
        setCnt(cnt-1);
    }

    const handleStop = async() => {
        await Soundobj.stopAsync();
        setCurTime(secToMin(0));
        setDuration(secToMin(0));
        setIsPlaying(false);
        setCnt(1);
        console.log(isPlaying);
        console.log(cnt);
    }

    useEffect(() => {
        handlePlay(cnt);
        Soundobj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        console.log("init");
    }, []);

    useEffect(() => {
        console.log("cnt changed");
        if(cnt===10){
            console.log("cnt is", cnt);
            handleStop();
            console.log("and cnt is", cnt);
            return;
        } else {
            console.log("playing in useEffect");
            handlePlay(cnt);
        }
    }, [cnt]);

    return (
        <Wrapper>
        
        {/* Title */}
        <TitleContainer>
            <TitleText>{title}</TitleText>
        </TitleContainer>
        
        {/* ProgressBar */}
        <ProgressContainer>
            <CurrentContainer>
            <CurrentText>{curTime}</CurrentText>
            </CurrentContainer>
            <DurationContainer>
            <DurationText>{duration}</DurationText>
            </DurationContainer>
            <ProgressBar 
                progress={progress}
                color="pink"
                style={{
                    width: 280,
                    marginTop: 30,
                    marginLeft: 20,
                }}
            />
        </ProgressContainer>
        
        {/* Button */}
        <ButtonContainer>
            {/* SettingBtn */}
            <TouchableOpacity onPress={goToSetting}>
            <SettingBtn>
            <Feather 
                name="settings"
                size={25}
                color="white"
            />
            </SettingBtn>
            </TouchableOpacity>
            {/* PrevBtn */}
            <TouchableOpacity onPress={()=>handleBackward(cnt)}>
            <PrevBtn>
            <Entypo 
                name="controller-jump-to-start"
                size={40}
                color="white"
            />
            </PrevBtn>
            </TouchableOpacity>
            {/* PlayPauseBtn */}
            <TouchableOpacity onPress={handlePlayPause}>
            <PlayPuaseBtn>
            {isPlaying? (
                <Entypo 
                name="controller-paus"
                size={50}
                color="white"
                />
            ) : (
                <Entypo 
                name="controller-play"
                size={50}
                color="white"
                />
            )}
            </PlayPuaseBtn>
            </TouchableOpacity>
            {/* NextBtn */}
            <TouchableOpacity onPress={()=>handleForward(cnt)}>
            <NextBtn>
            <Entypo 
                name="controller-next"
                size={40}
                color="white"
            />
            </NextBtn>
            </TouchableOpacity>
            {/* StopBtn */}
            <TouchableOpacity onPress={handleStop}>
            <StopBtn>
            <Entypo 
                name="controller-stop"
                size={35}
                color="white"
            />
            </StopBtn>
            </TouchableOpacity>
        </ButtonContainer>
        </Wrapper>
    );
}

const mapStateToProps = ( state ) => {
    return ({ state : state });
};

const mapDispatchToProps = ( dispatch ) => {
    return ({ dispatch : dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);