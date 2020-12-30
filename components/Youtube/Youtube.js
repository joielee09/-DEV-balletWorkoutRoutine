import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Font from 'expo-font';

// APIs
import HorizontalContent from "./HorizontalContent";
import { 
    stretching,
    plie,
    tendus,
    jete,
    degage,
    rondDeJumbe,
    Battemant,
    GrandBattemant,
    Jumps,
    ballet_inspiration,
    ballet_dance
} from '../../API';
import { AppLoading } from "expo";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View`
    background-color: #FFF6F6 ;
`;
const Container = styled.View``;
const Text = styled.Text``;
const StretchingContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;
const Category = styled.View`
    height: 35px;
    background-color: #EFE0DD;
`;
const CategoryText = styled.Text`
    font-size: 17px;
    margin-left: 20px;
`;


const Basic = () => {
    // const [isReady, setIsReady] = useState(false);

    const loadAssets = () => {
    }
    const onFinish = () => {
    }
    const [loaded] = Font.useFonts({
        'Alegreya-Medium': require('../../assets/fonts/Alegreya-Medium.ttf'),
    });

    // console.log(stretching);
    if(loaded){
        return (
            <ScrollView>
            <Wrapper>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>✨ Ballet Inspiration</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {ballet_inspiration.map(cur=>(
                    <HorizontalContent 
                        key={ballet_inspiration.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>🎀 Masterpieces</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {ballet_dance.map(cur=>(
                    <HorizontalContent 
                        key={ballet_dance.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>Stretching</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {stretching.map(cur=>(
                    <HorizontalContent 
                        key={stretching.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>Plie</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {plie.map(cur=>(
                    <HorizontalContent 
                        key={plie.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>Tendus</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {tendus.map(cur=>(
                    <HorizontalContent 
                        key={tendus.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>
    
            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>Jete</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {jete.map(cur=>(
                    <HorizontalContent 
                        key={jete.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>Degage</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {degage.map(cur=>(
                    <HorizontalContent 
                        key={degage.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>RondDeJumbe</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {rondDeJumbe.map(cur=>(
                    <HorizontalContent 
                        key={rondDeJumbe.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>Battemant</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {Battemant.map(cur=>(
                    <HorizontalContent 
                        key={Battemant.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>GrandBattemant</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {GrandBattemant.map(cur=>(
                    <HorizontalContent 
                        key={GrandBattemant.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>

            <Category>
                <CategoryText style={{ fontFamily: 'Alegreya-Medium' }}>Jumps</CategoryText>
            </Category>
            <ScrollView horizontal={true}>
                {Jumps.map(cur=>(
                    <HorizontalContent 
                        key={Jumps.indexOf(cur)}
                        id={cur.id}
                        title={cur.title}
                        link={cur.link}
                        image={cur.image}
                    />
                ))}
            </ScrollView>


            </Wrapper>
            </ScrollView>
        );
    }
    else{
        return(
            <View
                style={{ flex:1, justifyContent:'center' }}
            >
            <ActivityIndicator size="large" color="#D5ADA6" />
            <AppLoading 
            startAsync={loadAssets}
            onFinish={onFinish}
            onError={console.error}
            />
            </View>
        );

    }
    
}

export default Basic;