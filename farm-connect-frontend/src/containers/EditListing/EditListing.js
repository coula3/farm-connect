import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { editListing } from '../../actions/listingsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import { getDate } from '../../utils/miscellaneousUtils';
import * as messages from '../../utils/errorsUtils/listingErrors';
import './EditListing.css';

class EditListing extends Component {
    state = {
        listing: {
            commodity: "",
            availability: "",
            measure: "",
            quantity: "",
            available: "",
            information: "",
            closed: ""
        },
        editMode: false,
        maxInfoCharacters: 255
    }

    componentWillUnmount(){
        this.props.errorMessages[0] && this.props.clearErrorMessages();
    }

    handleSwitchState = () => {
        if(!this.state.editMode){
            this.setState({
                editMode: true,
                listing: {
                    ...this.state.listing,
                    commodity: this.props.listing.attributes.commodity.name,
                    availability: this.props.listing.attributes.availability,
                    measure: this.props.listing.attributes.measure,
                    quantity: this.props.listing.attributes.quantity,
                    available: this.props.listing.attributes.available,
                    information: this.props.listing.attributes.information,
                    closed: this.props.listing.attributes.closed
                }
            })
        }
    }

    handleChange = (e) => {
        if(this.state.editMode){
            this.setState({
                listing: {
                ...this.state.listing,
                [e.target.name]: e.target.value
                }
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editListing(this.props.listing.id, this.state.listing);
    }

    convertToYesNo = (trueFalseValue) => {
        return trueFalseValue ? "Yes" : "No";
    }

    getMeasuresList = (selectedMeasure) => {
        const measuresList = ["--please choose--", "bushel", "dozen", "gram", "kilogram", "pound", "tonne", "unit"];
        if(selectedMeasure){
            return measuresList.slice(1);
        } else {
            return measuresList;
        }
    }

    getCommodity = (commodityProps) => {
        return this.state.editMode ? this.state.listing.commodity : commodityProps;
    }

    getAvailability = (availabilityProps) => {
        return this.state.editMode ? this.state.listing.availability.slice(0, 10) : availabilityProps.slice(0, 10)
    }

    getQuantity = (quantityProps) => {
        if(!this.state.editMode && !quantityProps){
            return "";
        } else if (!this.state.editMode && quantityProps){
            return quantityProps;
        } else if(this.state.editMode && this.state.listing.quantity){
            return this.state.listing.quantity;
        } else {
            return "";
        }
    }

    getMeasure = (measureProps) => {
        if(!this.state.editMode && !measureProps){
            return "";
        } else if (!this.state.editMode && measureProps){
            return measureProps;
        } else if(this.state.editMode && this.state.listing.measure){
            return this.state.listing.measure;
        } else {
            return "";
        }
    }

    getAvailable = (availableProps) => {
        return this.state.editMode ?
            (this.state.listing.available === "Yes" || this.state.listing.available === "No" ?
                this.state.listing.available :
                this.convertToYesNo(this.state.listing.available)
                ) :
            this.convertToYesNo(availableProps);
    }

    getSuppInfo = (infoProps) => {
        return this.state.editMode ?  this.state.listing.info : infoProps;
    }

    getCharactersLength = (infoProps) => {
        return this.state.editMode ? this.state.listing.information.length : infoProps.length;
    }

    closeListing = (closeDate) => {
        return !this.state.listing.closed ? closeDate : "";
    }

    closeListingWarning = () => {
        return this.state.listing.closed ? "NOTICE: closed listing becomes uneditable" : null;
    }

    setUpdateBtnColor = () => {
        return this.state.editMode ? "update_btn" : "update_btn_disabled";
    }

    handleCancelEdit = (e) => {
        e.preventDefault();
        this.props.history.push(`/listings/${this.props.listing.id}`);
    }


    render(){
        const currentDate = new Date();
        const stringCurrentDate = currentDate.getFullYear() +"-"+ (currentDate.getMonth()+1) +"-"+ currentDate.getDate();
        const maxXterColor = (this.state.maxInfoCharacters - this.getCharactersLength(this.props.listing.attributes.information)) <= 25 ? "critical_color" : null;
        const warningMsgStyles = this.state.listing.closed ? "listing_close_warning_span" : null;

        return (
            <div className="EditListing_main_div">
                { this.props.isLoadingEditedListing ?
                    <Loader /> :
                    <div className="card">
                        <h3>Edit Listing</h3>
                        <p style={{margin:"0px 0px 10px 0px"}}>
                            <span style={{paddingRight:"30px"}}><label><strong>ID</strong> {this.props.listing.id}</label></span>
                            <span><label><strong>Listing Date</strong> {getDate(this.props.listing.attributes.date)}</label></span>
                        </p>

                        <form onSubmit={this.handleSubmit}>
                            <table className="center">
                                <tbody>
                                    <tr>
                                        <td style={{marginRight:"20px", textAlign:"right", verticalAlign:"top"}}>Commodity</td>
                                        <td style={{width:"78%"}}>
                                            <select className="commodity_select" name="commodity" value={this.getCommodity(this.props.listing.attributes.commodity.name)} onClick={this.handleSwitchState} onChange={this.handleChange}>
                                                { this.props.commodities.map((commodity, idx) =>
                                                    <option key={idx} value={commodity.attributes.name}>{commodity.attributes.name}</option>)
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingTop:"10px", textAlign:"right", verticalAlign:"top"}}>Estimated Availability</td>
                                        <td>
                                            <input className="availability_input" type="date" name="availability" value={this.getAvailability(this.props.listing.attributes.availability)} onClick={this.handleSwitchState} onChange={this.handleChange} />

                                            <span id="availability_span" className="p_errors">{messages.availabilityError(this.props.errorMessages)}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingTop:"10px", textAlign:"right", verticalAlign:"top"}}>Quantity</td>
                                        <td>
                                            <input className="quantity_input" type="number" name="quantity" min="0" value={this.getQuantity(this.props.listing.attributes.quantity)} onFocus={this.handleSwitchState} onChange={this.handleChange} />

                                            <select className="measure_select" name="measure" value={this.getMeasure(this.props.listing.attributes.measure)} onClick={this.handleSwitchState} onChange={this.handleChange}>
                                                { this.getMeasuresList(this.props.listing.attributes.measure).map((measure, idx) =>
                                                    <option key={idx} value={measure}>{measure}</option>)
                                                }
                                            </select>

                                            <p style={{margin:"0px", float:"left", display:"inline-block", paddingLeft:"4%"}} className="p_errors">
                                                {messages.quantityError(this.props.errorMessages)}
                                            </p>
                                            <p style={{margin:"0px", float:"right", display:"inline-block", paddingRight:"18%"}} className="p_errors">
                                                {messages.measureError(this.props.errorMessages)}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingTop:"10px", textAlign:"right", verticalAlign:"top"}}>Availabe</td>
                                        <td>
                                            <select className="available_select"  name="available" value={this.getAvailable(this.props.listing.attributes.available)} onClick={this.handleSwitchState} onChange={this.handleChange}>
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingTop:"10px", textAlign:"right", verticalAlign:"top"}}>Supplementary Info</td>
                                        <td>
                                            <textarea className="info_textarea" name="information" id="information" rows="6" cols="48" maxLength="255" value={this.getSuppInfo(this.props.listing.attributes.information)} onClick={this.handleSwitchState} onChange={this.handleChange}></textarea>
                                            <br />
                                            <span id={maxXterColor} style={{width:"50%", clear:"both", display:"inline-block"}}>{this.state.maxInfoCharacters - this.getCharactersLength(this.props.listing.attributes.information)}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <p>
                                <label>Close Listing </label>
                                <input type="checkbox" name="closed" id="closeListing" value={this.closeListing(stringCurrentDate)} checked={this.state.listing.closed === stringCurrentDate} onFocus={this.handleSwitchState} onChange={this.handleChange}/>
                            </p>
                            <span id={warningMsgStyles}>{this.closeListingWarning()}</span>

                            <p id="p_button_update"><input className={this.setUpdateBtnColor()} type="submit" value="Update" disabled={!this.state.editMode}/></p>

                            <input className="global_btn" type="submit" value="Cancel" onClick={this.handleCancelEdit} />
                        </form>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listing: state.listings.listing,
        commodities: state.commodities.commodities,
        isLoading: state.commodities.isLoading,
        isLoadingEditedListing: state.listings.isLoading,
        errorMessages: state.errorMessages.errorMessages
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editListing: (listingId, payload) => dispatch(editListing(listingId, payload, ownProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListing);