import React, { Component } from 'react';
import TextLoop from 'react-text-loop';
 
export default class Welcome extends Component {
    render() {
      const colorRand = () => {
       return(Math.floor(Math.random()*256))
      }
      const scrollStyle = {
        margin: '0 25%',
        color: 'white'
      }
      const letterStyle = {
        fontSize: 75,
        color: `rgb(${colorRand()},${colorRand()},${colorRand()})`,
        textShadow: '-2px 1px 0px white, 2px 1px 0px white, -8px 3px 1px #6a6d72'
      }
        return (
          <div style={ scrollStyle }>
           <h1> <span style = { letterStyle }>W</span>ade codes </h1>
            <h2> 
                <TextLoop springConfig={{ stiffness: 180, damping: 8}}>
                {this.props.children}  
                </TextLoop> as a front-end developer.
            </h2>
          </div>
        );
    };
}