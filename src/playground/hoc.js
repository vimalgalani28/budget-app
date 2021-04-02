import React from "react"
import ReactDOM from "react-dom"

const info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This are the details: {props.info}</p>
    </div>
)

const requireAuthentication = (WrappedComponent) =>{
    return (props) => (
        <div>
            {props.isAuthenticated && <WrappedComponent {...props}/>}
            {!props.isAuthenticated && <p>You are not logged in. Please Login!</p>}
        </div>
    )
}

const AuthInfo = requireAuthentication(info)

ReactDOM.render(<AuthInfo info="Private Details" isAuthenticated={true}/> , document.getElementById("app"))