import React, { Component } from 'react';
import './FrontPage.css';

export default class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.roll = this.roll.bind(this)//             
    }
    roll(){
        // document.querySelector('#a').innerHTML = 'hi'
        console.log('hi')
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
                  

                  <div className = "vertical-text">

                      <div className = "hero">
                      <p>h</p>
                      <p className ="down">ro</p>
                      </div>

                      <div className = "fish">
                      <p>f</p>
                      <p className ="down">ying fish</p>
                      </div>

                  
                  </div>
                  </div>
              </div>


            //   hero Rabbit Fish 

            //   X-pla-(Rabbit)ne-(hero)t
        
    }
}