import {WebComponent} from "./webComponent.js";


console.log("components editor wokring");


export class WordsEditor extends WebComponent{

    constructor(){
        super();
    };
    
    connectedCallback(){
        console.log("WordsEditor connected");
        this.init();
    };

    init(){
        this.elementsMap = {
            addWordInput: '[name="addWordInput"]',
            addButton: '[name="addWordButton"]'
        };

        super.init();
    };

    initEvents(){
        this.eventsMap = [
            {element: "addButton", event: "click", eventHandler: this.addWordFromInput}
        ];
        super.initEvents();
    };

    addWordFromInput(){
        this.addWord(this.addWordInput.value);
    }

    addWord(word){
        this.globalStore.dispatch({type: "words/add", payload: {word}});
    };

    onStateChanged(state){
        console.log("word editor, onStateChanged ", state);
    };
}