import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import axios from 'axios';
import '../App.css';

export default class Grid extends React.Component {
    state = {
        items: []
      }

      componentDidMount() {
        axios.get(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`)
          .then(res => {
            const items = res.data.results;
            this.setState({ items });
          })
      }
     

    render (){
      const items = this.state.items;
      console.log('Items are =>', items);
        return(
            <div className="grid">
              <p>Latest Releases</p>
         <GridList cellHeight={360} className="grid-list" cols={6} spacing={4}>
        {items.map((tile) => (
          <GridListTile key={tile.id} cols={tile.cols || 1}>
            <img className="grid-image" src={`http://image.tmdb.org/t/p/w342${tile.poster_path}`} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
      </div>
        )
    }
  }
  