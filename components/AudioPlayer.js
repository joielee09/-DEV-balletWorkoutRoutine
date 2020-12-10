import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Audio } from "expo-av";
import { Entypo } from '@expo/vector-icons'; 
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { secToMin } from "../utils";
import { connect } from "react-redux";
import { store } from "../Store";
import * as Font from 'expo-font';
import { AppLoading } from "expo";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const TitleContainer = styled.View`
    width: ${WIDTH}px;
    height: ${HEIGHT/14}px;
    background-color: #D5ADA6;
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
    font-size: 28px;
    color: #F0EFEB;
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
    color:#887468;
`;
const DurationContainer = styled.View`
    width:50px;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 12px;
`;
const DurationText = styled.Text`
    color: #887468;
`;

const Soundobj = new Audio.Sound();
let cnt = 1;
let NumOfLoop = 1;

const AudioPlayer = () => {

    const [curTime, setCurTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("Warm Up");
    const [loop, setLoop] = useState(switchLoop(cnt));

    const onPlaybackStatusUpdate = async(obj) => {
        setCurTime(secToMin(obj.positionMillis));
        setDuration(secToMin(obj.durationMillis));
        if(obj.didJustFinish){
            console.log("song finished!");
            
            // play until number of loop === loop cnt
            if(NumOfLoop < switchLoop(cnt)) {
                NumOfLoop++;
                console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
                handlePlay();
            }  

            // if it is the last song print finish and init cnt, loop, title and stop 
            if( cnt+1 === 10 ) {
                console.log("finished");
                handleStop();
                return;
            }                 
            
            // play next song
            cnt++;
            NumOfLoop=1;

            // play until next song has cnt;
            const condition = true;
            while(condition) {
                if(switchLoop(cnt))    break;
                cnt++;
            }
            
            setTitle(switchTitle(cnt));
            setLoop(switchLoop(cnt));
            console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
            
            // unload and load music only if audio plays next song
            await Soundobj.unloadAsync();
            await Soundobj.loadAsync(SwitchAudio(cnt));
            handlePlay();
        }
        setProgress(parseFloat((obj.positionMillis/obj.durationMillis).toFixed(4)));
    }

    // go to youtube page
    const navigation = useNavigation();
    const goToYoutube = () => {
        navigation.navigate("Youtube",{});
    }

    const handlePlay = async() => {
        console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
        setIsPlaying(true);

        // if sth is loaded, unload first
        // if(Soundobj._loaded)    await Soundobj.unloadAsync();
        // load cur cnt audio file
        
        await Soundobj.playAsync();
    }

    const handlePlayPause = async() => {
        console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
        
        // if(!Soundobj._loaded)   await Soundobj.loadAsync(SwitchAudio(cnt));
        isPlaying? (
            await Soundobj.pauseAsync()
        ) : (
            await Soundobj.playAsync()
        )
        setIsPlaying(!isPlaying);        
    }

    const handleForward = async() => {
        console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
        
        if(NumOfLoop < switchLoop(cnt)) {
            NumOfLoop++;
            console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
            handlePlay();
        }
        
        if( cnt+1 === 10 ) {
            console.log("finished");
            handleStop();
            return;
        }

        cnt++;
        NumOfLoop=1;

        const condition = true;
        while(condition) {
            if(switchLoop(cnt))    break;
            cnt++;
        }
        
        setTitle(switchTitle(cnt));
        setLoop(switchLoop(cnt));
        console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
        
        await Soundobj.unloadAsync();
        await Soundobj.loadAsync(SwitchAudio(cnt));
        handlePlay();
    }

    const handleBackward = async() => {
        if(NumOfLoop > 1) {
            NumOfLoop--;
            console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
            handlePlay();
        }                   
        
        if(cnt===1){
            alert("this is the first music")
            return;
        }

        --cnt;
        NumOfLoop=1;
        setTitle(switchTitle(cnt));
        setLoop(switchLoop(cnt));
        
        await Soundobj.unloadAsync();
        await Soundobj.loadAsync(SwitchAudio(cnt));
        handlePlay();
    }

    const handleStop = async() => {
        cnt=1;
        NumOfLoop=1;
        await Soundobj.stopAsync();
        await Soundobj.unloadAsync();

        // set audio to first song
        await Soundobj.loadAsync(SwitchAudio(cnt));

        // init status
        setIsPlaying(false);
        // console.log(isPlaying);  statis checking
        setTitle(switchTitle(cnt));
        setLoop(switchLoop(cnt));
    }

    useEffect(()=> {
        navigation.addListener('blur',()=>{
            handleStop();
        });
    },[]);

    useEffect(() => {
        if(switchLoop(1)===0)   cnt++;
        setTitle(switchTitle(cnt));
        setLoop(switchLoop(cnt));
        Soundobj.loadAsync(SwitchAudio(1));
        Soundobj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        console.log("init");
    }, [])

    const [loaded] = Font.useFonts({
        'IndieFlower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });
    const loadAssets = () => {}
    const onFinish = () => {
    }

    if(loaded){
        return (
            <Wrapper>
            
            {/* Title */}
            <TitleContainer>
                <TitleText style={{ fontFamily: 'IndieFlower' }}>{title}</TitleText>
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
                    color="#5F4C3F"
                    style={{
                        width: WIDTH*0.87,
                        marginTop: 30,
                        marginLeft: 20,
                    }}
                />
            </ProgressContainer>
            
            {/* Button */}
            <ButtonContainer>
                {/* StopBtn */}
                <TouchableOpacity onPress={handleStop}>
                <StopBtn>
                <Entypo 
                    name="controller-stop"
                    size={35}
                    color="#887468"
                />
                </StopBtn>
                </TouchableOpacity>
                {/* PrevBtn */}
                <TouchableOpacity onPress={handleBackward}>
                <PrevBtn>
                <Entypo 
                    name="controller-jump-to-start"
                    size={40}
                    color="#887468"
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
                    color="#887468"
                    />
                ) : (
                    <Entypo 
                    name="controller-play"
                    size={50}
                    color="#887468"
                    />
                )}
                </PlayPuaseBtn>
                </TouchableOpacity>
                {/* NextBtn */}
                <TouchableOpacity onPress={handleForward}>
                <NextBtn>
                <Entypo 
                    name="controller-next"
                    size={40}
                    color="#887468"
                />
                </NextBtn>
                </TouchableOpacity>
                {/* SettingBtn */}
                <TouchableOpacity onPress={goToYoutube}>
                <SettingBtn>
                <Entypo 
                    name="youtube" 
                    size={30} 
                    color="#E1CD87"
                />
                </SettingBtn>
                </TouchableOpacity>
            </ButtonContainer>
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

const mapStateToProps = ( state ) => {
    return ({ state : state });
};

const mapDispatchToProps = ( dispatch ) => {
    return ({ dispatch : dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);

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

const switchTitle = (input) => {
    switch(input) {
        case 1:
            return store.getState().warmUp.title;
        case 2:
            return store.getState().plie.title;
        case 3:
            return store.getState().tendus.title;
        case 4:
            return store.getState().jete.title;
        case 5:
            return store.getState().degage.title;
        case 6:
            return store.getState().rondDeJumbe.title;
        case 7:
            return store.getState().battemant.title;
        case 8:
            return store.getState().grandBattemant.title;
        case 9:
            return store.getState().jumps.title;
    }
}

const switchLoop = (input) => {
    switch(input) {
        case 1:
            return (store.getState().warmUp.count);
        case 2:
            return store.getState().plie.count;
        case 3:
            return store.getState().tendus.count;
        case 4:
            return store.getState().jete.count;
        case 5:
            return store.getState().degage.count;
        case 6:
            return store.getState().rondDeJumbe.count;
        case 7:
            return store.getState().battemant.count;
        case 8:
            return store.getState().grandBattemant.count;
        case 9:
            return store.getState().jumps.count;
    }
}