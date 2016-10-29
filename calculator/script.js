$(document).ready(function() {

  var buffer = '';
  var operations = [];
  var output = $("#output");
  var result = 0;

  function printScreen(msg) {
    output.text(msg);
  }
  printScreen('0');

  $('.key').click(function() {

    var value = $(this).text();

    // backspace
    if (value == "➞" && buffer.length > 1) {
      buffer = buffer.slice(0, -1);
      printScreen(buffer);
    } else if (value == "=") {
      operations.push(buffer);
      result = eval(operations.join(''));
      // check if float
      if (result % 1) {
        result = result.toFixed(2);
        } 
      if (String(result).length > 12) {
        printScreen("YOU BROKE ME!");
      } else {
        printScreen(result);
      }
      console.log(operations);
      operations = [result];
      buffer = '';
    } else if (value == "AC") {
      printScreen(0);
      operations = [];
      buffer = '';
    } else if (value == "CE") {
      printScreen(0);
      buffer = '';
    } else if ($(this).is('.num') && buffer.length <= 11) {
      buffer += value;
      printScreen(buffer);
    } else if ($(this).is('.func')) {
      operations.push(buffer);
      buffer = '';
      if (operations.length == 3) {
        operations = [eval(operations.join(''))];
      }
      if (value == "÷") {
        value = '/';
      } else if (value == "×") {
        value = '*';
      }
      operations.push(value);
    }
    console.log(value);

  });
});