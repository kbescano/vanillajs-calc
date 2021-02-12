class Calculator {
    constructor (previousOutput, currentOutput) {
        this.previousOutput = previousOutput;
        this.currentOutput = currentOutput;
        this.clear();
    }
    
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(cur)) return;
        switch (this.operation) {
            case '+':
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                break
            case '÷':
                computation = prev / cur
                break
            case '*':
                computation = prev * cur
                break
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.') [1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }

        if(decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOutput.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOutput.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOutput.innerText = '';
        }
        
    }
}

const numbersBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');
const equals = document.querySelector('[data-equals]');
const previousOutput = document.querySelector('[data-previous]')
const currentOutput = document.querySelector('[data-current]')

const calculator = new Calculator(previousOutput, currentOutput);

numbersBtn.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})


operationBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        console.log(btn.innerText)
        calculator.updateDisplay();
    })
})


clearBtn.addEventListener('click', ()=> {
    calculator.clear()
    calculator.updateDisplay()
})

equals.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

const buttons = document.querySelectorAll('button');
const javascript = document.querySelector('.overlay h1')

buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        javascript.style.opacity = '.3';
    });

    button.addEventListener('mouseleave', () => {
        javascript.style.opacity = '.2';
        
    })
})

