import React, { Component } from 'react';
import './FrontPage.css';

export default class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.roll = this.roll.bind(this)//             
    }
    roll(){
        // document.querySelector('#a').innerHTML = 'hi'
        console.log('Speak, friend, and enter')
    }
    render(){
       return <div className = "Front">
                <div className = "Word">
                  <span>X</span>
                  <span> - </span>
                  <span>p</span>
                  <span>l</span>
                  <span>a</span>
                  <span>n</span>
                  <span id = 'a' onMouseOver = {this.roll}>e</span>
                  <span>t</span>  
                  </div>
                <div className = "instructions">
                    <div>Jump? space</div>
                    <div>Move? wasd</div>
                    <div>1-human 2-rabbit 3-fish</div>
                    </div>  
              </div>
        
    }
}