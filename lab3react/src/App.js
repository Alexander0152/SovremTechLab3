import React, { Component } from 'react';
import ResultComponent from './Calculator/ResultComponent';
import KeyPadComponent from './Calculator/KeypadComponent';

class App extends Component {
  constructor() {
    super();

    this.state = {
      result: ""
    }
    this.temp = '';
  }

  onClick = button => {

    const lastSymbol = this.temp.slice(-1);
    if (this.checkIsDigit(button) || button === '.') {

      if (this.state.result.length + 1 <= 10) {
        if (!this.checkIsSign(lastSymbol)) {
          this.setState({
            result: this.state.result + button,
          })
          this.temp += button;
        }
        else {
          this.setState({
            result: button,
          })
          this.temp += button;
        }
      }
      else if (this.checkIsSign(lastSymbol)) {
        this.setState({
          result: button,
        })
        this.temp += button;
      }
    }

    if (this.checkIsSign(button) && this.state.temp !== '' && !this.checkIsSign(lastSymbol)) {

      if (this.temp.includes('+') || this.temp.includes('-') || this.temp.includes('/') || this.temp.includes('*')) {
        this.calculateTemp();
      }
      this.temp += button;
      this.setState({
        result: this.temp
      })
    }

    switch (button) {
      case '=':
        //alert(this.temp);
        this.calculate();
        break;
      case 'OFF':
        this.reset();
        break;
      case '+/-':
        alert("puk");
        break;
      case '%':
        alert("%");
        break;
      case 'sqrt':
        alert("sqrt");
        break;
      default:
      // this.setState({
      //   result: this.state.result + button
      // })
    }
  };


  calculate = () => {
    this.calculateTemp();
    try {
      if (this.temp * 1 > 100000000) {
        this.temp = (1 * this.temp).toPrecision(6);
      }
      this.setState({
        result: this.temp
      })

    } catch (e) {
      this.setState({
        result: "error"
      })
      this.temp = '';
    }
  };

  calculateTemp = () => {
    let checkResult = ''
    if (this.temp.includes('--')) {
      checkResult = this.temp.replace('--', '+')
    }
    if (this.temp.includes('ghyghj')) {//////////////
      checkResult = this.temp.replace('+/-', '')
    }
    else {
      checkResult = this.temp
    }

    try {
      this.temp = (eval(checkResult) || "") + "";
      this.temp = (1 * this.temp).toPrecision(6);

    } catch (e) {
      this.temp = 'error';
    }
  };

  reset = () => {
    this.setState({
      result: "",
    })
    this.temp = '';
  };

  backspace = () => {
    alert(this.temp);
    this.temp = this.temp.slice(0, -1);
    alert(this.temp);
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


  // changeLastOperation = (button) => {
  //   const lastSymbol = this.temp.slice(-1);
  //   if (this.checkIsSign(lastSymbol)) {
  //     this.backspace();
  //     this.temp += button;
  //     this.setState({
  //       result: this.temp,
  //     })
  //   }
  //   else {
  //     this.temp += button;
  //     this.setState({
  //       result: this.temp
  //     })
  //   }
  // };