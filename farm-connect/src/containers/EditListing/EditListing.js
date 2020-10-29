import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { editListing } from '../../actions/listingsActions';

class EditListing extends Component {
    state = {
        listing: {
            commodity: "",
            availability: "",
            measure: "",
            quantity: "",
            available: "",
            infomation: "",
            closed: ""
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
        this.props.editListing(this.props.listing.id, this.state.listing);
    }

    getListingDate = (listingDate) => {
        return `${listingDate.slice(5, 7)}/${listingDate.slice(8, 10)}/${listingDate.slice(0, 4)}`;
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
                        <p><label><strong>Listing Date</strong> {this.getListingDate(this.props.listing.attributes.date)}</label></p>
                        <p>Commodity:
                            <select name="commodity" value={this.state.listing.commodity ? this.state.listing.commodity : this.props.listing.attributes.commodity.name} onChange={this.handleChange}>
                                { this.props.commodities.map((commodity, idx) =>
                                    <option key={idx} value={commodity.attributes.name}>{commodity.attributes.name}</option>)
                                }
                            </select>
                        </p>

                        <p>Est. Availability:
                            <input type="date" name="availability" value={this.state.listing.availability ? this.state.listing.availability ? this.state.listing.availability.slice(0, 10) : null : this.props.listing.attributes.availability ? this.props.listing.attributes.availability.slice(0, 10) : null} onChange={this.handleChange} />
                        </p>

                        <p>Quantity:
                            <input type="number" name="quantity" value={this.state.listing.quantity ? this.state.listing.quantity : this.props.listing.attributes.quantity} onChange={this.handleChange} />
                        </p>

                        <p>Measure:
                            <select name="measure" value={this.state.listing.measure ? this.state.listing.measure : this.props.listing.attributes.measure} onChange={this.handleChange}>
                                { this.getMeasuresList(this.props.listing.attributes.measure).map((measure, idx) =>
                                    <option key={idx} value={measure}>{measure}</option>)
                                }
                            </select>
                        </p>

                        <p>Availabe:
                            <select name="available" value={this.state.listing.available ? this.state.listing.available : this.convertToYesNo(this.props.listing.attributes.available)} onChange={this.handleChange}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </p>

                        <p>
                            <label style={{verticalAlign: "top"}}>Supplementary Info </label >
                            <textarea name="information" id="information" rows="8" cols="30" style={{padding: 8}} maxLength="255" value={this.state.listing.information ? this.state.listing.information : this.props.listing.attributes.information} onChange={this.handleChange}></textarea>
                        </p>

                        <p>
                            <label>Close Listing </label>
                            <input type="checkbox" name="closed" id="closeListing" value={stringCurrentDate} checked={this.state.listing.closed === stringCurrentDate} onChange={this.handleChange}/>
                        </p>

                        <p><input type="submit" /></p>
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
        isLoadingEditedListing: state.listings.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editListing: (listingId, payload) => dispatch(editListing(listingId, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListing);