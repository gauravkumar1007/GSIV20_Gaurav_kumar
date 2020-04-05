import React, {Fragment} from "react";
import PropTypes from "prop-types";

const Header = ({search,title,onInputChange}) => (<header className="header sticky view_center">
    <div className="search header_left">
      {title && <span className="header_title">{title}</span>}
      {
        search && <Fragment>
          <span className="search_icon view_center material-icons">
            search
          </span>
            <input onChange={onInputChange} id="search_query" type="text" name="query" placeholder="Search"/>
        </Fragment>
      }
    </div>
    <div className="header_right">
    <span className="material-icons">
      home
    </span>
    </div>
  </header>
)

Header.propTypes = {
  title:PropTypes.string,
  search:PropTypes.bool,
  onInputChange:PropTypes.func
};

export default Header;