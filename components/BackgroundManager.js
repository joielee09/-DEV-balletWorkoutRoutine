import React from "react";
import { View, Text } from "react-native";
import Audio from "./AudioPlayer";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const taskName = "BACKGROUND_AUDIO_PLAY";
TaskManager.defineTask(BACKGROUND_AUDIO_PLAY, ({ data, error }) => {
    if (error) {
    console.log("error in taskmanager: ", error.message);
    return;
    }
    if (data) {
        console.log("AUDIO LOAD DATA: ", audio_load_data);
        const receivedNewData = data;
        return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
    }
});

export const BackgroundManager = () => {

    

    return(
        <View>
            <Text>This is background manager page!</Text>
        </View>
    );
}
