import React, { Fragment, useEffect, useState, useCallback } from "react";
import consequnceService from "../../services/consequenceService";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap"
import ConsequenceCard from "./ConsequenceCard";
import debug from "sabio-debug";
import PropTypes from "prop-types";

import 'rc-pagination/assets/index.css';
import locale from "rc-pagination/lib/locale/en_US"
import Pagination from "rc-pagination";



const _logger = debug.extend("consPage");


function ConsequencesPage(props) {
    const [pageData, setPageData] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalFound: 0,
        arrayOfCons: [],
        consComponenet: [],
        filteredComponents: []
    });


    _logger("props------>", props)
    const currentUserId = props.currentUser.id;
    const navigate = useNavigate()

    useEffect(() => {
        consequnceService.paginateConsequences(pageData.pageIndex - 1, pageData.pageSize).then(onPaginateSuccess).catch(onPaginateError);
    }, [pageData.pageIndex]);

    const onEditClicked = useCallback((consequence) => {
        const payloadForTransport = { type: "Cons_type", payload: consequence };
        const idForEdit = consequence.id;
        navigate(`form/${idForEdit}`, { state: payloadForTransport })
    }, []);

    const mapConsequences = (aConsequence) => {
        return (<ConsequenceCard consequence={aConsequence} currentUser={props} key={aConsequence.dateCreated} onEditClicked={onEditClicked}></ConsequenceCard>)
    };

    const onPaginateSuccess = (response) => {
        _logger("SuccessResponse------>", response);
        const data = response.item.pagedItems;
        const tc = response.item.totalCount
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfCons = data;
            pd.totalFound = tc;
            pd.consComponenet = data.map(mapConsequences)
            return pd;
        })
    };

    const onPaginateError = () => {
    };

    const onChangePage = (page) => {
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.pageIndex = page;
            return pd;
        })
    };
    _logger("ArrayData----->", pageData.arrayOfCons)
    const onFilter = (e) => {
        e.preventDefault();
        filteredCards(currentUserId)
    };

    const filteredCards = (currentUserId) => {
        const filteredCards = (createdbyId) => {
            let result = false;
            if (currentUserId === createdbyId.createdBy.id) {
                result = true
            }
            return result;
        };
        const cardArray = pageData.arrayOfCons.filter(filteredCards)
        setPageData((prevState) => {
            const newPd = { ...prevState };
            newPd.consComponenet = cardArray.map(mapConsequences)
            return newPd;
        })
    }

    return (
        <Fragment>
            <Row>
                <button className="btn btn-primary w-25 mx-auto" style={{ marginBottom: 10 }} onClick={onFilter}>Filter Consequence</button>
                <div className="container">
                    <div className="row">{pageData.consComponenet}</div>
                </div>
            </Row>
            <Pagination
                className="text-center"
                onChange={onChangePage}
                current={pageData.pageIndex}
                total={pageData.totalFound}
                locale={locale}
                pageSize={pageData.pageSize}></Pagination>
        </Fragment>
    )
};

ConsequencesPage.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
}

export default ConsequencesPage;