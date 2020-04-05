import React from "react";
import PropTypes from "prop-types";

import { cutString } from "../Utility";

const MovieCard = ({id,title,poster_path,overview,vote_average}) => (
	<div data-movie={id} className="card">
	    <div data-movie={id} className="card_image">
	      <img width="150px" height="160px" src={poster_path}/>
	    </div>
	    <div data-movie={id} className="card_details">
	      <div data-movie={id} className="card_info">
		  	<span className="movie_title">{cutString(title,20)}</span>
		  	<span className="moive_rating">({vote_average})</span>
		  </div>
		  <p className="card_description">{overview}</p>
	    </div>
  	</div>
);

MovieCard.propTypes = {
    title:PropTypes.string,
	poster_path:PropTypes.string,
	overview:PropTypes.string,
	vote_average:PropTypes.number,
};

export default MovieCard;