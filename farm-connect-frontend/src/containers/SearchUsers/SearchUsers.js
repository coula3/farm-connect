import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { searchUsers, clearSearchResults } from '../../actions/searchUsersActions';
import './SearchUsers.css'
import { fetchFarmer } from '../../actions/farmersActions';
import { fetchProspect } from '../../actions/prospectsActions';

class SearchUsers extends Component {
    state = {
        searchText: "",
        userType: ""
    }

    handleChange = (e) => {
        const userType = this.props.match.path.endsWith("farmers") ? "F" : "P"
        this.setState({
            searchText: e.target.value,
            userType
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.searchText){
            this.props.searchUsers(this.state);
        }
        this.setState({
            searchText: "",
            userType: ""
        });
    }

    handleClick = (id) => {
        if(this.props.match.path.endsWith("farmers")){
            this.props.fetchFarmer(id);
        } else {
            this.props.fetchProspect(id);
        }
    }

    componentWillUnmount(){
        this.props.clearSearchResults();
    }

    componentDidUpdate(){
        if(this.props.searchResults.data && this.props.searchResults.data[0]){
            this.props.match.path === "/users/search-farmers" && this.props.searchResults.data[0].attributes.type === "Prospect" && this.props.clearSearchResults();
            this.props.match.path === "/users/search-prospects" && this.props.searchResults.data[0].attributes.type === "Farmer" && this.props.clearSearchResults();
        }
    }

    userType = () => {
        return this.props.match.path === "/users/search-farmers" ? "farmer's" : "prospect's";
    }

    mainResource = () => {
        return this.props.match.path === "/users/search-farmers" ? "farmers" : "prospects";
    }

    render(){
        const renderSearchResults = searchResults => {
            const sortedSearchResults = [...searchResults.data].sort((a, b) => {
                if(a.attributes.first_name < b.attributes.first_name) { return -1 }
                if(a.attributes.first_name > b.attributes.first_name) { return 1 }
                return 0
            });

            return (
                <ol style={{padding:"0px 20px 0px 20px"}}>
                    { sortedSearchResults.map((user, idx) =>
                        <li key={user.id} style={{listStyle:"none"}}>{idx +1}. <Link to={`/${this.mainResource()}/${user.id}`} onClick={() => this.handleClick(user.id)}>{user.attributes.first_name} {user.attributes.last_name}</Link></li>)
                    }
                </ol>
            );
        };

        return (
            <div className="SearchUsers_main_div">
                <div className="search_users_card">
                    <form onSubmit={this.handleSubmit}>
                        <input id="search_input" type="text" placeholder={`${this.userType()} first or last name`} value={this.state.searchText} onChange={this.handleChange} />
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
        searchUsers: (payload) => dispatch(searchUsers(payload)),
        fetchFarmer: (id) => dispatch(fetchFarmer(id)),
        fetchProspect: (id) => dispatch(fetchProspect(id)),
        clearSearchResults: () => dispatch(clearSearchResults())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);