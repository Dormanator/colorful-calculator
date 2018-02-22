class Calculator {
    constructor() {
        this.screen = document.getElementById('screen-content');
        this.historyList = document.getElementById('history-list');
        this.currentExpression = '';
        this.events();
    }

    events() {

        this.historyList.addEventListener('click', (event) => {
            if (event.target.dataset.answer) {
                this.setHistoricValue(event.target.dataset.answer);
            }
        });
    }

    validateInput(input) {
        const validInput = /^\d|[/*-+.=()]|enter|backsp|esc/;

        return validInput.test(input);
    }

    handleInput(value) {
        switch (value) {
            case 'c':
            case 'escape':
                this.clear();
                break;
            case 'ce':
            case 'backspace':
                this.clearEntry();
                break;
            case '=':
            case 'enter':
                this.evaluateExpression();
                break;
            default:
                this.buildExpression(value);
                break;
        }
    }

    buildExpression(value) {
        // the value being stored in the expression string is a symbol add spaces on either side
        //  formatting for readability and maintaining the ability to eval the string
        if (!/\d|[.]/.test(value)) {
            this.currentExpression += ` ${value} `;
        } else if (this.currentExpression.length <= 10 || / \D /.test(this.currentExpression)) {
            this.currentExpression += value;
        }
        // call the update screen function as we build the expression to give user feedback
        this.updateScreen();
    }

    evaluateExpression() {

        // evalute the string if its valid equation to find the answer to the equation
        try {
            const answer = eval(this.currentExpression);

            // pass the value to show answer so we can display the final equation on the front-end
            this.handleAnswer(answer);

        } catch (err) {
            // clear the currently built equation since it is invalid and teh user needs to start again
            this.setExpression();
            // Update the calculator with an error message
            this.updateScreen('Invalid. Try Again.');
        }

    }

    setExpression(answer = '') {
        this.currentExpression = answer;
    }

    updateScreen(input = this.currentExpression) {
        // set the text content of the calculator's screen
        this.screen.textContent = input;
    }

    handleAnswer(value) {
        const valueStr = value.toString();
        // create a formatted version of the answer, if the there are more than 6 decimal places shorten the value
        const formatted = valueStr.length > 7 && valueStr.includes('.') ? value.toFixed(6) : value;
        // display answer with equals sign on front-end
        this.screen.textContent += ` = ${formatted}`;
        // set history to store the final value and expression to allow for hisotry log
        this.setHistory(formatted);
        // set teh expression to the formatted value so if it is long it dosen't break the screen
        this.setExpression(formatted);
    }

    clear() {
        // clear the text content of teh screen and the values stored int eh current expression
        this.screen.textContent = '';
        this.setExpression();
    }

    clearEntry() {
        // if we have more than 1 number 
        if (this.currentExpression.length > 1) {
            const expression = this.currentExpression;
            // find the last number or symbol surrounded by spaces
            const i = expression.search(/\d{1}$| \W $/g);
            //  and cut it off our current expression
            this.currentExpression = expression.slice(0, i);
            this.updateScreen();
            // otherwise we have 1 number and can simply clear it
        } else {
            this.currentExpression = '';
            this.updateScreen();
        }
    }

    setHistory(value = '') {
        const history = {
            expression: this.currentExpression += ` = ${value}`,
            value: value
        };
        // show the last expression on the document in case we want to go back to it
        this.addHistoryListItem(history);
    }

    addHistoryListItem(input) {
        // create components to append history lsit item
        const historyListItem = document.createElement('li'),
            history = document.createTextNode(input.expression);
        // add teh past exquation as the text content and the answer as the value
        historyListItem.appendChild(history);
        historyListItem.setAttribute('data-answer', input.value);
        // add this new history item to the begining of the history list
        this.historyList.prepend(historyListItem);
    }

    setHistoricValue(value) {
        // convert the past value to a string and set it as the base of our expression to be evaluated
        this.setExpression(value.toString());
        this.updateScreen();
    }
}

export default Calculator;