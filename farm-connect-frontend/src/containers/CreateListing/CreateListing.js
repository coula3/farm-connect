import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createListing } from '../../actions/listingsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import * as messages from '../../utils/errorsUtils/listingErrors';
import './CreateListing.css';

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
        const maxXterColor = this.state.maxInfoCharacters - this.state.listing.information.length <= 25 ? {color:"red"} : null;

        return (
            <div className="CreateListing_main_div">
                <div className="card">
                    <h3>Create Listing</h3>
                    <form onSubmit={this.handleSubmit}>
                        <table className="center">
                            <tbody>
                                <tr>
                                    <td className="commodity_td">Commodity</td>
                                    <td>
                                        <select className="commodity_select" name="commodity" id="commodity-select" value={this.state.listing.commodity} onChange={this.handleChange}>
                                            { commoditiesList.map((commodity, idx) =>
                                                (<option key={idx} value={commodity}>{commodity}</option>))
                                            }
                                        </select>
                                        <br />
                                        <span className="p_errors errors_padding_left">{messages.commodityError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="listing_caption_td">Estimated Availability </td>
                                    <td>
                                        <input className="availability_input" name="availability" type="date" value={this.state.listing.availability} onChange={this.handleChange} />
                                        <br />
                                        <span className="p_errors errors_padding_left">{messages.availabilityError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="listing_caption_td">Quantity </td>
                                    <td><input className="quantity_input" name="quantity" type="number" min="0" value={this.state.listing.quantity} onChange={this.handleChange} onKeyUp={this.enableDisableMeasure} onMouseUp={this.enableDisableMeasure}/></td>
                                </tr>
                                <tr>
                                    <td className="listing_caption_td">Measure </td>
                                    <td>
                                        <select id="cl_measure_select" className="measure_select" name="measure" disabled={this.state.disableMeasure} value={this.state.listing.measure} onChange={this.handleChange} >
                                            {measuresList.map((measure, idx) =>
                                            (<option key={idx} value={measure}>{measure}</option>))}
                                        </select>
                                        <br />
                                        <span className="p_errors">{messages.measureError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="listing_caption_td">Available </td>
                                    <td>
                                        <select className="available_select" name="available" id="availableSelect" value={this.state.listing.available} onChange={this.handleChange}>
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="listing_caption_td">Supplementary Info </td>
                                    <td>
                                        <textarea className="info_textarea" name="information" id="information" rows="7" cols="42" maxLength={this.state.maxInfoCharacters} value={this.state.listing.information} onChange={this.handleChange}></textarea>
                                        <br />
                                        <label style={maxXterColor}>{this.state.maxInfoCharacters - this.state.listing.information.length}</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p id="cl_btn_p"><input id="cl_btn" className="global_btn" type="submit" /></p>
                    </form>
                </div>
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