export class constant{
    constructor(id,output)
    {
        this.id = id;
        this.output = output;
        this.inConnectors = [];
        this.outConnectors = [];
        this.inputLength = 0;
        this.input = [];
    }   

    setOutConnectors(outElement){
        this.outConnectors.push(outElement)
    }

    setInConnecctors(port,inElement){
        this.inConnectors.push({port:port,inConnection:inElement})
    }

    getInputs(){
        return [null]
    }

    calculateOutput(){
        return this.output
    }
        
}

