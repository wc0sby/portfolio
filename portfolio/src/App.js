import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Nav.js';
import InfoCard from './Components/Card.js';
import GridList from './Components/grid'
import Welcome from './Components/Welcome'
import tilesData from './Data/projects.js'
import Trivia from './Components/trivia'

import Slide from 'react-reveal/Slide';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Particles from 'react-particles-js'; 
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';


// import AppBarExampleIcon from './Components/AppBar';

class App extends Component {
  constructor(props){
  super(props)
    this.state = {
      open: false,
      navTag: 'welcome',
      theme: true
    }

    /*
    To add icons, input the material icon name and object key in an array below
    the first value is the material icon name
    the second value is the object id used to extract information from
    the infoObj
    */
   this.iconsForNav = [
     ['home', 'welcome', ['']],
     ['info', 'about', ['Resume']],
     ['code', 'projects', ['GitHub','Resume']],
     ['email', 'contact', ['Email','GitHub','LinkedIn']]
    ]
    this.wordsForScroll = [
      "using frameworks ",
      "JavaScript ",
      "React and React-Native ",
      "VBA ",
      "Bootstrap "
    ]
  }
  
  handleTheme = () =>{!this.state.theme?this.setState({theme:true}):this.setState({theme:false})}

  handleDrawerToggle = () => this.setState({open: !this.state.open});
  
  handleDrawerClose = () => {
    this.setState({open: false});
  }

  handleIconClicked = (id) => {
    this.setState({navTag: id})
  }

  rendorGridList = () => {
    return this.state.navTag === 'projects'
      ? <GridList/>
      : ''
  }

  linkPicker = () => {
    return(this.iconsForNav.map((item)=>{
      return item[1]===this.state.navTag
      ? item[2]
      : ''
      })
    )
  } 
  
  renderCard = () => {
    return (
      this.state.navTag === 'welcome'
      ? <Welcome children = {this.wordsForScroll}/>
      : (<Slide delay={3000}>
          <InfoCard
              navClicked = {this.state.navTag}
              linkToDisplay = {this.linkPicker()}
          />
        </Slide>
      )
    )
  }

  renderDrawerProjects = () => {
   return tilesData.map((tile, key) => {
      return (
        <a key={key} href={tile.img}>
          <MenuItem onClick={this.handleDrawerClose}>
              {tile.title}
          </MenuItem>
        </a>
      )   
    })
  }

  renderNavigation = () => {
   return(
      <Navigation 
      drawerFlag={this.state.drawerOpen}
      drawerToggle = {this.handleDrawerToggle}
      navIcons = {this.iconsForNav}
      getNavIconName = {this.handleIconClicked}
      name = {`...${this.state.navTag}`}
      />
    )
  }

  renderProjectDrawer = () =>{
    return (
      <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        {/* Render Menu items */}
        {<h2>Projects</h2>}
        {this.renderDrawerProjects()}
      </Drawer>
    )
  }

  renderBackground = () =>{
    return (
    <Particles params={{
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 3000
          }
        },
        move: {
          out_mode: 'out',
          speed: 5
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'bubble'
          }
        },
        modes: {
          grab: {
            distance: 515,
            line_linked: {
              opacity: 1
            }
          }
        }
      },
      
    }}
    style={{
      width: '100%',
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: '-1',
      backgroundColor: !this.state.theme?'#8e8e8e':'#111111'
      // backgroundImage: `url(${logo})` 
    }}
  />
  )}

  render() {
    const stylesheet = {
      theme: {
        position: 'fixed',
        right: '0px'
      },
      trivia: {
        margin: '0 25%'
      }
    }
    return (
      <div >
        <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme?darkBaseTheme:lightBaseTheme)}>
          <div>
            {this.renderBackground()}
          {/* Renders the page navigation */}
            {this.renderNavigation()}
          <div style={stylesheet.theme}>
            <FlatButton onClick={this.handleTheme} label={this.state.theme?'Light Theme?':'Dark Theme?'} />
          </div>
          {/* Render the menu drawer */}
            {this.renderProjectDrawer()}
          {/* Render the information cards */}
            {this.renderCard()}
          {/* Render the grid list only when on skills tab */}
            {this.rendorGridList()}
            <div style={stylesheet.trivia}>
            {this.state.navTag==='welcome'?<Trivia/>:''}
            </div>
            </div>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
