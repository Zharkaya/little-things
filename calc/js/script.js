let btn = document.querySelectorAll(".item");
let numbers = Array.from(btn).filter(n=>n.hasAttribute("data-num"));
let operation = Array.from(btn).filter(n=>n.hasAttribute("data-operation"));

let clear = document.getElementById("clear");
let equal = document.getElementById("equal");
let comma = document.getElementById("comma");
let sqrt = document.getElementById("sqrt");
let procent = document.getElementById("proc");
let sh = document.getElementById("sh");

let out = document.getElementById("Result");
let outOperation = document.getElementById("outOperation");

let resultDisplayed = false;

numbers.forEach(n => {
    n.addEventListener("click", ()=> { type(n.getAttribute("data-num")); });    
});

operation.forEach(o => {
    o.addEventListener("click", ()=> { addOperation(o.getAttribute("data-operation")) });
});

comma.addEventListener("click", ()=> { type(".") });
clear.addEventListener("click", () => { clearResult() });
sqrt.addEventListener("click", ()=> { getSqwrt() } );

procent.addEventListener("click", ()=> { getProcent( )});

equal.addEventListener("click", ()=> { result() });

function type(n) {
    if(n=="00" && (out.textContent=="0" ||  out.textContent=="")) return;
    
    out.insertAdjacentHTML("beforeend", n);
}

function addOperation(o) {
    if(out.textContent!="" && !resultDisplayed){
        outOperation.insertAdjacentHTML("beforeend", out.textContent + o);
        out.innerHTML = "";        
    } 
    if(resultDisplayed) {
        outOperation.textContent = "";
        outOperation.insertAdjacentHTML("beforeend", out.textContent + o);
        out.textContent = "";
        resultDisplayed = false;
        showEq();
    }   
}   

function clearResult() {
    out.innerHTML= "";
    outOperation.innerHTML="";
    resultDisplayed = false;
    showEq();
}

function getSqwrt()  {
    if(outOperation.textContent!=""){
        outOperation.insertAdjacentHTML("beforeend", Math.sqrt(out.textContent));
        out.textContent = " ";
        //result();
    }
    else {
        out.textContent = Math.sqrt(out.textContent);
    }
}

function getProcent() {
    if(outOperation.textContent == "") {
        out.textContent = "0";
        return;
    }    
    let numbers = seperateNumbers(outOperation.textContent);
    let proc = numbers[numbers.length-2]*(out.textContent/100)
    out.textContent = proc;
    addOperation("");
    result();
}

function result() {
    addOperation("");
    let numbers = seperateNumbers(outOperation.textContent);     
    let operators = seperateOperators(outOperation.textContent);
    console.log(numbers);
    console.log(operators);

    let divide = operators.indexOf("÷");
    while (divide != -1) {
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      operators.splice(divide, 1);
      divide = operators.indexOf("÷");
    }
  
    let multiply = operators.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operators.splice(multiply, 1);
      multiply = operators.indexOf("×");
    }
  
    let subtract = operators.indexOf("-");
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operators.splice(subtract, 1);
      subtract = operators.indexOf("-");
    }
  
    let add = operators.indexOf("+");
    while (add != -1) {
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operators.splice(add, 1);
      add = operators.indexOf("+");
    }

    //outOperation.textContent = numbers[0];
    out.textContent =  numbers[0];
    //outOperation.textContent = "";
    console.log(numbers[0]);
    resultDisplayed = true;
    showEq();
}

function seperateNumbers(out) {
    return out.split(/\+|\-|\×|\÷/g);
}

function seperateOperators(out) {
    return out.replace(/[0-9]|\./g, "").split("");
}

function showEq()  {
    if(resultDisplayed) {
        sh.style.display = "block";
    }
    else {
        sh.style.display = "none";
    }
}
