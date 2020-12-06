import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFarmers } from '../../actions/usersActions';

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
            <div style={{display: "inline", float: "left", width: "64.8%", height: "350px", paddingTop: "25px", border: "solid 1px grey"}}>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" style={{width: "75%", height: "16px"}} onChange={this.handleChange}/>
                    <input type="submit" value="Search" />
                </form>
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