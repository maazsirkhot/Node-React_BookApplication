import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        expression: "",
        result: ""
      }
      this.getOperator = this.getOperator.bind(this);
      this.getExpression = this.getExpression.bind(this);
      this.getResult = this.getResult.bind(this);
      this.textInput = React.createRef();
    }

    componentWillMount(){
      this.setState({
        expression: "",
        result: ""
      })
    }

    componentDidMount() {
    this.textInput.current.focus();
    }

    getOperator(operator){
      this.setState({
        expression: this.state.expression + operator
      });
    }

    getExpression(e){
      this.setState({
        expression: e.target.value
      });
      //console.log(this.state);
    }

    

    getResult(){
      if(this.state.expression == ""){
        alert("Please provide input");
      }
      const data = {
        expression: this.state.expression
      }
      console.log(this.state);
      
      axios.post("http://localhost:3001/calculateExp", data)
      .then(res => {
        console.log("Status Code : ", res.status);
        if(res.status === 200){
          console.log("Calculation completed");
          this.setState({
            result: res.data
        });
        console.log("Result is: ", this.state.result);
        } else {
          this.setState({
            message : "Invalid expression. Please provide valid expression"
        })
        console.log("Some other response received");
        }
      })
      .catch((error) => {
        console.log("Error has occurred: " + error);
        this.setState({
          message : "Invalid expression. Please provide valid expression"
      })
      });
    }


    render(){
      return (
        <div>
           <div className="container">
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Calculator</h2>
                            <p>Please enter your expression</p>
                            <p><font color="red">{this.state.message}</font></p>
                            
                        </div>
                            
                            <div className="form-group">
                                <input type="text" ref={this.textInput} value={this.state.expression} className="form-control input-lg" 
                                id="exp" name="expression" placeholder="Calculate Expression"
                                onChange={this.getExpression} autoFocus required/>
                                
                            </div>
                            
                            <div className="btn-group btn-group-lg">
                              <button type="button" className="btn btn-info btn-lg" value="+" onClick={e => this.getOperator(e.target.value)}>+ (Add)</button>
                              <button type="button" className="btn btn-info btn-lg" value="-" onClick={e => this.getOperator(e.target.value)}>- (Subtract)</button>
                              <button type="button" className="btn btn-info btn-lg" value="*" onClick={e => this.getOperator(e.target.value)}>* (Multiply)</button>
                              <button type="button" className="btn btn-info btn-lg" value="/" onClick={e => this.getOperator(e.target.value)}>/ (Divide)</button>
                            </div>

                            <br/><br/>
                            <div className="form-group">
                                <input type="text" className="form-control input-lg" value={this.state.result} onChange={this.getExpression} readOnly/>
                            </div>

                            <br/><br/>
                            <button className="btn btn-primary btn-lg" type="submit" onClick={this.getResult} >Result</button> 
                            <br/><br/>
                                       
                    </div>
                </div>
            </div>
        </div>
      );
    }
}


export default App;
