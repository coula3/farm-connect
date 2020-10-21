import React, { Component } from "react";

class CreateListing extends Component {
    state = {
        listDate: "",
        commodity: "",
        estAvailability: "",
        measure: "",
        quantity: "",
        available: "No"

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const measuresList = ["--please choose--", "bushel", "dozen", "gram", "kilogram", "pound", "tonne", "unit"];
        const commoditiesList = ["--please choose--"];
        this.props.commodities.map(commodity => {
            return commoditiesList.push(commodity.attributes.name)
        })

        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <h3>Create Listing</h3>
                <p>
                    <label>List Date </label> 
                    <input name="listDate" type="date" value={this.state.listDate} onChange={this.handleChange} />
                </p>
                <p>
                    <label>Commodity </label> 
                    <select name="commodity" id="commodity-select" value={this.state.commodity} onChange={this.handleChange}>
                        { commoditiesList.map((commodity, idx) =>
                            (<option key={idx} value={commodity}>{commodity}</option>))
                        }
                    </select>
                </p>
                <p>
                    <label>Estimated Availability </label>
                    <input name="estAvailability" type="date" value={this.state.estAvailability} onChange={this.handleChange} />
                </p>
                <p>
                    <label>Measure </label>
                    <select name="measure" value={this.state.measure} onChange={this.handleChange}>
                       {measuresList.map((measure, idx) =>
                       (<option key={idx} value={measure}>{measure}</option>))}
                    </select>
                </p> 
                <p>
                    <label>Quantity </label>
                    <input name="quantity" type="number" value={this.state.quantity} onChange={this.handleChange} />
                </p>
                <p>
                    <label>Available </label> 
                    <select name="available" id="available-select" value={this.state.available} onChange={this.handleChange}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </p>
            </div>
        )
    }
}

export default CreateListing;