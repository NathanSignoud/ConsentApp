import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, logged, currentUser, allowedRoles = [], ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!logged) {
          return <Redirect to="/login" />;
        }
        if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
          return <Redirect to="/" />;
        }
        return children;
      }}
    />
  );
};

export default PrivateRoute;