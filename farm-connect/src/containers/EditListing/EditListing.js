import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';

class EditListing extends Component {
    render(){
        const measuresList = ["bushel", "dozen", "gram", "kilogram", "pound", "tonne", "unit"];
        let available;

        if(this.props.listing.attributes.available){
            available = "Yes"
        } else {
            available = "No"
        }

        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <h2>Edit Listing</h2>
                { this.props.isLoading ?
                    <Loader /> :
                    <form>
                        <p><label><strong>ID</strong> {this.props.listing.id}</label></p>
                        <p>Commodity:
                            <select name="commodity" value={this.props.listing.attributes.commodity.name} >
                                { this.props.commodities.map((commodity, idx) =>
                                    <option key={idx} value={commodity.attributes.name}>{commodity.attributes.name}</option>)
                                }
                            </select>
                        </p>

                        <p>Est. Availability:
                            <input type="date" name="estAvailability" value={this.props.listing.attributes.est_availability.slice(0, 10)} />
                        </p>

                        <p>Quantity:
                            <input type="number" name="quantity" value={this.props.listing.attributes.quantity ? this.props.listing.attributes.quantity : ""} />
                        </p>

                        <p>Measure:
                            <select name="measure" value={this.props.listing.attributes.measure}>
                                { measuresList.map((measure, idx) =>
                                    <option key={idx} value={measure}>{measure}</option>)
                                }
                            </select>
                        </p>

                        <p>Availabe:
                            <select name="available" value={available}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </p>

                        <p>
                            <label style={{verticalAlign: "top"}}>Supplementary Info </label>
                            <textarea name="suppInfo" id="suppInfo" rows="8" cols="30" style={{padding: 8}} maxLength="255" value={this.props.listing.attributes.supp_info ? this.props.listing.attributes.supp_info : ""}></textarea>
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
        isLoading: state.commodities.isLoading
    }
}

export default connect(mapStateToProps)(EditListing);