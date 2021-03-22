import React from "react";
import { paths } from "../../utils/miscellaneousUtils";

const SearchListings = (props) => {
  let searchInputPlaceholderTexts;
  if (
    props.match.path === paths().LISTINGS_PATH ||
    props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH ||
    props.match.path === paths().MY_INTERESTS_PATH
  ) {
    searchInputPlaceholderTexts = "search list date, commodity or farmer";
  } else {
    searchInputPlaceholderTexts = "search list date or commodity";
  }

  return (
    <div>
      {!props.listings[0] ? null : (
        <input
          id="listings-search-input"
          type="search"
          placeholder={searchInputPlaceholderTexts}
          value={props.searchText}
          onFocus={() => props.handleFocus()}
          onBlur={() => props.handleBlur()}
          onChange={(e) => props.handleChange(e)}
        />
      )}
    </div>
  );
};

export default SearchListings;
