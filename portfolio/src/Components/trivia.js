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
    selected: 0,
    error: null,
    correct: false,
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

  handleTriviaCategorySelected = (event, index, value) => {

    this.setState({
      ...this.state,
      value,
    });
    this.handleChange(value);
  }

  handleClickedAnswer = (e, selected)=>{
    this.setState({
      ...this.state,selected
    })
  }

  handleSubmit = ()=>{
    const answer = this.state.question[0].correct_answer
    this.setState({correct: this.state.selected === answer})  
    this.renderCorrect()
  }

  renderCorrect =()=>{
    return this.state.correct ? 'Correct!!!' : 'Try Again...'
  }

  renderMultipleChoice = () => {
    const answerArr = this.state.question[0]['incorrect_answers']
    const allAnswerArr =  answerArr.concat(this.state.question[0]['correct_answer'])

    const newArr = allAnswerArr.sort()

    return newArr.map((answer, key) => {
      return (
        <RadioButton
          key={key}
          value={answer}
          label={answer}
        />        
      )
    })
    
    }
        
        renderQuestion = () => {
          return this.state.question
          && (
            <div>
          <p>Question:</p>
          <TextField fullWidth={true}>
            <span>{this.state.question[0]['question']}</span>
          </TextField>
          <RadioButtonGroup ref='answers' name='answers' defaultSelected={0} onChange={this.handleClickedAnswer}>
            {this.renderMultipleChoice()}
          </RadioButtonGroup>
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
        onClick={this.handleSubmit}
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
        <br/>
          {this.renderCorrect()}
        </Dialog>
      </div>
    );
  }
}