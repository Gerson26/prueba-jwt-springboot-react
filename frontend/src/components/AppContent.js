import React from 'react';
import WelcomeContent from './WelcomeContent';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';
import Buttons from './Buttons';
import { request, setAuthHeader } from './axios_helper';

export default class AppContent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      componentToShow: "welcome"
    }
  }
  login = () => {
    this.setState({componentToShow: "login"})
  };

  logout = () => {
      this.setState({componentToShow: "welcome"})
      setAuthHeader(null);
  };

  onLogin = (e, username, password) => {
      e.preventDefault();
      request(
          "POST",
          "/login",
          {
              login: username,
              password: password
          }).then(
          (response) => {
              // setAuthHeader(response.data.token);
              setAuthHeader(response.data);
              this.setState({componentToShow: "messages"});
          }).catch(
          (error) => {
              setAuthHeader(null);
              this.setState({componentToShow: "welcome"})
          }
      );
  };

  onRegister = (event, firstName, lastName, username, password) => {
      event.preventDefault();
      request(
          "POST",
          "/register",
          {
              firstName: firstName,
              lastName: lastName,
              login: username,
              password: password
          }).then(
          (response) => {
              setAuthHeader(response.data);
              this.setState({componentToShow: "messages"});
          }).catch(
          (error) => {
              setAuthHeader(null);
              this.setState({componentToShow: "welcome"})
          }
      );
  };

  render(){
    return (
      <div>
          <Buttons
            login={this.login}
            logout={this.logout}
          />
          {this.state.componentToShow === "welcome" && <WelcomeContent /> }
          {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
          {this.state.componentToShow === "messages" && <AuthContent />}
      </div>
    )
  }
 
}
