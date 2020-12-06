import React, { Component } from 'react';

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
        console.log(this.state.searchText);
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

export default SearchUsers;