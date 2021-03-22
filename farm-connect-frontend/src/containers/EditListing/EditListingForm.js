import React from "react";
import * as messages from "../../utils/errorsUtils/listingErrors";

const EditListingForm = (props) => (
  <>
    <form onSubmit={props.handleSubmit}>
      <label className="edit-listing-label edit-listing-label-margin">
        Commodity
      </label>
      <select
        className="edit-listing-commodity-select"
        name="commodity"
        disabled={props.listing.attributes.interests[0]}
        value={props.getCommodity(props.commodity)}
        onClick={props.handleSwitchState}
        onChange={props.handleChange}
      >
        {props.commodities.map((commodity, idx) => (
          <option key={idx} value={commodity.attributes.name}>
            {commodity.attributes.name}
          </option>
        ))}
      </select>

      <label className="edit-listing-label edit-listing-label-margin">
        Estimated Availability{" "}
      </label>
      <input
        className="edit-listing-availability-input"
        type="date"
        name="availability"
        value={props.getAvailability(props.availability)}
        onClick={props.handleSwitchState}
        onChange={props.handleChange}
      />
      <p className="signin-errors-p signin-errors-p-margin">
        {messages.availabilityError(props.errorMessages)}
      </p>

      <label className="edit-listing-label edit-listing-label-margin">
        Quantity
      </label>
      <p id="edit-listing-qty-measure-p">
        <input
          className="edit-listing-quantity-input"
          type="number"
          name="quantity"
          min="0"
          value={props.getQuantity(props.quantity)}
          onFocus={props.handleSwitchState}
          onChange={props.handleChange}
        />
        <select
          className="edit-listing-measure-select"
          name="measure"
          value={props.getMeasure(props.measure)}
          onClick={props.handleSwitchState}
          onChange={props.handleChange}
        >
          {props.getMeasuresList(props.measure).map((measure, idx) => (
            <option key={idx} value={measure}>
              {measure}
            </option>
          ))}
        </select>
      </p>

      <p className="signin-errors-p signin-errors-p-margin">
        {messages.quantityError(props.errorMessages)}{" "}
        {messages.measureError(props.errorMessages)}
      </p>

      <span id="edit-listing-available-label">
        <label className="edit-listing-label edit-listing-label-margin">
          Available
        </label>
      </span>
      <select
        className="edit-listing-available-select"
        name="available"
        value={props.getAvailable(props.available)}
        onClick={props.handleSwitchState}
        onChange={props.handleChange}
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      <label className="edit-listing-label edit-listing-label-margin">
        Supplementary Info{" "}
      </label>
      <textarea
        className="edit-listing-textarea"
        name="information"
        id="information"
        rows="7"
        maxLength="255"
        value={props.getSuppInfo(props.information)}
        onClick={props.handleSwitchState}
        onChange={props.handleChange}
      ></textarea>
      <span id={props.maxXterColor} className="edit-listing-chars-span">
        {props.maxInfoCharacters - props.getCharactersLength(props.information)}
      </span>

      <p id="close-listing-p">
        <label>Close Listing </label>
        <input
          type="checkbox"
          name="closed"
          value={props.closeListing(props.stringCurrentDate)}
          checked={
            props.closeListing(props.stringCurrentDate) !==
            props.stringCurrentDate
          }
          onFocus={props.handleSwitchState}
          onChange={props.handleChange}
        />
      </p>
      <span id={props.warningMsgStyles}>{props.closeListingWarning()}</span>

      <p id="edit-listing-update-btn-p">
        <input
          id="edit-listing-update-btn"
          className={`${props.setUpdateBtnColor()}`}
          type="submit"
          value="Update"
          disabled={!props.editMode}
        />
      </p>

      <input
        id="edit-listing-cancel-btn"
        className="global-btn"
        type="submit"
        value="Cancel"
        onClick={props.handleCancelEdit}
      />
    </form>
  </>
);

export default EditListingForm;
