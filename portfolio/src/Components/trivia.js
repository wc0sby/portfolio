import React, { Component } from 'react';
import { parseHtmlEntity } from '../helpers/domParser';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Trivia extends Component {
  state = {
    open: false,
    value: '',
    categories: [],
    question: '',
    error: null,
  };

  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then((result) =>
        this.setState({
          ...this.state,
          categories: result['trivia_categories'],
        })
      )
      .catch(error =>
        this.setState({
          ...this.state,
          error,
        })
      )
  }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
   this.setState({open: false});
  };

  handleChange = (val) => {
    const cat = this.state.categories[val]['id']

    fetch(`https://opentdb.com/api.php?amount=10&category=${cat}&type=multiple`).then(
      res => res.json())
      .then(({ results }) => {

        this.setState({
          isLoaded: true,
          question: results
            .map(res => ({
              ...res,
              question: parseHtmlEntity(res.question),
              incorrect_answers: res.incorrect_answers.map(i => parseHtmlEntity(i)),
              correct_answer: parseHtmlEntity(res.correct_answer)
            })
          ),
        })
        // this.renderQuestion(result['results'])
      })
      .catch(error =>
        this.setState({
          ...this.state,
          error,
        })
      )

}

  renderMenu = () => {
    const categories = this.state.categories
    return categories.map((trivia, key)=>{
      return <MenuItem key={key} value={key} primaryText={trivia.name}/>
    })
  }

  // getQuestion = () => {
  //   const dataQuestion = this.state.question
  //   this.renderQuestion(dataQuestion)
  // }

  handleTriviaCategorySelected = (event, index, value) => {

    this.setState({
      ...this.state,
      value,
    });
    this.handleChange(value);
 
  }

  renderMultipleChoice = () => {
    const answerArr = this.state.question[0]['incorrect_answers']
    const allAnswerArr =  answerArr.concat(this.state.question[0]['correct_answer'])

    const newArr = allAnswerArr.sort()

    return newArr.map((answer, key) => {
      return (
      <RadioButtonGroup>
        <RadioButton
          key={key}
          value={key}
          label={answer}
        />
        </RadioButtonGroup>
      )
    })
    
   
      
   
    // .map((answer, key) => {
    //   return 
    //     <RadioButton
    //       key={key}
    //       value={key}
    //       label={answer}
    //     />
    //   })
    }
        
        renderQuestion = () => {
          return this.state.question
          && (
            <div>
          <p>Question:</p>
          <TextField fullWidth={true}>
            <span>{this.state.question[0]['question']}</span>
          </TextField>
          {/* <RadioButtonGroup name="shipSpeed" defaultSelected="0"> */}
            {this.renderMultipleChoice()}
          {/* </RadioButtonGroup> */}
        </div>
      )
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    const styles = {
      customWidth: {
        width: 400
      },
      radioButton: {
        marginBottom: 16,
      },
    }

    return (
      <div>
        <RaisedButton label="Play Trivia" onClick={this.handleOpen} />
        <Dialog
          title="Trivia!"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        Select Category:
        <br/>
        <DropDownMenu
           value = {this.state.value}
           style = {styles.customWidth}
           onChange = {this.handleTriviaCategorySelected}
           >
          {this.renderMenu()}
        </DropDownMenu>
        <br/>
          {this.renderQuestion()}
        </Dialog>
      </div>
    );
  }
}