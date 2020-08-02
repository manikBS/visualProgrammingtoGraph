export class sin{
    constructor(id)
    {
        this.id = id;
        this.output = null;
        this.inConnectors = [];
        this.outConnectors = [];
        this.inputLength = 2;
        this.input=[null,null];
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
        var myData = [];
        for(var j = 0; j < 2 * Math.PI; j += 0.1) {
            myData.push(this.input[0]*Math.sin(j*this.input[1]));
        }
        this.output = myData
        console.log(this.output)
        return this.output
    }
    
}

