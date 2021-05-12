const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');

btn.addEventListener('click', () => {
  result.innerText = `Result: ${MathChallenge(input.value)}`;
  input.value = '';
});

const highRegExp = /\(\d+[\+\-\*\/]\d+\)/;
const midRegExp = /\d+[\*\/]\d+/;
const lowRegExp = /\d+[\+\-]\d+/;
const charRegExp = /[^0-9\+\-\*\/\(\)]/g;
const wrongInputRegExp = /[\+\-\*\/]{2,}/g

function MathChallenge(str) {
  str = str.replace(/\s/g, '');
  if (charRegExp.test(str) || wrongInputRegExp.test(str)) {
    return 'Incorrect input';
  }
  while (isNaN(Number(str))) {
    if (str.includes('(') || str.includes(')')) {
      str = calc(highRegExp, str);
    } else if (str.includes('*') || str.includes('/')) {
      str = calc(midRegExp, str);
    } else if (str.includes('+') || str.includes('-')) {
      str = calc(lowRegExp, str);
    }
  }
  return str;
}

function calc(regExp, str) {
  let match = str.match(regExp)[0];
  if (regExp === highRegExp) {
    quoteMatch = match;
    match = removeQuotes(match);
  }
  let calcRes = operation(match);
  if (regExp === highRegExp) {
    match = quoteMatch;
  }
  str = str.replace(match, calcRes);
  return str;
}

function removeQuotes(str) {
  let oq = str.indexOf('(') + 1;
  let cq = str.indexOf(')');
  str = str.slice(oq, cq);
  return str;
}

function operation(str) {
  let res;
  let arr = getOperands(str);
  let [a, op, b] = arr;
  switch (op) {
    case '+':
      res = Number(a) + Number(b);
      return res;
    case '-':
      res = Number(a) - Number(b);
      return res;
    case '*':
      res = Number(a) * Number(b);
      return res;
    case '/':
      res = Number(a) / Number(b);
      return res;
  }
}

function getOperands(str) {
  let a, op, b, res;
  let arr = str.split('');
  if (arr.length === 3) {
    return arr;
  } else {
    arr.forEach((item) => {
      if (isNaN(Number(item))) {
        op = item;
        [a, b] = str.split(op);
        res = [a, op, b];
      }
    });
  }
  return res;
}
