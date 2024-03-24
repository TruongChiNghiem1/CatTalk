import React from 'react';
import Auth from './router/Auth';
import Home from './router/Home';
// const Stack = createStackNavigator();

// const App = () => {
// return (
// <>
//   <Login></Login>
// </>
// <Router>
// <Scene key="root">
// <Scene key="login" component={LoginScreen} title="Login" initial={true} />
// <Scene key="signUp" component={SignUpScreen} title="SignUp" />
// </Scene>
// </Router>
// )
// };

// // Điều hướng đến màn hình khác
// Actions.details();
// // Quay lại màn hình trước đó
// Actions.pop();
export default class App extends React.Component {
  render() {
    return <Auth />;
  }
}
