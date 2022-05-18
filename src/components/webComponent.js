

export class WebComponent extends HTMLElement {
    constructor(){
        super();
    };

    init(){

        for(let key in this.elementsMap)
            this[key] = this.querySelector(this.elementsMap[key]);
    
        this.initEvents();
    };

    initEvents(){
        for(let key in this.eventsMap){
            let event = this.eventsMap[key];
            event.eventHandlerBind = event.eventHandler.bind(this);
            this[event.element].addEventListener(event.event, event.eventHandlerBind);
        };
    };

    set store(store ){
        this.globalStore = store;
        this.initStore();
    };

    initStore(){
        this.globalStore.subscribe(() => {
            if(this.onStateChanged)
                this.onStateChanged(this.globalStore.getState());
        });
    };
}