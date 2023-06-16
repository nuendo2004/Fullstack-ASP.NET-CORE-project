import React, { useState, useEffect } from "react";
import { Field } from "formik";
import { Card, FormGroup, FormLabel, FormCheck } from "react-bootstrap";
import PropTypes from "prop-types";

function FilterOptionsField({ category }) {
  const [subCategory, setSubCategory] = useState({});

  useEffect(() => {
    setSubCategory((prevState) => {
      const sc = { ...prevState };
      sc.categoryFields = category.items.map(mapSubCategory);
      return sc;
    });
  }, []);

  const mapSubCategory = (item) => (
    <React.Fragment key={item.id}>
      <Field
        as={FormCheck}
        type="checkbox"
        label={item.name}
        name={`${category.name}.${item.name}`}
      />
    </React.Fragment>
  );
  return (
    <Card.Body className="border-top" key={category.name}>
      <FormGroup controlId={category.name} className="text-left">
        <FormLabel>{category.name}</FormLabel>
        {subCategory.categoryFields &&
          subCategory.categoryFields.length > 0 &&
          subCategory.categoryFields}
      </FormGroup>
    </Card.Body>
  );
}

FilterOptionsField.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
export default React.memo(FilterOptionsField);
