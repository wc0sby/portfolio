import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class InfoCard extends Component{

  render(){
    const cardStyles = {
      width: 800,
      marginTop: 100,
      marginLeft: 250,
      marginRight: 250
    }
    return(
    <Card style = {cardStyles}>
      <CardTitle title={this.props.titleProp} subtitle={this.props.subtitleProp} />
      <CardText>
        {this.props.textProp}
      </CardText>
      <CardActions>
        <FlatButton label="Email" />
        <FlatButton label="GitHub" />
      </CardActions>
    </Card>
   );
  }
}