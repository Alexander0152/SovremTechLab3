import React, { Component } from 'react';

class KeyPadComponent extends Component {

    render() {
        return (
            <div className='btn_field'>
                <aside className="left_block">
                    <button className='button_narrow' name="OFF" onClick={e => this.props.onClick(e.target.name)}>OFF</button>
                    <button className='button_narrow' name="+/-" onClick={e => this.props.onClick(e.target.name)}>+/-</button>
                    <button className='button_narrow' name="sqrt" onClick={e => this.props.onClick(e.target.name)}>√</button>


                    <button name="MRC" onClick={e => this.props.onClick(e.target.name)}>MRC</button>
                    <button name="M-" onClick={e => this.props.onClick(e.target.name)}>M-</button>
                    <button name="M+" onClick={e => this.props.onClick(e.target.name)}>M+</button>


                    <button name="7" onClick={e => this.props.onClick(e.target.name)}>7</button>
                    <button name="8" onClick={e => this.props.onClick(e.target.name)}>8</button>
                    <button name="9" onClick={e => this.props.onClick(e.target.name)}>9</button>


                    <button name="4" onClick={e => this.props.onClick(e.target.name)}>4</button>
                    <button name="5" onClick={e => this.props.onClick(e.target.name)}>5</button>
                    <button name="6" onClick={e => this.props.onClick(e.target.name)}>6</button>



                    <button name="1" onClick={e => this.props.onClick(e.target.name)}>1</button>
                    <button name="2" onClick={e => this.props.onClick(e.target.name)}>2</button>
                    <button name="3" onClick={e => this.props.onClick(e.target.name)}>3</button>


                    <button name="." onClick={e => this.props.onClick(e.target.name)}>.</button>
                    <button name="0" onClick={e => this.props.onClick(e.target.name)}>0</button>
                    <button name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                </aside>
                <aside className="leftblock">
                    <button className='button_narrow' name="%" onClick={e => this.props.onClick(e.target.name)}>%</button><br />
                    <button name="/" onClick={e => this.props.onClick(e.target.name)}>÷</button><br />
                    <button name="*" onClick={e => this.props.onClick(e.target.name)}>x</button><br />
                    <button name="-" onClick={e => this.props.onClick(e.target.name)}>-</button><br />
                    <button className='button_plus' name="+" onClick={e => this.props.onClick(e.target.name)}>+</button><br />
                </aside>
            </div>
        );
    }
}


export default KeyPadComponent;
