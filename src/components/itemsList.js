import {WebComponent} from "./webComponent.js";

export class ItemsList extends WebComponent{

    constructor(){
        super();
    };
    
    connectedCallback(){
        console.log("WordsList connected");
        this.init();
    };

    init(){
        this.elementsMap = {
            liTemplate: '[name="itemTemplate"]',
            listContainer: '[name="listContainer"]'
        };

        super.init();

        this.stateValue = this.getAttribute("stateValue");
    };

    initEvents(){
        this.eventsMap = [
            //{element: "addButton", event: "click", eventHandler: this.addWordFromInput}
            {element: "listContainer", event: "click", eventHandler: this.onListContainerClicked}
        ];
        super.initEvents();
    };

    processActionClick(element){

        let htmlActionCompiled = element.getAttribute("htmlActionCompiled");
        let action = JSON.parse(htmlActionCompiled);

        this.globalStore.dispatch(action);
    };

    onListContainerClicked(event){
        if(event.target.getAttribute("htmlActionCompiled"))
            this.processActionClick(event.target);
    };
 

    clearList(){
        while(this.listContainer.firstChild)
            this.listContainer.removeChild(this.listContainer.firstChild);
    };

    ///valueDescription = 'item.hello'
    getValueFromStateItem(stateItem, valueDescription){
        let value = valueDescription.split('.').reduce((previous, current) => {
            return previous[current];
        }, {item: stateItem});

        return value;
    };

    initListItemActions(listItem, stateItem){
        let htmlActions = listItem.querySelectorAll('[htmlAction]');

        for(let key = 0; key < htmlActions.length; key++){
            let htmlAction = htmlActions[key];
            let actionStr = htmlAction.getAttribute("htmlAction");
            actionStr = actionStr.replace(/\$\_\{([^\}]+)\}/gi, (value, firstCatch) => {
                return this.getValueFromStateItem(stateItem, firstCatch);
            });
            htmlAction.setAttribute("htmlActionCompiled", actionStr);
            //console.log(actionStr);
        };
    }

    renderList(){
        this.clearList();

        for(let i of this.state){
            let stateItem = i;

            let li = this.liTemplate.content.cloneNode(true);
            let htmlItems = li.querySelectorAll('[htmlValue]');
            for(let key = 0; key < htmlItems.length; key++){
                let htmlItem = htmlItems[key];
                
                let htmlValue = htmlItem.getAttribute('htmlValue');
                htmlItem.innerHTML = this.getValueFromStateItem(stateItem, htmlValue);
            };

            this.initListItemActions(li, stateItem);

            this.listContainer.append(li);
        };
    };

    onStateChanged(state){
        //Extract needed for the list state from global state.
        this.state = this.getValueFromStateItem(state, this.stateValue);
        this.renderList();       
    };
   
}