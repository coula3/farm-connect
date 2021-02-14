import React from 'react';
import * as messages from '../../utils/errorsUtils/listingErrors';

const CreateListingForm = props => (
    <>
        <form onSubmit={props.handleSubmit}>
            <label className="create-listing-label">Commodity</label>
            <select className="create-listing-commodity-select" name="commodity" id="commodity-select" value={props.commodity} onChange={props.handleChange}>
                { props.commoditiesList.map((commodity, idx) =>
                    (<option key={idx} value={commodity}>{commodity}</option>))
                }
            </select>
            <span className="create-listing-errors-span">{messages.commodityError(props.errorMessages)}</span>

            <label className="create-listing-label create-listing-label-margin">Estimated Availability </label>
            <input className="create-listing-availability-input" name="availability" type="date" value={props.availability} onChange={props.handleChange} />
            <span className="create-listing-errors-span">{messages.availabilityError(props.errorMessages)}</span>

            <label className="create-listing-label create-listing-label-margin">Quantity </label><br />
            <input className="create-listing-quantity-input" name="quantity" type="number" min="0" value={props.quantity} onChange={props.handleChange} onKeyUp={props.enableDisableMeasure} onMouseUp={props.enableDisableMeasure}/>

            <select className="create-listing-measure-select" name="measure" disabled={props.disableMeasure} value={props.measure} onChange={props.handleChange} >
                {props.measuresList.map((measure, idx) =>
                (<option key={idx} value={measure}>{measure}</option>))}
            </select>
            <span className="create-listing-errors-span">{messages.measureError(props.errorMessages)}</span>

            <label className="create-listing-label create-listing-label-margin">Available </label>
            <select className="create-listing-available-select" name="available" id="availableSelect" value={props.available} onChange={props.handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
            </select>

            <label className="create-listing-label create-listing-label-margin">Supplementary Info </label>
            <textarea className="create-listing-textarea" name="information" id="information" rows="8" maxLength={props.maxInfoCharacters} value={props.information} onChange={props.handleChange}></textarea>
            <span className="create-listing-chars-span" style={props.maxXterColor}>
                <strong>{props.maxInfoCharacters - props.information.length}</strong>
            </span>

            <p id="create-listing-btn-p">
                <input id="create-listing-btn" className="global-btn" type="submit" />
            </p>
        </form>
    </>
)


export default CreateListingForm;