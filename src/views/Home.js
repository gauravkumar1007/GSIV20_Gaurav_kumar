import React, {Fragment} from "react";
import * as uuid from "uuid";
import { connect } from "react-redux";

import Header from "../Header";
import {fetchData,removeData} from "../store/action";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "../components/InfiniteScroll";
import {debounce} from "../Utility";

const UniqueId = uuid.v4();

class Home extends React.Component{

	constructor(props) {
        super(props);
		this.onInputChange = this.onInputChange.bind(this);
		this.loadData = this.loadData.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.onCardTap = this.onCardTap.bind(this);
		this.limit = 14;
		this.page = 1;
		this.query = "";
	}

	componentDidMount(){
		this.loadData(false)
	}

	componentWillUnmount(){
        const {removeData} = this.props;
        removeData({
            uniqueId:UniqueId
        });
    }
    
	loadData(append){
		const {fetchData} = this.props;
		let uri = "/3/movie/upcoming";
		let ownLoading = false;
		if(this.query){
			ownLoading = true;
			uri = "/3/search/movie";
		}

		fetchData({
			uniqueId: UniqueId,
			ownLoading,
	        method: 'GET',
	        responseDataId: "results",
			uri: uri,
			params:{
				page: this.page,
				query: this.query
			},
	        append:append,
	    });
	}

	loadMore(){
		if(this.props.dataProps.hasNoMoreData){
            return;
        }
		this.page += 1;
		this.loadData(true);
	}

	onInputChange = debounce((e)=>{
		const input = document.getElementById("search_query");
		this.query = input.value;
		this.loadData()
	},50)

	onCardTap(e){
		if(e && e.target && e.target.parentElement && e.target.parentElement.dataset){
			const {movie} = e.target.parentElement.dataset;
			if(movie){
				this.props.history.push(`/movie/${movie}`);
			}
		}
	}

	render(){
		const {data,dataProps={}} = this.props;
		
		if(!data){
            return null;
        }

		let list = data || [];
		list = list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
		const showFooter = !dataProps.hasNoMoreData;

		return <div className="container">
			<Header onInputChange={this.onInputChange} search/>
			<div onClick={this.onCardTap} id="infinite-list" className="wrapper view_center">
				{
					list.map((item,i)=> {
						return <MovieCard key={item.id} {...item}/>
					})
				}
			</div>
			{	
				showFooter && <div className="view_center footer">
					{dataProps.showFooterLoading ? <span className="footer_loading">Loading...</span> : <div className="load_more" onClick={this.loadMore}>Load More</div>}
				</div>
			}
		</div>
	}
}

Home = connect((state, ownProps) => {
    let mapStateToProps = {};
    if (state.data && state.data[UniqueId]) {
    	mapStateToProps.dataProps = state.data[UniqueId];
        mapStateToProps.data = state.data[UniqueId]["data"];
    }
    return mapStateToProps;

}, {
    fetchData,
    removeData,
})(Home);

export default Home;