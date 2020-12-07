import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
        const renderSearchResults = searchResults => {
                return (
                    <ol style={{padding:"0px 20px 0px 20px"}}>
                        { searchResults.data.map((user, idx) =>
                            <li key={user.id} style={{listStyle:"none"}}>{idx +1}. <Link to={`/farmers/${user.id}`}>{user.attributes.first_name} {user.attributes.last_name}</Link></li>)
                        }
                    </ol>
                );
            };

        return (
            <div className="SearchUsers_main_div">
                <div className="search_users_card">
                    <form onSubmit={this.handleSubmit}>
                        <input id="search_input" type="text" placeholder="farmer's first or last name" onChange={this.handleChange} />
                        <input id="search_btn" type="submit" value="Search" />
                    </form>
                    {   this.props.isLoading
                            ?   <Loader />
                            :   this.props.searchResults.data && renderSearchResults(this.props.searchResults)
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