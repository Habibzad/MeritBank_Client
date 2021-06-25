import React from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function DBAChecking() {
    const history = useHistory();
    return (
        <div>
            <h4 className="transfer-header"><i class="fas fa-chevron-circle-right"></i> DBA Checking</h4>
            <div className="form-container">
                <Form >
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Account Holder ID</Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                type="number"
                                placeholder="Account Holder ID"
                                value=''
                                onChange={e => console.log('test')}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}> Amount</Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                type="number"
                                placeholder="Amount"
                                value=''
                                onChange={e => console.log('test')}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button variant="dark" type="submit">Submit</Button>
                            <Button variant="warning" onClick={() => history.push('/admin/accounts')} style={{ marginLeft: '20px' }}>Cancel</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>

    )
}

export default DBAChecking
