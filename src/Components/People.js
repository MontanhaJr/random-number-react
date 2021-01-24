// import { Component } from 'react';


// export default class Conversor extends Component {

    
//     constructor(props) {
//         super(props);

//         this.state = {
//             email: ""
//         }

//         this.listar = this.listar.bind(this);
//     }

//     listar() {
//         // let url = `http://localhost:8080/api/v1/person/listAll`
        
//         // fetch(url)
//         //     .then(res=>{
//         //         return res.json()
//         //     })
//         //     .then(json => {
//         //         let person = json
//         //         console.log(person);
//         //     })
//         axios.get('http://localhost:8080/api/v1/person/listAll')
//             .then((response) => {
//                 console.log(response.data);
//             })
//     }

//     render() {
//         // console.log(this.person);
//         // let url = `http://localhost:8080/api/v1/person/listAll`
        
        

//         // fetch(url)
//         //     .then(res=>{
//         //         return res.json()
//         //     })
//         //     .then(json => {
//         //         let person = json
//         //         console.log(person);
//         //     })
//         return (
            
//             <div className="people">
//                 <h2>Digite o Email</h2>
//                 <input type="email" onChange={(event) => {this.setState({email:event.target.value})}}></input>
//                 <input type="button" value="Sortear" onClick={this.listar}></input>
//                 <h2>Pessoas</h2>
//                 {/* {this.person.map(product => (
//                     <div>
//                         <h3>
//                             {product.email}
//                         </h3>
//                         <h3>
//                             {product.numbers.map(number => (
//                                 <h3>
//                                     {number.numbers}
//                                 </h3>
//                             ))}
//                         </h3>
//                     </div>
//                 ))} */}

//             </div>
//         )
//     }
// }