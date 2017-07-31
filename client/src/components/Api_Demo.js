import React, { Component } from 'react';
import Axios from 'axios';
import './Api_Demo.css';


import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


class Api_Demo extends Component {

  constructor() {
    super();
    this.state = {
      data: "",
      images: []
    }
  }

  componentDidMount() {
    // Axios.get('/api/getfoodlocation')
    //   .then(response => {
    //     this.setState({
    //       data: response.data
    //     })
        
    //   })
    // var location = "34.047893, -118.252632"; // texas
    var location= "34.047893, -118.252632";

    Axios.post('/api/getfoodlocation', {location: location})
      .then(response => {
        this.setState({
          data: response.data
        })
        
      })
  }

  render() {
    return (
      <div className="Api_Demo">
        <p>Here is a sample response to an api call to /api/getdata!</p>    
          <Grid>
            <Row>
              <Col>
                <pre className="showData">
                     {JSON.stringify(this.state.data, null, 2)}  
                      
                </pre>           
              </Col>
            </Row>
          </Grid> 
      </div>
    );
  }
}

export default Api_Demo;
