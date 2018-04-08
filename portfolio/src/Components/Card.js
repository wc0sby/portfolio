import React, {Component} from 'react';
import infoObj from '../Data/content'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class InfoCard extends Component{

  renderCardButton = () => {
    const linkArr = this.props.linkToDisplay
     const tempArr = (linkArr.filter((icon)=>{
        return icon
      }).map((item, key)=>{
          return item
      })
    )
    return tempArr.map((icon)=>{
      return icon.map((item, key)=>{
        return <FlatButton key={key} label={item} />
      })
    })

  }

  render(){
    const cardStyles = {
      width: 800,
      margin: '0 auto',
      marginTop: 100,
    }
    const navClicked = this.props.navClicked

    const renderCard = () => {
      return(
        <Card style = {cardStyles}>
          <CardActions>
          <CardTitle 
            title={infoObj[navClicked].title}
            subtitle={infoObj[navClicked].subtitle} />
          <CardText>
            {infoObj[navClicked].text}
          </CardText>
            {this.renderCardButton()}
            {/* <FlatButton label={this.props.linkToDisplay} />
            <FlatButton label="GitHub" /> */}
          </CardActions>
        </Card>
     );
    }
    return(
      renderCard()
    )
  }
}