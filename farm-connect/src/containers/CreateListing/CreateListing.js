import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createListing } from '../../actions/listingsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import * as messages from '../../utils/errorsUtils/listingErrors';

class CreateListing extends Component {
    state = {
        listing: {
            commodity: "",
            availability: "",
            measure: "",
            quantity: "",
            available: "No",
            information: ""
        },
        maxInfoCharacters: 255,
        disableMeasure: true
    }

    componentWillUnmount(){
        this.props.errorMessages[0] && this.props.clearErrorMessages();
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
                commodity: "",
                availability: "",
                measure: "",
                quantity: "",
                available: "No",
                information: ""
            }
        })
    }

    enableDisableMeasure = () => {
        if(parseInt(this.state.listing.quantity) > 0){
            return this.setState({disableMeasure: false});
        } else {
            return this.setState({
                listing: {...this.state.listing,
                measure: ""},
                disableMeasure: true})
        }
    }

    render(){
        const measuresList = ["--please choose--", "bushel", "dozen", "gram", "kilogram", "pound", "tonne", "unit"];
        const commoditiesList = ["--please choose--"];
        this.props.commodities.map(commodity => {
            return commoditiesList.push(commodity.attributes.name);
        })

        return (
            <div style={{width: "65%", display: "inline", float: "left"}}>
                <h3>Create Listing</h3>
                <form onSubmit={this.handleSubmit}>
                    <p style={{marginBottom:0}}>
                        <label>Commodity </label> 
                        <select name="commodity" id="commodity-select" value={this.state.listing.commodity} onChange={this.handleChange}>
                            { commoditiesList.map((commodity, idx) =>
                                (<option key={idx} value={commodity}>{commodity}</option>))
                            }
                        </select>
                    </p>
                    <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.commodityError(this.props.errorMessages)}</p>
                    <p style={{marginBottom:0}}>
                        <label>Estimated Availability </label>
                        <input name="availability" type="date" value={this.state.listing.availability} onChange={this.handleChange} />
                    </p>
                    <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.availabilityError(this.props.errorMessages)}</p>
                    <p>
                        <label>Quantity </label>
                        <input name="quantity" type="number" min="0" value={this.state.listing.quantity} onChange={this.handleChange} onKeyUp={this.enableDisableMeasure} onMouseUp={this.enableDisableMeasure}/>
                    </p>
                    <p style={{marginBottom:0}}>
                        <label>Measure </label>
                        <select name="measure" disabled={this.state.disableMeasure} value={this.state.listing.measure} onChange={this.handleChange} >
                        {measuresList.map((measure, idx) =>
                        (<option key={idx} value={measure}>{measure}</option>))}
                        </select>
                    </p> 
                    <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.measureError(this.props.errorMessages)}</p>
                    <p>
                        <label>Available </label> 
                        <select name="available" id="availableSelect" value={this.state.listing.available} onChange={this.handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </p>
                    <p>
                        <label style={{verticalAlign: "top"}}>Supplementary Info </label>
                        <textarea name="information" id="information" rows="8" cols="30" style={{padding: 8}} maxLength={this.state.maxInfoCharacters} value={this.state.listing.information} onChange={this.handleChange}></textarea>
                        <label> {this.state.maxInfoCharacters - this.state.listing.information.length}</label>
                    </p>

                    <p><input type="submit" /></p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.currentUser.userId,
        listing: state.listings.listing,
        errorMessages: state.errorMessages.errorMessages
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createListing: (payload) => dispatch(createListing(payload, ownProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);