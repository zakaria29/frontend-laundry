import React from "react"

class Trial extends React.Component{
    render(){
        //render adalah fungsi untuk menampilkan elem ini
        return(
            <div className={`alert alert-${this.props.bgColor}`}> 
                <h3 className="text-dark">{this.props.title}</h3>
                <email>{this.props.subtitle}</email>
            </div>
        )
    }

}
export default Trial