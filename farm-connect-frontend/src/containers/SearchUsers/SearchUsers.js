import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

import {
  searchUsers,
  clearSearchResults,
} from "../../actions/searchUsersActions";
import { fetchFarmer } from "../../actions/farmersActions";
import { fetchProspect } from "../../actions/prospectsActions";
import { addErrorMessages } from "../../actions/errorActions";

import "./SearchUsers.css";

const SearchUsers = (props) => {
  const [state, setState] = useState({ searchText: "", userType: "" });

  useEffect(() => {
    if (props.searchResults.data && props.searchResults.data[0]) {
      props.match.path === "/users/search-farmers" &&
        props.searchResults.data[0].attributes.type === "Prospect" &&
        resetSearchForm();
      props.match.path === "/users/search-prospects" &&
        props.searchResults.data[0].attributes.type === "Farmer" &&
        resetSearchForm();
    }
    return () => props.searchResults.data && props.clearSearchResults();
  });

  const handleChange = (e) => {
    const userType = props.match.path.endsWith("farmers") ? "F" : "P";

    setState({
      searchText: e.target.value,
      userType,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.searchText.match(/[^a-zA-Z\s]/)) {
      pushSearchParamsToAddressBar();
      props.addErrorMessages("Search text contained invalid character(s)");
    } else {
      if (state.searchText) {
        props.searchUsers(state);
        pushSearchParamsToAddressBar();

        setState({
          searchText: "",
          userType: "",
        });
      } else {
        props.searchResults.data && resetSearchForm();
        props.location.search &&
          window.history.pushState(
            {},
            document.title,
            `${props.location.pathname}`
          );
      }
    }
  };

  const pushSearchParamsToAddressBar = () => {
    props.history.push({
      search: `?q=${state.searchText}`,
    });
  };

  const resetSearchForm = () => {
    props.clearSearchResults();
    window.history.pushState({}, document.title, `${props.location.pathname}`);
  };

  const handleClick = (e, id) => {
    e.preventDefault();

    if (props.match.path.endsWith("farmers")) {
      props.fetchFarmer(id);
    } else {
      props.fetchProspect(id);
    }
  };

  const userType = () => {
    return props.match.path === "/users/search-farmers"
      ? "farmer's"
      : "prospect's";
  };

  const mainResource = () => {
    return props.match.path === "/users/search-farmers"
      ? "farmers"
      : "prospects";
  };

  const renderSearchResults = (searchResults) => {
    const sortedSearchResults = [...searchResults.data].sort((a, b) => {
      if (a.attributes.first_name < b.attributes.first_name) {
        return -1;
      }
      if (a.attributes.first_name > b.attributes.first_name) {
        return 1;
      }
      return 0;
    });

    return (
      <ol id="search-results-ul">
        {searchResults.data[0] ? (
          sortedSearchResults.map((user, idx) => (
            <li id="search-result-li" key={user.id}>
              {idx + 1}.{" "}
              <Link
                to={`/${mainResource()}/${user.id}`}
                onClick={(e) => handleClick(e, user.id)}
              >
                {user.attributes.first_name} {user.attributes.last_name}
              </Link>
            </li>
          ))
        ) : (
          <h4 id="no-user-search-result">No matching name</h4>
        )}
      </ol>
    );
  };

  const getSearchResultCountMessage = (searchResults) => {
    if (searchResults.length === 1) {
      return `${searchResults.length} search result`;
    } else if (searchResults.length > 1) {
      return `${searchResults.length} search results`;
    }
  };

  return (
    <div className="SearchUsers-main-div">
      <div className="search-users-card">
        <button
          id="search-x-close-btn"
          onClick={() => props.history.push("/listings")}
        >
          Close
        </button>

        <form onSubmit={handleSubmit}>
          <input
            id="search-input"
            type="search"
            placeholder={`${userType()} first or last name`}
            value={state.searchText}
            onChange={handleChange}
          />
          <input id="search-btn" type="submit" value="Search" />
          {props.searchResults.data && (
            <button id="resetSearchBtn" onClick={resetSearchForm}>
              ↻
            </button>
          )}
        </form>

        {props.isLoading ? (
          <Loader />
        ) : (
          props.searchResults.data && (
            <>
              <div id="search-count-msg-div">
                {getSearchResultCountMessage(props.searchResults.data)}
              </div>
              <div id="search-results-div">
                {renderSearchResults(props.searchResults)}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.searchUsers.isLoading,
    searchResults: state.searchUsers.searchResults,
  };
};

const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    searchUsers: (payload) => dispatch(searchUsers(payload, routerProps)),
    fetchFarmer: (id) => dispatch(fetchFarmer(id, routerProps)),
    fetchProspect: (id) => dispatch(fetchProspect(id, routerProps)),
    addErrorMessages: (message) => dispatch(addErrorMessages(message)),
    clearSearchResults: () => dispatch(clearSearchResults()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);
