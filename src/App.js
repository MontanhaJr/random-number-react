import {Component} from 'react';
import './App.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:8080/api/v1";
// https://random-numberapi-live.herokuapp.com
class App extends Component{
  
  options = {
    autoClose: 2000,
  };

  state={
    data: [],
    email:""
  }

  listAll=()=>{
    axios.get(url+"/person/listAll").then(response => {
      this.setState({data: response.data});
    }).catch(error=>{
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
    }).then(response => {
      console.log(response)
      toast.success("E-mail " + this.state.email + " was created successfuly");
      this.listAll();
    }).catch(error=>{
      toast.error(error.message);
    })
  }

  drawNumbers=()=>{
    axios({
      method: 'post',
      url: url + "/number/drawNumber",
      'Content-Type': 'application/json',
      data: {
        email: this.state.email 
      }
    }).then(response => {
      toast.success(JSON.stringify(response.data.message));
      this.listAll();
    }).catch(error=>{
      toast.error(error.message);
    })
  }

  listByEmail=()=>{
    if (this.state.email === "")
    {
      this.listAll();
    }
    else {
      axios.get(url+"/person/listByEmail/"+this.state.email).then(response => {
        this.setState({data: [response.data]});

      }).catch(error=>{
        toast.error(JSON.stringify(error.response.data.message));
      })
    }
  }
  
  verifyEmail=(name)=> {
    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    if(!emailRegex.test(this.state.email))
    {
      toast.error("E-mail inválido!", this.options);
    }
    else {
      if (name === "buscar")
      {
        this.listByEmail();
      }
      if (name === "criar")
      {
        this.create();
      }
      if (name === "sortear")
      {
        this.drawNumbers();
      }
    }
  }

  componentDidMount(){
    this.listAll();
  }
   
  render(){
    return(
      <div className="people">
        <ToastContainer />
        <h2>Digite o Email</h2>
        <input className="inputText" type="email" name="email" 
          onChange={(event) => {this.setState({email:event.target.value})}}/><br />
        
        <input type="button" name="buscar" value="Buscar" 
          onClick={(name) => {this.verifyEmail("buscar")}}></input>
        <input type="button" name="criar" value="Criar" 
          onClick={(name) => {this.verifyEmail("criar")}}></input>
        <input type="button" name="sortear" value="Sortear" 
          onClick={(name) => {this.verifyEmail("sortear")}}></input>
        
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