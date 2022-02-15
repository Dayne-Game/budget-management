import { useSelector } from "react-redux";

import { Row, Col, Card } from "react-bootstrap";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Row>
        <Col md={9}>
          <h4 style={{ marginBottom: "0px" }}>Dashboard</h4>
          <p className="subtitle">Bank Accounts</p>
          <Row className="mt-2">
            <Col md={3}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>
                    <i class="ion-card bank-icons"></i>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Salary and Expenses</Card.Subtitle>
                  <Card.Text>$265.00</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
