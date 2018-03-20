import React, {Component} from 'react';
import infoObj from '../Data/content'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class InfoCard extends Component{


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
            <FlatButton label="Email" />
            <FlatButton label="GitHub" />
          </CardActions>
          <CardTitle 
            title={infoObj[navClicked].title}
            subtitle={infoObj[navClicked].subtitle} />
          <CardText>
            {infoObj[navClicked].text}
          </CardText>
        </Card>
     );
    }
    return(
      renderCard()
    )
  }
}