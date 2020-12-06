import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { searchFarmers } from '../../actions/searchUsersActions';
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
                        <input id="search_input" type="text" placeholder="farmer's first or last name" onChange={this.handleChange} />
                        <input id="search_btn" type="submit" value="Search" />
                    </form>
                    {   this.props.isLoading
                            ?   <Loader />
                            :   <h4>Search Results</h4>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.searchUsers.isLoading,
        searchResults: state.searchUsers.searchResults
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchFarmers: (searchText) => dispatch(searchFarmers(searchText))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);