import React, {useState, useEffect} from "react";
 import { Table, Card, Row, Col, Tab} from 'react-bootstrap';
import surveyInstanceService from "../../services/surveyInstanceService";
import SurveyInstanceCard from "../surveyinstance/SurveyInstanceCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import "../surveyinstance/surveyinstance.css";
import toastr from "toastr";

const SurveyInstance = () => {

    const [instances, setInstances] = useState({
        instances: [],
        instancesComponent: [],
        pageIndex: 0,
        pageSize: 8,
        totalCount: 0,
        current: 1,
      });

      useEffect(() => {
        surveyInstanceService
          .getSurveyInstances(instances.current-1, instances.pageSize)
          .then(onGetSurveyInstanceSuccess)
          .catch(onGetSurveyInstanceError);
      }, [instances.current]);

      const onGetSurveyInstanceSuccess = async (response) => {
        let survInstances = response.item.pagedItems
        setInstances((prevState) => {
            const instanceData = {...prevState}
            instanceData.instances = survInstances;
            instanceData.instancesComponent = survInstances.map(mapInstance);
            instanceData.totalCount = response.item.totalCount;

            return instanceData
        })
      }

      const onGetSurveyInstanceError = () => {
        toastr.error("Instances Not Found")
      }

      const mapInstance = (anInstance, index) => {
        return (
            <SurveyInstanceCard instance={anInstance} key={index} index={index}/>
        )
      }
 
    const onChangedPage = (page) => {
        setInstances((prevState) => {
            const currentPage = {...prevState}
            currentPage.current = page;

            return currentPage;
        });
      };

      useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <React.Fragment>
            <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
                <div id="hoverable-rows" className="mb-4">
                    <h2 className="survey-instance-title">Survey Instances</h2>
                </div>
                <Tab.Container defaultActiveKey="design">
                    <Card>
                        <Card.Body className="p-0">
                            <Tab.Content>
                                <Tab.Pane eventKey="design" className="pb-4 p-4">
                                    <Table hover className="text-nowrap">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-primary">#</th>
                                                <th scope="col" className="text-primary">User Name</th>
                                                <th scope="col" className="text-primary">Survey Name</th>
                                                <th scope="col" className="text-primary">Date Created</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {instances.instancesComponent}
                                        </tbody>
                                    </Table>
                                    <Pagination
                                    onChange={onChangedPage}
                                    locale={locale}
                                    current={instances.current}
                                    pageSize={instances.pageSize}
                                    total={instances.totalCount}
                                    className="page-link mx-1 rounded btn"
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </Card.Body>
                    </Card>
                </Tab.Container>
            </Col>
        </Row>
        </React.Fragment>
    )
}

export default React.memo(SurveyInstance);