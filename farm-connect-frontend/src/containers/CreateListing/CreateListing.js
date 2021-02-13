import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createListing } from '../../actions/listingsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import CreateListingForm from './CreateListingForm';
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
        this.props.createListing(payload, this.props.userId);

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
                    <CreateListingForm
                        commodity={this.state.listing.commodity}
                        availability={this.state.listing.availability}
                        quality={this.state.listing.quality}
                        measure={this.state.listing.measure}
                        available={this.state.listing.available}
                        information={this.state.listing.information}
                        errorMessages={this.props.errorMessages}
                        commoditiesList={commoditiesList}
                        measuresList={measuresList}
                        maxXterColor={maxXterColor}
                        disableMeasure={this.state.disableMeasure}
                        enableDisableMeasure={this.enableDisableMeasure}
                        maxInfoCharacters={this.state.maxInfoCharacters}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                    />
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

const mapDispatchToProps = (dispatch, routerProps) => {
    return {
        createListing: (payload, userId ) => dispatch(createListing(payload, userId, routerProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);