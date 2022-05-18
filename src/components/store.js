import { createStore } from "redux";

let initialState = {words: []};

function addWord(state, action){
    let newState = {...state, words:  [...state.words] };
    newState.words.push({word: action.payload.word, index: newState.words.length});
    return newState;
};

function deleteWord(state, action){
    let newState = {...state, words:  [...state.words] };
    newState.words = newState.words.filter((item) => {
        return item.index != action.payload.index;
    });
    return newState;
};

function cloneWord(state, action){
    let newState = {...state, words:  [...state.words] };
    let newItem;
    newState.words.filter((item) => {
        if(item.index == action.payload.index){
            newItem = {index: newState.words.length, word: item.word + "_clone"};
        };
    });
    newState.words.push(newItem);
    return newState;
};

const rootReducer = function(state, action){
    console.log("reducer before = ", state);
    switch(action.type){
        case "words/add":
            console.log("adding word");
            return addWord(state, action);
            break;
        case "words/delete":
            console.log("deleting word");
            return deleteWord(state, action);
            break;
        case "words/clone":
                console.log("cloning word");
                return cloneWord(state, action);
                break;
        default:
            console.log("default");
            return state;
            break;
    }
};


export const globalStore = createStore(rootReducer, initialState);
