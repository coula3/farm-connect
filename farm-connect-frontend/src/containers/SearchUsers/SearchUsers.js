import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { searchUsers, clearSearchResults } from '../../actions/searchUsersActions';
import { fetchFarmer } from '../../actions/farmersActions';
import { fetchProspect } from '../../actions/prospectsActions';
import './SearchUsers.css'

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

            this.props.history.push({
                search: `?q=${this.state.searchText}`
            });

            this.setState({
                searchText: "",
                userType: ""
            });
        } else {
            this.props.searchResults.data && this.resetSearchForm();
            this.props.location.search && window.history.pushState({}, document.title, `${this.props.location.pathname}`);
        }
    }

    resetSearchForm = () => {
        this.props.clearSearchResults();
        window.history.pushState({}, document.title, `${this.props.location.pathname}`);
    }


    handleClick = (e, id) => {
        e.preventDefault();

        if(this.props.match.path.endsWith("farmers")){
            this.props.fetchFarmer(id);
        } else {
            this.props.fetchProspect(id);
        }
    }

    componentWillUnmount(){
        this.props.searchResults.data && this.props.clearSearchResults();
    }

    componentDidUpdate(){
        if(this.props.searchResults.data && this.props.searchResults.data[0]){
            this.props.match.path === "/users/search-farmers" && this.props.searchResults.data[0].attributes.type === "Prospect" && this.resetSearchForm();
            this.props.match.path === "/users/search-prospects" && this.props.searchResults.data[0].attributes.type === "Farmer" && this.resetSearchForm();
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
                <ol id="search-results-ul">
                    {   searchResults.data[0]
                            ?   sortedSearchResults.map((user, idx) =>
                                <li id="search-result-li" key={user.id}>{idx +1}. <Link to={`/${this.mainResource()}/${user.id}`} onClick={(e) => this.handleClick(e, user.id)}>{user.attributes.first_name} {user.attributes.last_name}</Link></li>)
                            : <h4 id="no-user-search-result">No matching name</h4>
                    }
                </ol>
            );
        };

        const getSearchResultCountMessage = searchResults => {
            if(searchResults.length === 1){
                return `${searchResults.length} search result`;
            } else if (searchResults.length > 1){
                return `${searchResults.length} search results`;
            }
        }

        return (
            <div className="SearchUsers-main-div">
                <div className="search-users-card">
                    <button id="search-x-close-btn" onClick={() => this.props.history.push("/listings")}>X</button>

                    <form onSubmit={this.handleSubmit}>
                        <input id="search-input" type="search" placeholder={`${this.userType()} first or last name`} value={this.state.searchText} onChange={this.handleChange} />
                        <input id="search-btn" type="submit" value="Search" />
                        {this.props.searchResults.data && <button id="resetSearchBtn" onClick={this.resetSearchForm}>↻</button>}
                    </form>

                    {   this.props.isLoading
                            ?   <Loader />
                            :   this.props.searchResults.data &&
                                <>
                                    <div id="search-count-msg-div">{getSearchResultCountMessage(this.props.searchResults.data)}</div>
                                    <div id="search-results-div">{renderSearchResults(this.props.searchResults)}</div>
                                </>
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

const mapDispatchToProps = (dispatch, routerProps) => {
    return {
        searchUsers: (payload) => dispatch(searchUsers(payload, routerProps)),
        fetchFarmer: (id) => dispatch(fetchFarmer(id, routerProps)),
        fetchProspect: (id) => dispatch(fetchProspect(id, routerProps)),
        clearSearchResults: () => dispatch(clearSearchResults())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);