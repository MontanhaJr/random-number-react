import {Component} from 'react';
import './App.css';
import axios from 'axios';

const url = "http://localhost:8080/api/v1";

class App extends Component{
  
  state={
    data: [],
    email:""
  }
  
  listAll=()=>{
    axios.get(url+"/person/listAll").then(response => {
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
      alert(error.message)
    })
  }

  create=()=>{
    axios({
      method: 'post',
      url: url + "/person",
      'Content-Type': 'application/json',
      data: {
        email: this.state.email 
      }
    })
    this.listAll();
  }

  drawNumbers=()=>{
    axios({
      method: 'post',
      url: url + "/number/drawNumber",
      'Content-Type': 'application/json',
      data: {
        email: this.state.email 
      }
    }).then(function (response) {
      this.listAll();
      
    }).catch(error=>{
      console.log(error.message);
    })
  }

  listByEmail=()=>{
    if (this.state.email == "")
    {
      this.listAll();
    }
    else {
      axios.get(url+"/person/listByEmail/"+this.state.email).then(response => {
        this.setState({data: [response.data]});
      }).catch(error=>{
        console.log(error.message);
        alert(error.message);
      })
    }
  }

  componentDidMount(){
    this.listAll();
  }
   
  render(){
    return(
      <div className="people">
        <h2>Digite o Email</h2>
        <input type="email" id='validate' onChange={(event) => {this.setState({email:event.target.value})}}></input>
        <input type="button" value="Buscar" onClick={this.listByEmail}></input>
        <input type="button" value="Criar" onClick={this.create}></input>
        <input type="button" value="Sortear" onClick={this.drawNumbers}></input>
        
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Números</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(person=>{
              return(
                <tr>
                  <td>{person.email}</td>
                  <td>{person.numbers.map(numb => {
                    return(
                      <p>{numb.numbers}</p>
                    )
                  })}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;