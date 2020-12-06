import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFarmers } from '../../actions/usersActions';
import './SearchUsers.css'

class SearchUsers extends Component {
    state = {
        searchText: ""
    }

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchFarmers(this.state.searchText);
    }

    render(){
        return (
            <div className="SearchUsers_main_div">
                <div className="search_users_card">
                    <form onSubmit={this.handleSubmit}>
                        <input id="search_input" type="text" onChange={this.handleChange}/>
                        <input id="search_btn" type="submit" value="Search" />
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchFarmers: (searchText) => dispatch(searchFarmers(searchText))
    }
}

export default connect(null, mapDispatchToProps)(SearchUsers);