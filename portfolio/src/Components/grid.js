import React from 'react';
import tilesData from '../Data/projects.js'

import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    height: 450,
    overflowY: 'none',
  },
};

const thumbnailStyle = {
    WebkitTransform: 'scale(0.5)',
    width: '400px',
    height: '180px'

}

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const GridListExampleSimple = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      {tilesData.map((tile, key) => (
        <a href={tile.img} key ={key}>
        <GridTile
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
        >
          <iframe 
            title={tile.title} 
            src={tile.img} 
            frameBorder="0" 
            scrolling="no" 
            style={thumbnailStyle} 
          />
        </GridTile>
        </a>
      ))}
    </GridList>
  </div>
);

export default GridListExampleSimple;