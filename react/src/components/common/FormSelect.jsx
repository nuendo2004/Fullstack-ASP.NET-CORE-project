import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function FormSelect(props) {
  const { placeholder, defaultselected, options, id, name, onChange } = props;
  const [selectData, setSelectData] = useState();

  useEffect(() => {
    setSelectData((prevState) => {
      const sd = { ...prevState };
      sd.options = options.map((item, index) => {
        <option key={index} value={item.value} className="text-dark">
          {item.label}
        </option>;
        return sd;
      });
    });
  }, []);

  return (
    <Fragment>
      <Form.Select
        defaultValue={defaultselected}
        id={id}
        name={name}
        onChange={onChange}
      >
        {placeholder ? (
          <option value="" className="text-muted">
            {placeholder}
          </option>
        ) : (
          ""
        )}
        {selectData.options.length > 0 && selectData.options}
      </Form.Select>
    </Fragment>
  );
}

FormSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  defaultselected: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
};

FormSelect.defaultProps = {
  placeholder: "",
  defaultselected: "",
  id: "",
  name: "",
  options: [],
};

export default FormSelect;
