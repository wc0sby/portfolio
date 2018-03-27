import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Trivia extends Component {
  state = {
    open: false,
    value: '',
    category: [],
    question: '',

  };

  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then((result) => {
        const categories = this.state.category
        return result['trivia_categories'].forEach((cat)=>{
        categories.push(cat)
        this.setState({
          isLoaded: true,
          category: categories
        });
      })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
   this.setState({open: false});
  };

  handleChange = (val) => {
    const cat = this.state.category[val]['id']

    fetch(`https://opentdb.com/api.php?amount=10&category=${cat}`).then(
      res=> res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          question: result['results']
        })
        // this.renderQuestion(result['results'])
      }
    ,
    (error) => {
      this.setState({ isLoaded: true,
      error
    })
  })

}

  renderMenu = () => {
    const categories = this.state.category
    return categories.map((trivia, key)=>{
      return <MenuItem key = {key} value = {key} primaryText = {trivia['name']}/>
    })
  }

  // getQuestion = () => {
  //   const dataQuestion = this.state.question
  //   this.renderQuestion(dataQuestion)
  // }

  handleTriviaCategorySelected = (event, index, value) => {
    this.setState({value})
    this.handleChange(value)
 
  }

  renderQuestion = () => {
    return this.state.question === ''
    ? ''
    : (this.state.question[0]['question'])
    
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

    const dropDownStyle = {
      customWidth: {
        width: 400
      }
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
        <DropDownMenu
           value = {this.state.value}
           style = {dropDownStyle.customWidth}
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