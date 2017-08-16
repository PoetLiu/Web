$(document).ready(function() {
  var entry ="0";
  var answer="";
  var history="";
  var reset="";
  var state="init";
  var maxNumLen = 8;
  var numBitCnt = 0;
  function isOperator(c){
    return c === '+' || c ==="-" || c === "*" || c === "/";
  }
  
  function isNum(c) {
    return !isNaN(Number.parseInt(entry)) || entry === '.'
  }
  
  function updateNumItem(item, value) {
    return $(item).html(value===""?"0":value);
  }
  
  function updateAnswer() {
    return updateNumItem("#answer", answer);
  }
  
  function updateHistory() {
    return updateNumItem("#history", history);
  }
  
  function calResultAdjust(r) {
    var result = r;
    
    if (r.toString().length > maxNumLen) {
      if (Number.isInteger(r)) {
        result = Number.NaN;
      } else {
        result = r.toPrecision(2);
      }
    }
    return result;
  }
  
  function calculator() {
    var result = 0;
    var oprand = [], oprator = [];
    
    for (var i = 0, j = 0, ch; i < history.length; i++) {
      ch = history.charAt(i);
      if (isOperator(ch)) {
        oprand.push(ch);
        oprator.push(parseFloat(history.slice(j,i)));
        j = i+1;
      } else if (i === history.length-1) {
        oprator.push(parseFloat(history.slice(j,i+1)));
      }
    }
    
    if (oprand.length === 0) {
      return oprator.shift();
    }
    
    // calculate from left to right.
    oprand.forEach(function(item, index, array) {
        var optorL = index === 0? oprator.shift() : result;
        var optorR = oprator.shift();
        switch(item) {
          case "+":
            result = optorL + optorR;
            break;
          case "-":
            result = optorL - optorR;
            break;
          case "*":
            result = optorL * optorR;
            break;
          case "/":
            result = optorL / optorR;
            break;
        }
    });
    return calResultAdjust(result);
  }
  
  $('button').click(function() {
    entry = $(this).attr("value");
    switch (entry) {
      case "ac":
        history = "";
        numBitCnt = 0;
      case "ce":
        answer  = "";
        if (numBitCnt) {
          history = history.slice(0, history.length-numBitCnt);
          numBitCnt = 0;
          state = "opand";
        } else {
          history ="";
          state   ="init";
        }
        updateAnswer();
        updateHistory();
        return;
      default:
        break;
    }
   
    switch (state) {
      case "init":
        if (isNum(entry)) {
          numBitCnt++;
          answer += entry;
          history += entry;
          state = "optor";
        }
        break;
      case "optor":
        if (isNum(entry)) {
          numBitCnt++;
          answer += entry;
          history += entry;
        } else if (isOperator(entry)) {
          numBitCnt = 0;
          history += entry;
          answer = entry;
          state = "opand";
        } else if (entry === "=") {
          numBitCnt = 0;
          answer = calculator();
          if (Number.isNaN(answer)) {
            history = "Digit Limit Met";
            answer = "0";
            state = "error";
          } else {
            history += entry + answer; 
            state = "calculate";
          }
        }
        break;
      case "opand":
        if (isNum(entry)) {
          numBitCnt++;
          history += entry;
          answer = entry;
          state = "optor";
        }
        break;
      case "calculate":
         if (isOperator(entry)) {
          history = answer+entry;
          answer = entry;
          state = "opand";
        }
        //break; noneed break here.
      case "error":
        if (isNum(entry)) {
          numBitCnt++;
          answer = entry;
          history = entry;
          state = "optor";
        }
        break;
    }
    if (numBitCnt > maxNumLen) {
      numBitCnt = 0;
      history = "Digit Limit Met";
      answer = "0";
      state = "error";
    }
    updateAnswer();
    updateHistory();
  });
});