import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import Component from "./Component";
import { connect } from "react-redux";
import { store } from "../Store";

const Wrapper = styled.View``;

const Setting = () => {

    return(
        <ScrollView>
        <Wrapper>
        <Component 
            {...store.getState().warmUp}
        />
        <Component 
            {...store.getState().plie}
        />
        <Component 
            {...store.getState().tendus}
        />
        <Component 
            {...store.getState().jete}
        />
        <Component 
            {...store.getState().degage}
        />
        <Component 
            {...store.getState().rondDeJumbe}
        />
        <Component 
            {...store.getState().battemant}
        />
        <Component 
            {...store.getState().grandBattemant}
        />
        <Component 
            {...store.getState().jumps}
        />
        </Wrapper>
        </ScrollView>
    );
}

const mapStateToProps = ( state ) => {
    return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
    return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
