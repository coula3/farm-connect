import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { editListing } from '../../actions/listingsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import { getDate, padIds } from '../../utils/miscellaneousUtils';
import EditListingForm from './EditListingForm';
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

        let fetchInterestsListings;
        const listing = this.props.listingsInterests.find(listing => listing[0] === parseInt(this.props.listing.id));

        if(this.state.listing.closed && listing){
            fetchInterestsListings = true;
        } else {
            fetchInterestsListings = false;
        }

        this.props.editListing(this.props.listing.id, this.state.listing, fetchInterestsListings);
    }


    convertToYesNo = (trueFalseValue) => {
        return trueFalseValue ? "Yes" : "No";
    }

    getMeasuresList = (selectedMeasure) => {
        const measuresList = ["--choose measure--", "bushel", "dozen", "gram", "kilogram", "pound", "tonne", "unit"];
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
        return this.state.editMode ? this.state.listing.availability.slice(0, 10) : availabilityProps.slice(0, 10);
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
        return this.state.editMode
            ?   (this.state.listing.available === "Yes" || this.state.listing.available === "No"
                ?   this.state.listing.available
                :   this.convertToYesNo(this.state.listing.available))

            :   this.convertToYesNo(availableProps);
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
        return this.state.listing.closed ? "WARNING: closed listing cannot be edited" : null;
    }

    setUpdateBtnColor = () => {
        return this.state.editMode ? "update-btn" : "update-btn-disabled";
    }

    handleCancelEdit = (e) => {
        e.preventDefault();
        this.props.history.push(`/listings/${this.props.listing.id}`);
    }


    render(){
        const currentDate = new Date();
        const stringCurrentDate = currentDate.getFullYear() +"-"+ (currentDate.getMonth()+1) +"-"+ currentDate.getDate();
        const maxXterColor = (this.state.maxInfoCharacters - this.getCharactersLength(this.props.listing.attributes.information)) <= 25 ? "xter-critical-color" : null;
        const warningMsgStyles = this.state.listing.closed ? "listing-close-warning-span" : null;

        return (
            <div className="EditListing-main-div">
                { this.props.isLoadingEditedListing
                    ?   <Loader />
                    :   <div className="edit-listing-card">
                            <button id="x-close-btn" onClick={() => this.props.history.goBack()}>X</button>

                            <h3>Edit Listing</h3>

                            <span id="edit-listing-id-span" className="tooltip">
                                {padIds(this.props.listing.id)}
                                <span className="tooltiptext">Listing Date: {getDate(this.props.listing.attributes.date)}</span>
                            </span>

                            <EditListingForm 
                                commodity={this.props.listing.attributes.commodity.name}
                                availability={this.props.listing.attributes.availability}
                                quantity={this.props.listing.attributes.quantity}
                                measure={this.props.listing.attributes.measure}
                                available={this.props.listing.attributes.available}
                                information={this.props.listing.attributes.information}
                                listing={this.props.listing}
                                commodities={this.props.commodities}
                                errorMessages={this.props.errorMessages}
                                maxXterColor={maxXterColor}
                                maxInfoCharacters={this.state.maxInfoCharacters}
                                setUpdateBtnColor={() => this.setUpdateBtnColor()}
                                editMode={this.state.editMode}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                handleSwitchState={this.handleSwitchState}
                                handleCancelEdit={this.handleCancelEdit}
                                stringCurrentDate={stringCurrentDate}
                                warningMsgStyles={warningMsgStyles}
                                getCommodity={(commodity) => this.getCommodity(commodity)}
                                getAvailability={(availability) => this.getAvailability(availability)}
                                getQuantity={(quantity) => this.getQuantity(quantity)}
                                getMeasure={(measure) => this.getMeasure(measure)}
                                getAvailable={(available) => this.getAvailable(available)}
                                getSuppInfo={(info) => this.getSuppInfo(info)}
                                getMeasuresList={(measure) => this.getMeasuresList(measure)}
                                getCharactersLength={(info) => this.getCharactersLength(info)}
                                closeListing={(stringCurrentDate) => this.closeListing(stringCurrentDate)}
                                closeListingWarning={() => this.closeListingWarning()}
                            />
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
        errorMessages: state.errorMessages.errorMessages,
        listingsInterests: state.interests.listingsInterests
    }
}

const mapDispatchToProps = (dispatch, routerProps) => {
    return {
        editListing: (listingId, payload, fetchInterestsListings) => dispatch(editListing(listingId, payload, fetchInterestsListings, routerProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListing);