import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GridList from "@material-ui/core/GridList";
import format from "date-fns/format";
import GridListTile from "@material-ui/core/GridListTile";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Pagination from "./Pagination";
import axios from "axios";
import "../App.css";

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < 599,
      isTablet: window.innerWidth < 1200,
      items: [],
      pageOfItems: [],
      isOpen: false,
      backdropPath: null,
      posterPath: null,
      title: null,
      overview: null,
      score: null,
      rating: null,
      releaseDate: null,
      date: null,
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  handleOpen = (
    title,
    backdrop,
    poster,
    overview,
    score,
    rating,
    releaseDate
  ) => {
    this.setState({
      isOpen: true,
      title: title,
      backdropPath: backdrop,
      posterPath: poster,
      overview: overview,
      score: score,
      rating: rating,
      releaseDate: format(new Date(releaseDate), "PP"),
      date: releaseDate.slice(0, 4),
    });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }
  resizeHandler = () => {
    this.setState({
      isTablet: window.innerWidth < 1200,
      isMobile: window.innerWidth < 599,
    });
  };
  getMoviesApi = () => {
    axios
      .get(
        `http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`
      )
      .then((res) => {
        const items = res.data.results;
        this.setState({ items });
      });
  };

  componentDidMount() {
    this.getMoviesApi();
    window.addEventListener("resize", this.resizeHandler, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler, false);
  }

  render() {
    return (
      <div className="grid">
        <Modal
          aria-labelledby={this.state.title}
          aria-describedby="transition-modal-description"
          className="modal-movie"
          open={this.state.isOpen}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            children: (
              <img
                className="backdrop-image"
                src={`http://image.tmdb.org/t/p/w342${this.state.backdropPath}`}
                alt={this.state.title}
              />
            ),
          }}
        >
          <Fade in={this.state.isOpen}>
            {this.state.isMobile ? (
              <div className="modal-content">
                <div className="modal-header-buttons">
                  <button
                    onClick={this.handleClose}
                    className="mobile-back-button"
                  >
                    <i className="arrow-l left"></i>Back
                  </button>
                  <button className="mobile-next-button">
                    <i className="arrow-r right"></i>Next
                  </button>
                </div>
                <div className="modal-content-info">
                  <img
                    className="fade-image"
                    src={`http://image.tmdb.org/t/p/w342${this.state.posterPath}`}
                    alt={this.state.title}
                  />
                  <div className="movie-details">
                    <h4>Score: </h4>
                    <h3>{this.state.score} </h3>
                    <h4>Rating: </h4>
                    <h3>{this.state.rating ? "R" : "E"} </h3>
                    <h4>Release Date: </h4>
                    <h3>{this.state.releaseDate} </h3>
                  </div>
                </div>
                <div className="mobile-movie-details">
                  <h3 id="transition-modal-title">
                    {this.state.title} ({this.state.date})
                  </h3>
                  <h5 id="transition-modal-description">
                    {this.state.overview}
                  </h5>
                </div>
              </div>
            ) : (
              <div className="modal-content">
                <div className="modal-header-buttons">
                  <button onClick={this.handleClose} className="back-button">
                    <i className="arrow-l left"></i>Back
                  </button>
                </div>
                <img
                  className="fade-image"
                  src={`http://image.tmdb.org/t/p/w342${this.state.posterPath}`}
                  alt={this.state.title}
                />
                <div className="modal-content-info">
                  <h2 id="transition-modal-title">
                    {this.state.title} ({this.state.date})
                  </h2>
                  <div className="movie-details">
                    <h3>Score:  {this.state.score} </h3>
                    <h3>Rating:  {this.state.rating ? "R" : "E"} </h3>
                    <h3>Release Date:  {this.state.releaseDate} </h3>
                  </div>

                  <h5 id="transition-modal-description">
                    {this.state.overview}
                  </h5>
                </div>
              </div>
            )}
          </Fade>
        </Modal>
        <p>Latest Releases</p>
        <GridList
          cellHeight={280}
          className="grid-list"
          cols={this.state.isMobile ? 2 : this.state.isTablet ? 3 : 6}
          spacing={10}
        >
          {this.state.pageOfItems.map((tile) => (
            <Tooltip
              disableFocusListener
              title={<h3>{tile.title}</h3>}
              placement="top"
            >
              <GridListTile
                key={tile.id}
                cols={tile.cols || 1}
                onClick={() =>
                  this.handleOpen(
                    tile.title,
                    tile.backdrop_path,
                    tile.poster_path,
                    tile.overview,
                    tile.vote_average,
                    tile.adult,
                    tile.release_date
                  )
                }
              >
                <img
                  className="grid-image"
                  src={`http://image.tmdb.org/t/p/w342${tile.poster_path}`}
                  alt={tile.title}
                />
              </GridListTile>
            </Tooltip>
          ))}
        </GridList>

        <div className="pager">
          <Pagination
            items={this.state.items}
            onChangePage={this.onChangePage}
          />
        </div>
      </div>
    );
  }
}
