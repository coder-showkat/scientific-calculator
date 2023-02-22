// select element
const display_operation = document.getElementById('display-operation');
const display_result = document.getElementById('display-result');
const calculator = document.querySelector('.calculator-body');

// some variable
const POWER = 'POWER(';
const FACTORIAL = 'FACTORIAL';
const PERCENT = 'PERCENT';

const data = {
    operation: [],
    formula: []
}

let ans = 0;

const operator = ['+', '-', '*', '/'];

// calculator button
const calculator_button = [
    {
        name : "rad",
        symbol : "rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "deg",
        formula : false,
        type : "key"
    },
    {
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },
    {
        name : "clear",
        symbol : "AC",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },
    {
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },
    {
        name : "power",
        symbol : `x<sup>y</sup>`,
        formula : POWER,
        type : "math_function"
    },
    {
        name : "percent",
        symbol : "%",
        formula : PERCENT,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    },
    {
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },
    {
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },
    {
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },
    {
        name : "inverse",
        symbol : `<sup>1</sup>/<sub>X</sub>`,
        formula : POWER,
        type : "math_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },
    {
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },
    {
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },
    {
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },
    {
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },
    {
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },
    {
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },
    {
        name : "ANS",
        symbol : "ans",
        formula : "ans",
        type : "number"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },
    {
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },
    {
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
]

const btn_per_row =5;
let added_btn = 0;

calculator_button.forEach(button =>{
    if (added_btn % btn_per_row == 0) {
        calculator.innerHTML += `<div class="row flex justify-between"></div>`
    }

    const row = calculator.querySelector('.row:last-child');
    row.innerHTML += `<button class="inline-block w-14 h-14 text-center rounded-full active:bg-transparent1" id="${button.name}">${button.symbol}</button>`
    added_btn += 1;
})

let RAD = true;

const rad_btn = document.getElementById('rad');
const deg_btn = document.getElementById('deg');

rad_btn.classList.add('active-angle');


calculator_button.forEach(button => {
    calculator.addEventListener('click', event => {
        if (event.target.id === button.name) {
            buttonEventListener(button);
        }
    })
})


// button event listener
function buttonEventListener(button) {
    if (button.type == 'number' || button.type == 'operator') {
        if (button.name == 'comma') {
            let number = [];
            let index = data.operation.length -1;
            while (index >= 0) {
                if (!isNaN(data.operation[index]) || data.operation[index] == '.') {
                    number.unshift(data.operation[index]);
                } else {
                    break;
                }

                index--;
            }
            if (number.includes('.') == false) {
                data.operation.push(button.symbol);
                data.formula.push(button.formula);           
            }
        } else {
            data.operation.push(button.symbol);
            data.formula.push(button.formula);
        }
    } else if (button.type == 'key') {
        if (button.name == 'clear') {
            data.operation = [];
            data.formula = [];
            display_result.value = '';
        } else if (button.name == 'delete') {
            data.operation.pop();
            data.formula.pop();
        } else if (button.name == 'rad') {
            RAD = true;
            rad_btn.classList.add('active-angle');
            deg_btn.classList.remove('active-angle');
            return;
        } else if (button.name == 'deg') {
            RAD = false;
            rad_btn.classList.remove('active-angle');
            deg_btn.classList.add('active-angle');
            return;
        }
    } else if (button.type == 'trigo_function') {
        const symbol = button.symbol + '(';
        const formula = button.formula;
        data.operation.push(symbol);
        data.formula.push(formula);
    } else if (button.type == 'math_function') {
        if (button.name == 'power') {
            const symbol = '^(';
            const formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);

        } else if (button.name == 'inverse') {
            const symbol = '^(-1)';
            data.operation.push(symbol);
            data.formula.push(button.formula, '-1)');

        } else if (button.name == 'percent') {
            const symbol = '%';
            data.operation.push(symbol);
            data.formula.push(button.formula);
        } else if (button.name == 'factorial') {
            const symbol = '!';
            data.operation.push(symbol);
            data.formula.push(button.formula);
        } else {
            const symbol = button.symbol + '(';
            const formula = button.formula + '(';
            data.operation.push(symbol);
            data.formula.push(formula);
        }
    } else if (button.type == 'calculate') {
        let formula_str = data.formula.join('');

        const POWER_SEARCH_RESULT = search(data.formula, POWER);
        const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
        BASES.forEach(base => {
            const toReplace = base + POWER;
            const replacement = 'Math.pow(' + base + ',';

            formula_str = formula_str.replace(toReplace, replacement);
        })

        const PERCENT_SEARCH_RESULT = search(data.formula, PERCENT);
        const PERCENT_BASES = percentBaseGetter(data.formula, PERCENT_SEARCH_RESULT);
        PERCENT_BASES.forEach(base => {
            const toReplace = base + PERCENT;
            const replacement = '(' + base + '/ 100)';
            formula_str = formula_str.replace(toReplace, replacement);
        })

        const FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);
        const NUMBERS = factorialNumberGetter(data.formula, FACTORIAL_SEARCH_RESULT);
        NUMBERS.forEach(number => {
            formula_str = formula_str.replace(number.toReplace, number.replacement);
        })

        let result;
        try {
            result = eval(formula_str);
        } catch (error) {
            if (error instanceof SyntaxError) {
                display_result.value = 'Syntax Error!';
                return;
            }
        }

        outputResult(result);
        return;
    }

    display_operation.value = data.operation.join('');
}

// output result
function outputResult(result) {
    result = parseFloat(result.toFixed(11));
    const result_str = String(result);
    if (result_str.length > 9) {
        result = result.toExponential(9);
    }
    display_result.value = result;
    ans = result;
    data.operation = [result];
    data.formula = [result];
}


// trigo function
function trigo(callback, angle) {
    if (!RAD) {
        angle = angle * Math.PI / 180;
    }
    return callback(angle);
}

// search
function search(arr, keyword) {
    const result = [];
    arr.forEach((elem, index) => {
        if (elem == keyword) {
            result.push(index);
        }
    })

    return result;
}

//power base getter
function powerBaseGetter(formula, POWER_SEARCH_RESULT) {
    const bases = [];
    
    POWER_SEARCH_RESULT.forEach(power_index =>{
        const base = [];
        let parenthesis_count = 0;
        let input_index = power_index -1;
        let isOperator = false;
        while (input_index >= 0) {
            if (formula[input_index] == '(') parenthesis_count--;
            if (formula[input_index] == ')') parenthesis_count++;
            for (const x of operator) {
                if (formula[input_index] == x) isOperator = true;
            }
            let isPower = (formula[input_index] == POWER);

            if ((isOperator && parenthesis_count == 0) || isPower) {
                break;
            }

            base.unshift(formula[input_index]);

            input_index--;
        }

        bases.push(base.join(''));
    })

    return bases;
}

// percent base getter
function percentBaseGetter(formula, PERCENT_SEARCH_RESULT) {
    const bases = [];
    
    PERCENT_SEARCH_RESULT.forEach(power_index =>{
        const base = [];
        let parenthesis_count = 0;
        let input_index = power_index -1;
        let isOperator = false;
        while (input_index >= 0) {
            if (formula[input_index] == '(') parenthesis_count--;
            if (formula[input_index] == ')') parenthesis_count++;
            for (const x of operator) {
                if (formula[input_index] == x) isOperator = true;
            }
            let isPercent = (formula[input_index] == PERCENT);

            if ((isOperator && parenthesis_count == 0) || isPercent) {
                break;
            }

            base.unshift(formula[input_index]);

            input_index--;
        }

        bases.push(base.join(''));
    })

    return bases;
}

//factorial number getter
function factorialNumberGetter(formula, FACTORIAL_SEARCH_RESULT) {
    const numbers = [];
    let factorial_sequence = 0;
    FACTORIAL_SEARCH_RESULT.forEach(factorial_index =>{
        const number = [];
        let next_input_index = factorial_index + 1;
        let next_input = formula[next_input_index];
        if (next_input == FACTORIAL) {
            factorial_sequence += 1;
            return;
        }

        const first_factorial_index = factorial_index - factorial_sequence;
        let input_index = first_factorial_index - 1;
        let isOperator = false;

        while (input_index >= 0) {
            if (formula[input_index] == '(') parenthesis_count--;
            if (formula[input_index] == ')') parenthesis_count++;
            for (const x of operator) {
                if (formula[input_index] == x) isOperator = true;
            }

            if (isOperator && parenthesis_count == 0) {
                break;
            }

            number.unshift(formula[input_index]);

            input_index--;
        }

        const number_str = number.join('');
        const factorial_count = factorial_sequence + 1;
        const factorial = 'factorial(';
        const close_parentheses = ')';

        const toReplace = number_str + FACTORIAL.repeat(factorial_count);
        const replacement = factorial.repeat(factorial_count) + number_str + close_parentheses.repeat(factorial_count);
        numbers.push({
            toReplace: toReplace,
            replacement: replacement
        })

        factorial_sequence = 0;
    })

    return numbers;
}


// factorial function
function factorial(num) {
    if (num % 1 !== 0) {
        return gamma(num + 1);
    } 
    if (num == 0 || num == 1) {
        return 1;
    } else {
        let total = 1;
        for (let i = 1; i <= num; i++) {
            total *= i;
        }
        return total;
    }
}


// gamma function
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}