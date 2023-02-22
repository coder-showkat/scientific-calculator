// select element
const display_operation = document.getElementById('display-operation');
const display_result = document.getElementById('display-result');
const calculator = document.querySelector('.calculator-body');

const POWER = 'POWER(';
const FACTORIAL = 'FACTORIAL';
const PERCENT = 'PERCENT';

const data = {
    operation: [],
    formula: []
}

let ans = 0;

const operator = ['+', '-', '*', '/'];

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
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },
    {
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },
    {
        name : "power",
        symbol : `x<sup>y</sup>`,
        formula : POWER,
        type : "math_function"
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
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
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
        name : "percent",
        symbol : "%",
        formula : PERCENT,
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
        symbol : "1/X",
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
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    } else if (button.type == 'key') {
        if (button.name == 'clear') {
            data.operation = [];
            data.formula = [];
            display_result.value = '';
        } else if (button.name = 'delete') {
            data.operation.pop();
            data.formula.pop();
        }
    } else if (button.type == 'calculate') {
        let formula_str = data.formula.join('');
        let result;
        try {
            result = eval(formula_str);
        } catch (error) {
            if (error instanceof SyntaxError) {
                display_result.value = 'Syntax Error!';
                return;
            }
        }

        display_result.value = result;
        ans = result;
        data.operation = [result];
        data.formula = [result];
        return;
    }

    display_operation.value = data.operation.join('');
}

