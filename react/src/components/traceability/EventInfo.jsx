import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import debug from "sabio-debug";
import { Accordion, Row } from "react-bootstrap";
import { getSecurityEventByTrainee } from "../../services/securityEventsService"
import toastr from "toastr";
import Pagination from "rc-pagination";
import 'rc-pagination/assets/index.css';
import locale from "rc-pagination/lib/locale/en_US"
import RenderEvent from "./EventRender";


const _logger = debug.extend("EventInfoPage");

function EventInfo() {

    const [pageData, setPageData] = useState({
        pageIndex: 0,
        pageSize: 1,
        totalFound: 0,
    });

    const [securityEvent, setSecurityEvent] = useState({
        zone: "",
        zoneName: "",
        consequence: "",
        actor: "",
        ActorAccount: 0,
        eventComponents: []
    })

    const { state } = useLocation()

    const traineeId = state.trainee.id;



    useEffect(() => {
        getSecurityEventByTrainee(traineeId, pageData.pageIndex, pageData.pageSize).then(onSuccess).catch(onError)
    }, [pageData.pageIndex]);

    const onSuccess = (response) => {
        const eventArray = response.item.pagedItems;
        setSecurityEvent((prevState) => {
            const pd = { ...prevState };
            pd.eventComponents = eventArray.map(mapEvents)
            return pd;
        })
    }
    const mapEvents = (array) => {
        return (<RenderEvent events={array} key={array.id}></RenderEvent>)
    }

    const onError = () => {
        toastr.error("Trainee Does Not Have Any security Events")
    }

    const onChangePage = (page) => {
        _logger("EventInfoPage---->", page)
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.pageIndex = page;
            return pd;
        })
    };

    return (
        <Fragment>
            <Row className="text-center"><h1><strong>Event Details</strong></h1></Row>
            <Row>
                <Accordion>
                    {securityEvent.eventComponents}
                </Accordion>

            </Row>
            <Pagination
                className="text-center"
                onChange={onChangePage}
                current={pageData.pageIndex}
                total={pageData.totalFound}
                locale={locale}
                pageSize={pageData.pageSize}>
            </Pagination>
        </Fragment>
    );
};

export default EventInfo;