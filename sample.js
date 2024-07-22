function div(text, classList, id, eventType, eventFN) {
    let divElement = document.createElement('div');
    divElement.innerText = text
    divElement.setAttribute('class', classList);
    divElement.setAttribute('id', id);
    divElement.addEventListener(eventType,eventFN);
    return divElement;
}


function alertUpdate(event) {
    alert("welcome")
}

div("welcome","bg-teal-600 w-4", "", "click", alertUpdate)


function asf(event) {
    alert("welcome")
}

div("popup","bg-teal-600 w-4", "", "click", asf)