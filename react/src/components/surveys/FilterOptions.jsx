import React, { useState, useEffect } from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import { Form, Card, Button, FormGroup, FormLabel } from "react-bootstrap";
import FilterOptionsField from "./FilterOptionsField";
import PropTypes from "prop-types";

function FilterOptions(props) {
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    setFilterData((prevState) => {
      const fd = { ...prevState };
      fd.categories = props.data.categories.map(mapCategory);
      return fd;
    });
  }, []);

  const onSubmitClicked = (values) => {
    props.onApply(values);
  };

  const mapCategory = (category) => {
    return <FilterOptionsField category={category} key={category.name} />;
  };

  return (
    <Card>
      <Card.Header>
        <h4 className="mb-0">{props.data.title}</h4>
      </Card.Header>
      <Formik initialValues={{ search: "" }} onSubmit={onSubmitClicked}>
        <FormikForm>
          <Card.Body>
            <FormGroup controlId="search">
              <FormLabel>Search</FormLabel>
              <Form.Control
                as={Field}
                type="search"
                size="sm"
                name="search"
                placeholder="Search"
              />
            </FormGroup>
          </Card.Body>
          {filterData.categories &&
            filterData.categories.length > 0 &&
            filterData.categories}
          <Card.Footer>
            <div className="text-center">
              <Button className="btn" size="sm" type="submit">
                Apply Filter
              </Button>
            </div>
          </Card.Footer>
        </FormikForm>
      </Formik>
    </Card>
  );
}

FilterOptions.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  onApply: PropTypes.func.isRequired,
};

export default FilterOptions;
