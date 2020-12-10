import { createStore } from "redux";

const InitState = {
    warmUp: {
        audio_id: 1,
        title: "Warm Up",
        duration: 218000,
        count: 1,
    },
    plie: {
        audio_id: 2,
        title: "Plie",
        duration: 45000,
        count: 1,
    },
    tendus: {
        audio_id: 3,
        title: "Tendus",
        duration: 48000,
        count: 1,
    },
    jete: {
        audio_id: 4,
        title: "Jete",
        duration: 49000,
        count: 1,
    },
    degage: {
        audio_id: 5,
        title: "Degage",
        duration: 82000,
        count: 1,
    },
    rondDeJumbe: {
        audio_id: 6,
        title: "Rond De Jumbe",
        duration: 54000,
        count: 1,
    },
    battemant: {
        audio_id: 7,
        title: "Battemant",
        duration: 73000,
        count: 1,
    },
    grandBattemant: {
        audio_id: 8,
        title: "Grand Battemant",
        duration: 50000,
        count: 1,
    },
    jumps: {
        audio_id: 9,
        title: "Jumps",
        duration: 45000,
        count: 1,
    },
};

const Reducer = ( state=InitState, action ) => {
    switch (action.type) {
        case 'Warm Up_INCRE':
            return {
                ...state,
                warmUp:{
                    audio_id: 1,
                    title: "Warm Up",
                    duration: 218000,
                    count: state.warmUp.count+1,
                } 
            }
        case 'Warm Up_DECRE':
            if(state.warmUp.count===0)  return {...state};
            return {
                ...state,
                warmUp:{
                    audio_id: 1,
                    title: "Warm Up",
                    duration: 218000,
                    count: state.warmUp.count-1,
                } 
            }
        case 'Plie_INCRE':
            return {
                ...state,
                plie: {
                    audio_id: 2,
                    title: "Plie",
                    duration: 45000,
                    count: state.plie.count+1,
                },
            }
        case 'Plie_DECRE':
            if(state.plie.count===0)  return {...state};
            return {
                ...state,
                plie: {
                    audio_id: 2,
                    title: "Plie",
                    duration: 45000,
                    count: state.plie.count-1,
                },
            }
        case 'Tendus_INCRE':
            return {
                ...state,
                tendus: {
                    audio_id: 3,
                    title: "Tendus",
                    duration: 48000,
                    count: state.tendus.count+1,
                },
            }
        case 'Tendus_DECRE':
            if(state.tendus.count===0)  return {...state};
            return {
                ...state,
                tendus: {
                    audio_id: 3,
                    title: "Tendus",
                    duration: 48000,
                    count: state.tendus.count-1,
                },
            }
        case 'Jete_INCRE':
            return {
                ...state,
                jete: {
                    audio_id: 4,
                    title: "Jete",
                    duration: 49000,
                    count: state.jete.count+1,
                },
            }
        case 'Jete_DECRE':
            if(state.jete.count===0)  return {...state};
            return {
                ...state,
                jete: {
                    audio_id: 4,
                    title: "Jete",
                    duration: 49000,
                    count: state.jete.count-1,
                },
            }
        case 'Degage_INCRE':
            return {
                ...state,
                degage: {
                    audio_id: 5,
                    title: "Degage",
                    duration: 82000,
                    count: state.degage.count+1,
                },
            }
        case 'Degage_DECRE':
            if(state.degage.count===0)  return {...state};
            return {
                ...state,
                degage: {
                    audio_id: 5,
                    title: "Degage",
                    duration: 82000,
                    count: state.degage.count-1,
                },
            }
        case 'Rond De Jumbe_INCRE':
            return {
                ...state,
                rondDeJumbe: {
                    audio_id: 6,
                    title: "Rond De Jumbe",
                    duration: 54000,
                    count: state.rondDeJumbe.count+1,
                },
            }
        case 'Rond De Jumbe_DECRE':
            if(state.rondDeJumbe.count===0)  return {...state};
            return {
                ...state,
                rondDeJumbe: {
                    audio_id: 6,
                    title: "Rond De Jumbe",
                    duration: 54000,
                    count: state.rondDeJumbe.count-1,
                },
            }
        case 'Battemant_INCRE':
            return {
                ...state,
                battemant: {
                    audio_id: 7,
                    title: "Battemant",
                    duration: 73000,
                    count: state.battemant.count+1,
                },
            }
        case 'Battemant_DECRE':
            if(state.battemant.count===0)  return {...state};
            return {
                ...state,
                battemant: {
                    audio_id: 7,
                    title: "Battemant",
                    duration: 73000,
                    count: state.battemant.count-1,
                },
            }
        case 'Grand Battemant_INCRE':
            return {
                ...state,
                grandBattemant: {
                    audio_id: 8,
                    title: "Grand Battemant",
                    duration: 50000,
                    count: state.grandBattemant.count+1,
                },
            }
        case 'Grand Battemant_DECRE':
            if(state.grandBattemant.count===0)  return {...state};
            return {
                ...state,
                grandBattemant: {
                    audio_id: 8,
                    title: "Grand Battemant",
                    duration: 50000,
                    count: state.grandBattemant.count-1,
                },
            }
        case 'Jumps_INCRE':
            return {
                ...state,
                jumps: {
                    audio_id: 9,
                    title: "Jumps",
                    duration: 45000,
                    count: state.jumps.count+1,
                },
            }
        case 'Jumps_DECRE':
            if(state.jumps.count===0)  return {...state};
            return {
                ...state,
                jumps: {
                    audio_id: 9,
                    title: "Jumps",
                    duration: 45000,
                    count: state.jumps.count-1,
                },
            }
        default :
            return {
                ...state,
            }
    }
}

export const store = createStore(Reducer);