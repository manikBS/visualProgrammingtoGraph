export class cos{
    constructor(id)
    {
        this.id = id;
        this.output = null;
        this.inConnectors = [];
        this.outConnectors = [];
        this.inputLength = 2;
        this.input=[];
    } 
    
    setOutConnectors(outElement){
        this.outConnectors.push(outElement)
    }

    setInConnecctors(port,inElement){
        this.inConnectors.push({port:port,inConnection:inElement})
    }

    getInputs(){
        this.inConnectors.forEach((ele)=>{
            if(ele.inConnection.output!==null) this.input[ele.port.slice(2,)-1]=ele.inConnection.output
        })
        return this.input
    }

    calculateOutput(){
        this.output=100
        return this.output
    }
    
}

