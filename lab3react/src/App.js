import React, { Component } from 'react';
import ResultComponent from './Calculator/ResultComponent';
import KeyPadComponent from './Calculator/KeypadComponent';

class App extends Component {
  constructor() {
    super();

    this.state = {
      result: ''
    }
    this.wholeExpression = '';
    this.memory = 0;
    this.lastClickIsMemory = false;
    this.clearMemory = false;
  }

  onClick = button => {

    if (button === 'MRC') {
      this.lastClickIsMemory === true ? this.clearMemory = true : this.clearMemory = false;
    }
    this.lastClickIsMemory === true ? this.lastClickIsMemory = false : this.lastClickIsMemory = true;

    button === 'MRC' ? this.lastClickIsMemory = true : this.lastClickIsMemory = false;

    const lastSymbol = this.wholeExpression.slice(-1);
    if (this.checkIsDigit(button) || button === '.') {

      if (this.state.result.length + 1 <= 10) {
        if (!this.checkIsSign(lastSymbol)) {
          this.setState({
            result: this.state.result + button,
          })
          this.wholeExpression += button;
        }
        else {
          this.setState({
            result: button,
          })
          this.wholeExpression += button;
        }
      }
      else if (this.checkIsSign(lastSymbol)) {
        this.setState({
          result: button,
        })
        this.wholeExpression += button;
      }
    }

    if (this.checkIsSign(button) && this.state.wholeExpression !== '' && !this.checkIsSign(lastSymbol)) {

      if (this.wholeExpression.includes('+') || this.wholeExpression.includes('-') ||
        this.wholeExpression.includes('/') || this.wholeExpression.includes('*')) {
        this.calculateWholeExpression();
      }
      this.wholeExpression += button;
      this.setState({
        result: this.wholeExpression
      })
    }

    switch (button) {
      case '=':
        this.calculate();
        break;
      case 'OFF':
        this.reset();
        break;
      case '+/-':
        this.reverseSign();
        break;
      case '%':
        this.getPercentage();
        break;
      case 'sqrt':
        this.getSqrt();
        break;
      case 'MRC':
        this.showMemory();
        break;
      case 'M-':
        this.subtractFromMemory();
        break;
      case 'M+':
        this.addToMemory();
        break;
      default:
        break;
    }
  };

  calculate = () => {
    this.calculateWholeExpression();
    try {
      if (this.wholeExpression * 1 > 100000000) {
        this.wholeExpression = (1 * this.wholeExpression).toPrecision(6) + '';
      }
      this.setState({
        result: this.wholeExpression
      })

    } catch (e) {
      this.setError();
    }
  };

  calculateWholeExpression = () => {
    let checkResult = '';
    if (this.wholeExpression.includes('--')) {
      checkResult = this.wholeExpression.replace('--', '+');
    }
    else {
      checkResult = this.wholeExpression
    }

    try {
      this.wholeExpression = (eval(checkResult) || '');
      this.wholeExpression = (1 * this.wholeExpression).toPrecision(6) + '';

    } catch (e) {
      this.setError();
      this.wholeExpression = 'error'
    }
  };

  reverseSign = () => {
    const lastSymbol = this.wholeExpression.slice(-1);
    if (this.checkIsSign(lastSymbol)) {
      return;
    }
    if (this.wholeExpression === this.state.result) {
      this.wholeExpression = ((-1) * this.wholeExpression).toPrecision(6) + ''
      this.setState({
        result: this.wholeExpression
      })
    }
    else {
      const currentResult = this.state.result;
      this.wholeExpression = this.wholeExpression.replace(new RegExp(currentResult + '$'), (-1) * currentResult + '');
      this.setState({
        result: (-1) * currentResult + ''
      })
    }
  };

  getSqrt = () => {
    const lastSymbol = this.wholeExpression.slice(-1);
    if (this.checkIsSign(lastSymbol)) {
      this.setError();
    }
    if (this.wholeExpression === this.state.result) {
      this.wholeExpression = Math.sqrt((1 * this.wholeExpression)).toPrecision(6) + ''
      if (isNaN(this.wholeExpression)) {
        this.setError();
        return;
      }
      this.setState({
        result: this.wholeExpression
      })
    }
    else {
      const currentResult = this.state.result;
      let sqrt = Math.sqrt((1 * currentResult)).toPrecision(6) + '';
      if (isNaN(sqrt)) {
        this.setError();
        return;
      }
      this.wholeExpression = this.wholeExpression.replace(new RegExp(currentResult + '$'), sqrt);
      this.setState({
        result: sqrt
      })
    }
  };

  getPercentage = () => {
    const lastSymbol = this.wholeExpression.slice(-1);
    if (this.checkIsSign(lastSymbol) || this.wholeExpression === this.state.result ||
      this.state.result === 'error') {
      this.setError();
      return;
    }
    const currentResult = this.state.result;
    const originalNumber = this.wholeExpression.substring(0, this.wholeExpression.length - (currentResult.length + 1));
    const percentege = (originalNumber * currentResult / 100).toPrecision(6) + '';
    this.wholeExpression = this.wholeExpression.replace(new RegExp(currentResult + '$'), percentege);
    this.setState({
      result: percentege
    })
  };

  addToMemory = () => {
    const lastSymbol = this.wholeExpression.slice(-1);
    if (this.checkIsSign(lastSymbol) || this.state.result === 'error') {
      this.setError();
      return;
    }
    this.memory = (1 * this.memory + 1 * this.state.result).toPrecision(6);
  };

  subtractFromMemory = () => {
    const lastSymbol = this.wholeExpression.slice(-1);
    if (this.checkIsSign(lastSymbol) || this.state.result === 'error') {
      this.setError();
      return;
    }
    this.memory = (1 * this.memory - 1 * this.state.result).toPrecision(6);
  };

  showMemory = () => {
    if (this.clearMemory) {
      this.memory = 0;
      this.setState({
        result: '0'
      })
      this.wholeExpression = this.memory + ''
      return;
    }
    this.setState({
      result: this.memory
    })
    this.wholeExpression = this.memory + ''
  };

  reset = () => {
    this.setState({
      result: '',
    })
    this.wholeExpression = '';
  };

  setError = () => {
    this.wholeExpression = ''
    this.setState({
      result: 'error'
    })
  };

  checkIsDigit = (symbol) => {
    const digitsPattern = /^\d+$/;
    return digitsPattern.test(symbol);
  };

  checkIsSign = (symbol) => {
    const signPattern = /^[+,\-,*,/]$/g;
    return signPattern.test(symbol);
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <div className="wrapper">
            <ResultComponent result={this.state.result} />
            <div className="btn_field">
              <KeyPadComponent onClick={this.onClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// MRC кнопка для отображения или стирания (при повторном нажатии) содержимого памяти 
// M+ занести значение в память (если там ничего нет) или добавить то, что на экране к содержимому памяти (результат сложения сохраняется в памяти) 
// M- вычесть то, что на экране, из содержимого памяти (результат вычитания сохраняется в памяти) 