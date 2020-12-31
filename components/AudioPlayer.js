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
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View  } from "react-native";
import { Ionicons } from '@expo/vector-icons';

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
    /* height: ${HEIGHT/8}px; */
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-right: 20px;
    padding-left: 20px;
    /* background-color: orange; */
    padding-top: 10px;
`;
const SettingBtn = styled.View`
    width: 50px;
    height: 50px;
    padding-left: 18px;
    padding-top: 12px;
`;
const PlayPuaseBtn = styled.View`
`;
const NextBtn = styled.View`
`;
const PrevBtn = styled.View`
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

const audioSetting = async() => {
    await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
    });     
}

// audioSetting();
const Soundobj = new Audio.Sound();
let cnt = 1;
let NumOfLoop = 1;

const AudioPlayer = () => {

    let screenOn = true;
    const [curTime, setCurTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("Warm Up");
    const [loop, setLoop] = useState(switchLoop(cnt));

    const onPlaybackStatusUpdate = async(obj) => {
        // console.log("check finished or not: ", obj.didJustFinish);
        setCurTime(secToMin(obj.positionMillis));
        setDuration(secToMin(obj.durationMillis));
        // console.log("time: ",obj.positionMillis);
        if(obj.didJustFinish){
            console.log("song finished!");
            
            // play until number of loop === loop cnt
            if( NumOfLoop<switchLoop(cnt) ) {
                NumOfLoop++;
                console.log(" Looping!!  cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
                await Soundobj.stopAsync();
                await Soundobj.playAsync();
                return;
            } 

            // if it is the last song print finish and init cnt, loop, title and stop 
            if( cnt+1 === 10 ) {
                console.log("last music");
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
                if(cnt === 10) {
                    cnt = 1;
                    break;
                }
                cnt++;
                console.log("skippeg");
            }
            
            setTitle(switchTitle(cnt));
            setLoop(switchLoop(cnt));
            
            console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
            // unload and load music only if audio plays next song
            await Soundobj.unloadAsync();
            await Soundobj.loadAsync(SwitchAudio(cnt));
            if ( cnt===1 ) {
                handleStop();
                return;
            }
            else    handlePlay();
        }
        setProgress(parseFloat((obj.positionMillis/obj.durationMillis).toFixed(4)));
    }

    // go to youtube page
    const navigation = useNavigation();

    const handlePlay = async() => {
        console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
        setIsPlaying(true);

        if(Soundobj._loaded) {
            // if sth is loaded, unload first
            await Soundobj.unloadAsync();
            // load cur cnt audio file
            await Soundobj.loadAsync(SwitchAudio(cnt));
        }
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
        
        if( NumOfLoop < switchLoop(cnt) ) {
            NumOfLoop++;
            console.log(" Looping!!  cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
            await Soundobj.stopAsync();
            await Soundobj.playAsync();
            return;
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
            if(cnt === 10) {
                cnt = 1;
                break;
            }
            cnt++;
            console.log("skippeg");
        }
        
        setTitle(switchTitle(cnt));
        setLoop(switchLoop(cnt));
        
        console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
        await Soundobj.unloadAsync();
        await Soundobj.loadAsync(SwitchAudio(cnt));
        if ( cnt===1 ) {
            handleStop();
            return;
        }
        else    handlePlay();
    }

    const handleBackward = async() => {
        
        if (NumOfLoop > 1) {
            NumOfLoop--;
            console.log(" Looping!!  cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
            await Soundobj.stopAsync();
            await Soundobj.unloadAsync();
            await Soundobj.loadAsync(SwitchAudio(cnt));
            await Soundobj.playAsync();
            return;
        }                   
        
        if(cnt===1){
            alert("this is the first music")
            return;
        }

        --cnt;
        NumOfLoop=switchLoop(cnt);

        const condition = true;
        while(condition) {
            if(switchLoop(cnt)) break;
            --cnt;
            console.log("skipping");
        }
        
        setTitle(switchTitle(cnt));
        NumOfLoop=switchLoop(cnt);
        setLoop(switchLoop(cnt));

        console.log("cnt is ", cnt, " title is: ", switchTitle(cnt), " loop is: " , switchLoop(cnt),"and cur loop is: ", NumOfLoop);
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
        navigation.addListener('blur',async()=>{
            if(isPlaying) {
                await Soundobj.pauseAsync();
                setIsPlaying(!isPlaying);
            }
        });
    },[isPlaying]);

    useEffect(() => {
        // (async() => {
        //     await Soundobj.setAudioModeAsync({
        //         staysActiveInBackground: true,
        //         interruptionModeAndroid: Soundobj.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        //         shouldDuckAndroid: true,
        //         playThroughEarpieceAndroid: true,
        //         allowsRecordingIOS: true,
        //         interruptionModeIOS: Soundobj.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        //         playsInSilentModeIOS: true,
        //     })
        //     // Soundobj = await Audio.Sound();
        // })
        if(switchLoop(1)===0)   cnt++;
        setTitle(switchTitle(cnt));
        setLoop(switchLoop(cnt));
        Soundobj.loadAsync(SwitchAudio(1));
        Soundobj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        // Soundobj.setOnPlaybackStatusUpdate(onScreenStatusUpdate);
        console.log("init");
    }, [])

    const [loaded] = Font.useFonts({
        'Alegreya-Medium': require('../assets/fonts/Alegreya-Medium.ttf'),
    });
    const loadAssets = () => {}
    const onFinish = () => {
    }
    const [modalVisible, setModalVisible] = useState(false);
    if(loaded){
        return (
            <Wrapper>
            {/* Title */}
            <TitleContainer>
                <TitleText style={{ fontFamily: 'Alegreya-Medium' }}>{title}</TitleText>
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
                {/* <TouchableOpacity onPress={handleStop}>
                <StopBtn>
                <Entypo 
                    name="controller-stop"
                    size={35}
                    color="#887468"
                />
                </StopBtn>
                </TouchableOpacity> */}
                {/* PrevBtn */}
                <TouchableOpacity onPress={handleBackward}>
                <PrevBtn>
                <Ionicons 
                    name="md-skip-backward" 
                    size={50} 
                    color="#887468" 
                />
                </PrevBtn>
                </TouchableOpacity>
                {/* PlayPauseBtn */}
                <TouchableOpacity onPress={handlePlayPause}>
                <PlayPuaseBtn>
                {isPlaying? (
                    <Ionicons 
                        name="md-pause" 
                        size={50} 
                        color="#887468" 
                    />
                ) : (
                    <Ionicons 
                        name="md-play" 
                        size={50} 
                        color="#887468" 
                    />
                )}
                </PlayPuaseBtn>
                </TouchableOpacity>
                {/* NextBtn */}
                <TouchableOpacity onPress={handleForward}>
                <NextBtn>
                <Ionicons 
                    name="md-skip-forward" 
                    size={50} 
                    color="#887468" 
                />
                </NextBtn>
                </TouchableOpacity>
                {/* SettingBtn */}
                
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

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });