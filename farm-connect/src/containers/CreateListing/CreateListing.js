import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createListing } from '../../actions/listingsActions';

class CreateListing extends Component {
    currentDate = new Date();
    stringCurrentDate = this.currentDate.getFullYear() +"-"+ (this.currentDate.getMonth()+1) +"-"+ this.currentDate.getDate();

    state = {
        listing: {
            listDate: this.stringCurrentDate,
            commodity: "",
            estAvailability: "",
            measure: "",
            quantity: "",
            available: "No",
            suppInfo: "",
            closeList: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            listing: {
                ...this.state.listing,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const payload = {listing: {...this.state.listing, userId: this.props.userId}};
        this.props.createListing(payload);

        this.setState({
            listing: {
                listDate: this.stringCurrentDate,
                commodity: "",
                estAvailability: "",
                measure: "",
                quantity: "",
                available: "No",
                suppInfo: "",
                closeList: ""
            }
        })
    }

    render(){
        const measuresList = ["--please choose--", "bushel", "dozen", "gram", "kilogram", "pound", "tonne", "unit"];
        const commoditiesList = ["--please choose--"];
        this.props.commodities.map(commodity => {
            return commoditiesList.push(commodity.attributes.name);
        })

        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <h3>Create Listing</h3>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>List Date </label> 
                        <input name="listDate" type="date" value={this.state.listing.listDate} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Commodity </label> 
                        <select name="commodity" id="commodity-select" value={this.state.listing.commodity} onChange={this.handleChange}>
                            { commoditiesList.map((commodity, idx) =>
                                (<option key={idx} value={commodity}>{commodity}</option>))
                            }
                        </select>
                    </p>
                    <p>
                        <label>Estimated Availability </label>
                        <input name="estAvailability" type="date" value={this.state.listing.estAvailability} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Quantity </label>
                        <input name="quantity" type="number" min="0" value={this.state.listing.quantity} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Measure </label>
                        <select name="measure" value={this.state.listing.measure} onChange={this.handleChange}>
                        {measuresList.map((measure, idx) =>
                        (<option key={idx} value={measure}>{measure}</option>))}
                        </select>
                    </p> 
                    <p>
                        <label>Available </label> 
                        <select name="available" id="availableSelect" value={this.state.listing.available} onChange={this.handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </p>
                    <p>
                        <label style={{verticalAlign: "top"}}>Supplementary Info </label>
                        <textarea name="suppInfo" id="suppInfo" rows="8" cols="30" style={{padding: 8}} maxLength="255" value={this.state.listing.suppInfo} onChange={this.handleChange}></textarea>
                        <label> {255-this.state.listing.suppInfo.length}</label>
                    </p>
                    <p>
                        <label>Close List </label>
                        <input type="checkbox" name="closeList" id="closeList" value={this.stringCurrentDate} onChange={this.handleChange} checked={this.state.listing.closeList === this.stringCurrentDate} />
                    </p>

                    <input type="submit" /> 
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.currentUser.userId,
        listing: state.listings.listing
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createListing: (payload) => dispatch(createListing(payload, ownProps))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);