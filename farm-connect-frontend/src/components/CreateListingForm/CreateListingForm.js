import React from 'react';
import * as messages from '../../utils/errorsUtils/listingErrors';

const CreateListingForm = props => (
    <>
        <form onSubmit={props.handleSubmit}>
            <table className="center">
                <tbody>
                    <tr>
                        <td className="commodity_td">Commodity</td>
                        <td>
                            <select className="commodity_select" name="commodity" id="commodity-select" value={props.commodity} onChange={props.handleChange}>
                                { props.commoditiesList.map((commodity, idx) =>
                                    (<option key={idx} value={commodity}>{commodity}</option>))
                                }
                            </select>
                            <br />
                            <span className="p_errors errors_padding_left">{messages.commodityError(props.errorMessages)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Estimated Availability </td>
                        <td>
                            <input className="availability_input" name="availability" type="date" value={props.availability} onChange={props.handleChange} />
                            <br />
                            <span className="p_errors errors_padding_left">{messages.availabilityError(props.errorMessages)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Quantity </td>
                        <td><input className="quantity_input" name="quantity" type="number" min="0" value={props.quantity} onChange={props.handleChange} onKeyUp={props.enableDisableMeasure} onMouseUp={props.enableDisableMeasure}/></td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Measure </td>
                        <td>
                            <select id="cl_measure_select" className="measure_select" name="measure" disabled={props.disableMeasure} value={props.measure} onChange={props.handleChange} >
                                {props.measuresList.map((measure, idx) =>
                                (<option key={idx} value={measure}>{measure}</option>))}
                            </select>
                            <br />
                            <span className="p_errors">{messages.measureError(props.errorMessages)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Available </td>
                        <td>
                            <select className="available_select" name="available" id="availableSelect" value={props.available} onChange={props.handleChange}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Supplementary Info </td>
                        <td>
                            <textarea className="info_textarea" name="information" id="information" rows="7" cols="42" maxLength={props.maxInfoCharacters} value={props.information} onChange={props.handleChange}></textarea>
                            <br />
                            <label style={props.maxXterColor}>{props.maxInfoCharacters - props.information.length}</label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p id="cl_btn_p"><input id="cl_btn" className="global_btn" type="submit" /></p>
        </form>
    </>
)


export default CreateListingForm;