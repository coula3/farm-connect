import React from 'react';
import * as messages from '../../utils/errorsUtils/listingErrors';

const EditListingForm = props => (
    <>
        <form onSubmit={props.handleSubmit}>
            <table className="center">
                <tbody>
                    <tr>
                        <td className="commodity_td">Commodity</td>
                        <td>
                            <select className="commodity_select" name="commodity" disabled={props.listing.attributes.interests[0]} value={props.getCommodity(props.commodity)} onClick={props.handleSwitchState} onChange={props.handleChange}>
                                { props.commodities.map((commodity, idx) =>
                                    <option key={idx} value={commodity.attributes.name}>{commodity.attributes.name}</option>)
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Estimated Availability</td>
                        <td>
                            <input className="availability_input" type="date" name="availability" value={props.getAvailability(props.availability)} onClick={props.handleSwitchState} onChange={props.handleChange} />

                            <span id="availability_span" className="p_errors">{messages.availabilityError(props.errorMessages)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Quantity</td>
                        <td>
                            <input className="quantity_input" type="number" name="quantity" min="0" value={props.getQuantity(props.quantity)} onFocus={props.handleSwitchState} onChange={props.handleChange} />

                            <select id="measure_select_el" className="measure_select" name="measure" value={props.getMeasure(props.measure)} onClick={props.handleSwitchState} onChange={props.handleChange}>
                                { props.getMeasuresList(props.measure).map((measure, idx) =>
                                    <option key={idx} value={measure}>{measure}</option>)
                                }
                            </select>

                            <p id="qty_error_p" className="p_errors">
                                {messages.quantityError(props.errorMessages)}
                            </p>
                            <p id="measure_error_p" className="p_errors">
                                {messages.measureError(props.errorMessages)}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Availabe</td>
                        <td>
                            <select className="available_select"  name="available" value={props.getAvailable(props.available)} onClick={props.handleSwitchState} onChange={props.handleChange}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="listing_caption_td">Supplementary Info</td>
                        <td>
                            <textarea className="info_textarea" name="information" id="information" rows="6" cols="48" maxLength="255" value={props.getSuppInfo(props.information)} onClick={props.handleSwitchState} onChange={props.handleChange}></textarea>
                            <br />
                            <span id={props.maxXterColor} className="xter_span">{props.maxInfoCharacters - props.getCharactersLength(props.information)}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <p>
                <label>Close Listing </label>
                <input type="checkbox" name="closed" id="closeListing" value={props.closeListing(props.stringCurrentDate)} checked={props.closed === props.stringCurrentDate} onFocus={props.handleSwitchState} onChange={props.handleChange}/>
            </p>
            <span id={props.warningMsgStyles}>{props.closeListingWarning()}</span>

            <p id="update_button_p"><input className={`${props.setUpdateBtnColor()} eu_el_btns`} type="submit" value="Update" disabled={!props.editMode}/></p>

            <input className="global_btn eu_el_btns" type="submit" value="Cancel" onClick={props.handleCancelEdit} />
        </form>
    </>
)

export default EditListingForm;