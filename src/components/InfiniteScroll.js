import React from "react";
import PropTypes from "prop-types";

class InfiniteScroll extends React.Component{

	constructor(props) {
        super(props);
        this.state = {
        	isFetching: false,
        	scrollHeight: 0,
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

	componentDidMount(){
		this.listElm = document.querySelector(`#${this.props.selectorId}`);
    	this.listElm.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount(){
        this.listElm.removeEventListener('scroll', this.handleScroll, true);
    }

    componentDidUpdate(prevProps, prevState) {
    	if(this.state.scrollHeight > prevState.scrollHeight + 99) {
    		this.setState({isFetching: false});
    	}
    }

    handleScroll(){
        if (this.listElm.scrollTop + this.listElm.clientHeight >= this.listElm.scrollHeight*0.98) {
        	this.setState({scrollHeight: this.listElm.scrollHeight})
        	if (!this.state.isFetching) {
            	this.setState({isFetching: true});
            	this.props.hasMore && this.props.loadMore();
        	}
        }
    }

	render(){
		const {children} = this.props;
		return <div>
			{children}
		</div>
	}
}

InfiniteScroll.propTypes = {
	hasMore: PropTypes.bool,
	loadMore: PropTypes.func,
	children: PropTypes.node.isRequired,
	selectorId: PropTypes.string
}

InfiniteScroll.defaultProps = {
	hasMore: true,
	selectorId: "infinite-list"
}

export default InfiniteScroll;