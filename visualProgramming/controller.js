import {constant} from './constant.js'
import {sin} from './sin.js'
import {cos} from './cos.js'

export function initialiser(graphModel) {
    console.log(graphModel)
    var links = [];
    var graphComponents = new Map();
    graphModel.cells.forEach(element => {
        if(element.type === "standard.Link") links.push(element)
    });
    graphModel.cells.forEach(element => {
        if(element.type !== "standard.Link") {
            graphComponents.set(element.id,createElementObject(element))
        }
    });
    for (const [key, value] of graphComponents.entries()) {
        links.filter((ele)=>{
            return ele.source.id===key
        }).forEach((ele)=>{
            value.setOutConnectors(graphComponents.get(ele.target.id))
        });
        links.filter((ele)=>{
            return ele.target.id===key
        }).forEach((ele)=>{
            value.setInConnecctors(ele.target.port,graphComponents.get(ele.source.id))
        });
    }
    console.log(graphComponents)
    return graphComponents
}


export function getEachStageOutput(graphComponents) {;
    var graphFilled = false ;
    while(!graphFilled){
        graphFilled = true;
        for (const [key, value] of graphComponents.entries()) {
            if(value.output===null){
                graphFilled = false;
                var inputs = value.getInputs();
                var allInputsNotPresent = inputs.some(el => {return el === null});
                if(!allInputsNotPresent) value.calculateOutput();
            }
        }
    }
    return graphComponents
}


function createElementObject(element) {
    var elementObject = null;
    switch (element.type) {
        case "constant.Element":
            elementObject = new constant(element.id,parseFloat(element.Value));
            break;
        case "sinx.Element":
            elementObject = new sin(element.id);
            break;
        case "cosx.Element":
            elementObject = new cos(element.id);
            break;
        default:
            break;
    }
    return elementObject
}