import React, { Component } from 'react';
import './App.css';
import AppBar from './Components/Nav.js';
import Card from './Components/Card.js';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


// import AppBarExampleIcon from './Components/AppBar';

class App extends Component {
  constructor(props){
  super(props)
    this.state = {
      open: false,
      navTag: ''
    }
    this.iconsForNav = [
      ['home', 'welcome'],
      ['info', 'about'],
      ['code', 'skills'],
      ['email', 'contact']
    ]
  }

  infoObj = {
    about: {
      title: 'About Me',
      subtitle: '',
      text: `Hi, my name is Wade Cosby, the accountant mutating into a web developer. Today I provide my team at Whole Foods Market with solutions to overcome monotonous tasks. My passion is finding solutions through technology to create efficiencies to improve work life balance. I've spent many years of my professional career as an accountant, sharpening my analytical skills which has lead to where I am today.
      Today I'm enrolled as a student at Austin Coding Academy, where I'm furthering my education with the anticipation of progressing into a fullstack JavaScript developer. As I progress in my journey, I'll keep this page updated for your review. If you see somthing you like or have comments, please feel free to connect with me on social.`,
    },
    skills: {
      title: 'Skills',
      subtitle: '',
      text: {
        skill1:{
          title: 'Front End Development',
          text: 'I build websites with the reader in mind. My thought process is a site should be easy on the eye and not too bright. The interactive components I build are based on HTML, CSS, and JavaScript languages and their many frameworks and libraries. My designs are intended to be responsive for cross platform compatibility for on the go needs.'
        },
        skill2: {
          title: 'Wireframing',
          text: 'The foundation of every good design is based on the planning phase of the project. Wireframing is key to laying a strong foundation to a web design plan. I offer the ability to map out a plan and help you execute your end result.'
        }
      }
    },
    projects: {
      title: 'Projects',
      subtitle: '',
      text: 'These are some of my most exciting projects today. Feel free to browse my other submissions through GitHub or by navigating to projects dropdown at the top of this page.'
    },
    contact: {
      title: 'Contact',
      subtitle: '',
      text: ''
    }
  }
  
  
  handleDrawerToggle = () => this.setState({open: !this.state.open});

  handleDrawerClose = () => this.setState({open: false});

  handleIconClicked = (id) => console.log(id)


  render() {

    // const muiTheme = getMuiTheme({
    //   palette: {
    //     textColor: cyan500,
    //   },
    //   appBar: {
    //     textColor: 'white',
    //   },
    // })

    return (
      <div className='container'>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            {/* Renders the page navigation */}
            <AppBar 
              drawerFlag={this.state.drawerOpen}
              drawerToggle = {this.handleDrawerToggle}
              navIcons = {this.iconsForNav}
              getNavIconName = {()=>this.handleIconClicked(this.iconsForNav)}
              />
              {/* Render the menu drawer */}
            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
              >
              {/* Render Menu items */}
              <MenuItem onClick={this.handleDrawerClose}>Menu Item</MenuItem>
              <MenuItem onClick={this.handleDrawerClose}>Menu Item 2</MenuItem>
            </Drawer>
            {/* Render the information cards */}
            <Card
              titleProp = {this.infoObj.about.title}
              subtitleProp = {this.infoObj.about.subtitle}
              textProp = {this.infoObj.about.text}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
