const numbers = document.getElementsByClassName("number")
const operators = document.getElementsByClassName("operator")
const result = document.querySelector(".result h3")
const historyEle = document.querySelector(".result h4")

window.onload = () => {
    //update result with numbers
    for(let i = 0; i < numbers.length; i++){
        numbers[i].addEventListener('click', function(){
            let output = getOutput()
            if(output != NaN){ 
                output += this.innerHTML
                printOutput(output)
            }
        })
    }
    //Calculations go here ---> 
    for(let i = 0; i < operators.length; i++){
        operators[i].addEventListener('click', function(){
            let output = getOutput()
            let history = getHistory()
            if(this.innerText.toLowerCase() == "ac"){ // clears everything in result
                printHistory("")
                printOutput("")
            }
            else if(this.id == "backspace"){ // acts like backspace
                if(output)
                    output = output.substr(0, output.length-1) 
                else{
                    output = history
                    output = output.substr(0, output.length-1)
                    printHistory("") //when we change history, it's no longer history
                }
                printOutput(output)
            }
            else{ 
                //arthimetic operators shouldn't work if input is empty expect "-" and "." 
                if(output != "" || history != ""){
                    history += output
                    if(this.innerText == "="){
                        printOutput(eval(history)) //eval() - executes string as JS script
                        printHistory("")
                    } //converts decimal to fraction
                    else if(this.innerText == "fr"){
                        let decimalArray = history.split(".")
                        let leftDecimalPart = decimalArray[0]
                        let rightDecimalPart = decimalArray[1]

                        let deno = Math.pow(10, rightDecimalPart.length)
                        let nume = leftDecimalPart + rightDecimalPart
                        let factor = hcf(nume, deno)

                        nume /= factor
                        deno /= factor
                        printOutput(`${nume}/${deno}`)
                        printHistory("")
                    }	
                    else{ //append the operator with numbers so that eval() will execute
                        history += this.innerText
                        printHistory(history)
                        printOutput("")
                    }
                }
                else if(this.innerText == "-" || this.innerText == "."){
                    history += this.innerText
                    printHistory(history)
                    printOutput("")
                }
            }
        })
    }
}

function getHistory(){
	return historyEle.innerText
}

function printHistory(x){
	historyEle.innerText = x
}

function getOutput(){
    return result.innerText
}

function printOutput(x){
    result.innerText = x
}

function hcf(a, b){ //finds the HCF of two numbers
    if(b == 0)
        return a
    return hcf(b, a%b)
}