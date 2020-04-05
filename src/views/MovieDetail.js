import React, {Fragment,useEffect} from "react";
import * as uuid from "uuid";
import { connect } from "react-redux";

import Header from "../Header";
import {fetchData,removeData} from "../store/action";
import {timeConvert} from "../Utility";

const UniqueId = uuid.v4();

class MovieDetail extends React.Component{
    constructor(props) {
        super(props);
		this.loadData = this.loadData.bind(this);
	}

	componentDidMount(){
		this.loadData()
	}

	componentWillUnmount(){
        const {removeData} = this.props;
        removeData({
            uniqueId:UniqueId
        });
    }

	loadData(){
		const {uniqueId,fetchData,match: {params}} = this.props;
		const {movieId} = params;
		fetchData({
	        uniqueId: UniqueId,
	        method:'GET',
			uri: `/3/movie/${movieId}`,
	    });
	}

    render(){
    	const {data,dataProps={}} = this.props;

    	if(!data){
            return null;
        }

		const {
			title,
			overview,
			poster_path,
			vote_average,
			release_date,
			content_length,
			runtime,
			director="Director", // Unable to find from the api response
			cast=["Actor 1", "Actor 2"]
		} = data || {};

		return <div className="container">
            <Header title="Movie Details"/>
        	<section id="infinite-list" className="wrapper">
        		<div className="movie_poster full_width">
        		</div>
        		<div className="movie_detail_wrapper full_width">
        			<div style={{marginBottom:5}}>
						<span style={{color:"#4A4A4A",fontSize:16,fontWeight:600}}>{title}</span>
		  				<span style={{color:"#9B9B9B",fontSize:16,marginLeft:5}}>({vote_average})</span>
					</div>
					<div style={{marginBottom:5,color:"#9B9B9B",fontSize:16}}>
						{release_date} | {timeConvert(runtime)} | {director}
					</div>
					<div style={{marginBottom:5,color:"#9B9B9B",fontSize:16}}>
						Cast: {cast.join(", ")}
					</div>
					<p style={{color:"#9B9B9B",fontSize:16}}>Description: {overview}</p>
        		</div>
        	</section>
        </div>
    }
}

MovieDetail = connect((state, ownProps) => {
    let mapStateToProps = {};
    if (state.data && state.data[UniqueId]) {
    	mapStateToProps.dataProps = state.data[UniqueId];
        mapStateToProps.data = state.data[UniqueId]["data"];
    }
    return mapStateToProps;

}, {
    fetchData,
    removeData,
})(MovieDetail);

export default MovieDetail;