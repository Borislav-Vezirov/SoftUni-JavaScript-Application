
const main = document.querySelector('main');

export function showSection(section){

    main.replaceChildren(section);
}
//-------------------------------------------------------------------------------------------

export function el(type, attr, ...content){
        
    let element = document.createElement(type);

    for (const key in attr) {
        element.setAttribute(key, attr[key]);
    }

    for (let item of content) {

        if(typeof item == 'string' || typeof item == 'number'){
            item = document.createTextNode(item)
        }
        element.appendChild(item);
    }

    return element;
}