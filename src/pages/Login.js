import React from "react"
import axios from "axios"

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    loginProcess(event){
        event.preventDefault()
        let endpoint ="http://localhost:8000/api/auth"
        let request = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(endpoint, request)
        .then(result =>{
            if (result.data.logged) {
                // store token in local storaage
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("user", JSON.stringify(result.data.user))
                window.alert("Congratulation! You're logged babe")
                window.location.href = "/member"

            } else {
                window.alert(result.data.pesan)
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className= "container"> 
                <div className="col-lg-6" style = {{margin: "0 auto"}}>
                    <div className="card">
                        <div className="card-header bg-success">
                        <h4 className="text-white">Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ev => this.loginProcess(ev)}>
                                Username
                                <input type="text" className="form-control mb-2"
                                required value={this.state.username}
                                onChange={ev => this.setState({username: ev.target.value})}
                                />

                                Password
                                <input type="password" className="form-control mb-2"
                                required value={this.state.password}
                                onChange={ev => this.setState({password: ev.target.value})}
                                />

                                <button type="submit" className="btn btn-success">
                                    Log in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}
export default Login