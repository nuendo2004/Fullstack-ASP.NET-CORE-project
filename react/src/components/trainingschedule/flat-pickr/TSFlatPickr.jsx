/**************************************
Component : Flat Picker ( Date Picker )
***************************************

Availalble Parameters

value        	: Optional, value='' will show placeholder, if omit value it will show current date
placeholder     : Optional, default placeholder = Select Date

*/

// import node module libraries
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import PropTypes from "prop-types";

export const TSFlatPickr = (props) => {
  const { value, placeholder, onChange, options } = props;
  const [picker] = useState(new Date());

  return (
    <Flatpickr
      value={value === "" ? "" : value ? value : picker}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
      options={
        options
          ? options
          : {
              dateFormat: "YYYY-mm-dd",
              minDate: "today",
              enableTime: false,
              disable: [
                {
                  from: "2022-11-01",
                  to: "2020-02-10",
                },
              ],
            }
      }
    />
  );
};

// ** PropTypes
TSFlatPickr.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({
    dateFormat: PropTypes.string,
    minDate: PropTypes.string,
    enableTime: PropTypes.bool,
    disable: PropTypes.shape([
      {
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
      },
    ]),
  }).isRequired,
};

// ** Default Props
TSFlatPickr.defaultProps = {
  placeholder: "Select Date",
};
