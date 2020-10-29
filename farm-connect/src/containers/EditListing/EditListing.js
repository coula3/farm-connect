import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';

class EditListing extends Component {
    state = {
        listing: {
            commodity: "",
            estAvailability: "",
            measure: "",
            quantity: "",
            available: "",
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
        })
    }

    render(){
        const measuresList = ["bushel", "dozen", "gram", "kilogram", "pound", "tonne", "unit"];
        const listDate = this.props.listing.attributes.list_date;
        const currentDate = new Date();
        const stringCurrentDate = currentDate.getFullYear() +"-"+ (currentDate.getMonth()+1) +"-"+ currentDate.getDate();
        let available;

        if(this.props.listing.attributes.available){
            available = "Yes";
        } else {
            available = "No";
        }

        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <h2>Edit Listing</h2>
                { this.props.isLoading ?
                    <Loader /> :
                    <form>
                        <p><label><strong>ID</strong> {this.props.listing.id}</label></p>
                        <p><label><strong>Listing Date</strong> {`${listDate.slice(5, 7)}/${listDate.slice(8, 10)}/${listDate.slice(0, 4)}`}</label></p>
                        <p>Commodity:
                            <select name="commodity" value={this.state.listing.commodity ? this.state.listing.commodity : this.props.listing.attributes.commodity.name} onChange={this.handleChange}>
                                { this.props.commodities.map((commodity, idx) =>
                                    <option key={idx} value={commodity.attributes.name}>{commodity.attributes.name}</option>)
                                }
                            </select>
                        </p>

                        <p>Est. Availability:
                            <input type="date" name="estAvailability" value={this.state.listing.estAvailability ? this.state.listing.estAvailability.slice(0, 10) : this.props.listing.attributes.est_availability.slice(0, 10)} onChange={this.handleChange} />
                        </p>

                        <p>Quantity:
                            <input type="number" name="quantity" value={this.state.listing.quantity ? this.state.listing.quantity : this.props.listing.attributes.quantity} onChange={this.handleChange} />
                        </p>

                        <p>Measure:
                            <select name="measure" value={this.state.listing.measure ? this.state.listing.measure : this.props.listing.attributes.measure} onChange={this.handleChange}>
                                { measuresList.map((measure, idx) =>
                                    <option key={idx} value={measure}>{measure}</option>)
                                }
                            </select>
                        </p>

                        <p>Availabe:
                            <select name="available" value={this.state.listing.available ? this.state.listing.available : available} onChange={this.handleChange}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </p>

                        <p>
                            <label style={{verticalAlign: "top"}}>Supplementary Info </label >
                            <textarea name="suppInfo" id="suppInfo" rows="8" cols="30" style={{padding: 8}} maxLength="255" value={this.state.listing.suppInfo ? this.state.listing.suppInfo : this.props.listing.attributes.supp_info} onChange={this.handleChange}></textarea>
                        </p>

                        <p>
                            <label>Close List </label>
                            <input type="checkbox" name="closeList" id="closeList" value={stringCurrentDate} checked={this.state.listing.closeList === stringCurrentDate} onChange={this.handleChange}/>
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