import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { editListing } from '../../actions/listingsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import { getDate } from '../../utils/miscellaneousUtils';
import * as messages from '../../utils/errorsUtils/listingErrors';

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
        if(this.props.errorMessages[0]){
            this.props.clearErrorMessages();
        }
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

    handleCancelEdit = (e) => {
        e.preventDefault();
        this.props.history.push(`/listings/${this.props.listing.id}`);
    }

    closeListingWarning = () => {
        return this.state.listing.closed ? "Be aware that closed listing would not be re-opened" : null;
    }

    render(){
        const currentDate = new Date();
        const stringCurrentDate = currentDate.getFullYear() +"-"+ (currentDate.getMonth()+1) +"-"+ currentDate.getDate();

        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <h2>Edit Listing</h2>
                { this.props.isLoadingEditedListing ?
                    <Loader /> :
                    <form onSubmit={this.handleSubmit}>
                        <p><label><strong>ID</strong> {this.props.listing.id}</label></p>
                        <p><label><strong>Listing Date</strong> {getDate(this.props.listing.attributes.date)}</label></p>
                        <p>Commodity:
                            <select name="commodity" value={this.getCommodity(this.props.listing.attributes.commodity.name)} onClick={this.handleSwitchState} onChange={this.handleChange}>
                                { this.props.commodities.map((commodity, idx) =>
                                    <option key={idx} value={commodity.attributes.name}>{commodity.attributes.name}</option>)
                                }
                            </select>
                        </p>

                        <p style={{marginBottom:0}}>Est. Availability:
                            <input type="date" name="availability" value={this.getAvailability(this.props.listing.attributes.availability)} onClick={this.handleSwitchState} onChange={this.handleChange} />
                        </p>
                        <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.availabilityError(this.props.errorMessages)}</p>

                        <p style={{marginBottom:0}}>Quantity:
                            <input type="number" name="quantity" min="0" value={this.getQuantity(this.props.listing.attributes.quantity)} onFocus={this.handleSwitchState} onChange={this.handleChange} />
                        </p>
                        <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.quantityError(this.props.errorMessages)}</p>

                        <p>Measure:
                            <select name="measure" value={this.getMeasure(this.props.listing.attributes.measure)} onClick={this.handleSwitchState} onChange={this.handleChange}>
                                { this.getMeasuresList(this.props.listing.attributes.measure).map((measure, idx) =>
                                    <option key={idx} value={measure}>{measure}</option>)
                                }
                            </select>
                        </p>

                        <p>Availabe:
                            <select name="available" value={this.getAvailable(this.props.listing.attributes.available)} onClick={this.handleSwitchState} onChange={this.handleChange}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </p>

                        <p>
                            <label style={{verticalAlign: "top"}}>Supplementary Info </label >
                            <textarea name="information" id="information" rows="8" cols="30" style={{padding: 8}} maxLength="255" value={this.getSuppInfo(this.props.listing.attributes.information)} onClick={this.handleSwitchState} onChange={this.handleChange}></textarea>
                            <label> {this.state.maxInfoCharacters - this.getCharactersLength(this.props.listing.attributes.information)}</label>
                        </p>

                        <p>
                            <label>Close Listing </label>
                            <input type="checkbox" name="closed" id="closeListing" value={this.closeListing(stringCurrentDate)} checked={this.state.listing.closed === stringCurrentDate} onFocus={this.handleSwitchState} onChange={this.handleChange}/>
                        </p>

                        <p style={{color:"red", fontSize:12}}>{this.closeListingWarning()}</p>

                        <p>
                            <input type="submit" value="Update" disabled={this.state.editMode ? false : true}/>
                            <input type="submit" value="Cancel" onClick={this.handleCancelEdit} />
                        </p>
                    </form>
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