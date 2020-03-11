function eval() {
    // Do not use eval!!!
    return;
}

let exprArr = [];
let result = '';
function expressionCalculator(expr) {
    if (typeof expr === "string"){
        expr = expr.replace(/\s/g, '');
        for (let i = 0; i < expr.length; i++){
            if (!isNaN(expr[i])){
                let j = i;
                while (!isNaN(expr[j])){
                    result += expr[j];
                    j++;
                }
                exprArr.push(result);
                result = '';
                i = j-1;
            }
            else {
                exprArr.push(expr[i]);
            }
        }
    }
    if (exprArr.filter(item => item === "(").length !== exprArr.filter(item => item === ")").length){
        throw new Error("ExpressionError: Brackets must be paired");
    }
    let inBrackets = [];
    let iFirstClosedBracket = exprArr.indexOf(')');
    let iOpenedBracket = exprArr.lastIndexOf('(', iFirstClosedBracket);
    if (iFirstClosedBracket !== -1){
        inBrackets = exprArr.slice(iOpenedBracket+1, iFirstClosedBracket);
        let result = PlusOrMinus(DivOrMult(inBrackets));
        let arr1 = exprArr.slice(0, iOpenedBracket).concat(result);
        exprArr = arr1.concat(exprArr.slice(iFirstClosedBracket+1, exprArr.length))
        expressionCalculator(exprArr);
    }
    result = Number(PlusOrMinus(DivOrMult(exprArr)).join()).toFixed(4);
    result = Number(result);
    return result;
}

function DivOrMult(arr){
    for (let i = 0; i < arr.length; i++){
        if (arr[i] === "*"){
            arr.splice(i-1, 3, (+arr[i-1] * +arr[i+1]));
            i = -1;
        }
        else if (arr[i] === "/"){
            if (arr[i+1] == 0){
                throw new Error('TypeError: Division by zero.');
            }
            arr.splice(i-1, 3, (+arr[i-1] / +arr[i+1]));
            i = -1;
        }
        
    }
    return  arr;
}
function PlusOrMinus(arr){
    for (let i = 0; i < arr.length; i++){
        if (arr[i] === "+"){
            arr.splice(i-1, 3, (+arr[i-1] + +arr[i+1]));
            i = -1;
        }
        else if (arr[i] === "-"){
            arr.splice(i-1, 3, (+arr[i-1] - +arr[i+1]));
            i = -1;
        }
    }
    return  arr;
}
    

console.log(expressionCalculator(" 60 + 29 / 57 - 85 "));
module.exports = {
    expressionCalculator
}