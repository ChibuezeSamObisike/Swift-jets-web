import { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../utils/Auth";

const { isAuthenticated } = Auth;

const routes = [
  {
    path: "/login",
    component: lazy(() => import("../pages/Auth/LoginPage")),
    type: "public",
  },
  {
    path: "/",
    component: lazy(() => import("../pages/HomePage/HomePage")),
    type: "public",
  },
  {
    path: "/admin/quotes",
    component: lazy(() => import("../pages/Quotes/QuoteListPage")),
    type: "public",
  },
  {
    path: "/admin/quotes/:id",
    component: lazy(() => import("../pages/Quotes/QuoteDetailsPage")),
    type: "public",
  },
  {
    path: "/admin/jets",
    component: lazy(() => import("../pages/Jets/JetListPage")),
    type: "public",
  },
];

const renderRoute = ({ component: Component, ...route }) => {
  return (
    <Route key={route.path} exact path={route.path}>
      {route.type === "private" && !isAuthenticated() ? (
        <Redirect to="/login" />
      ) : (
        <Suspense fallback={<></>}>
          <Component />
        </Suspense>
      )}
    </Route>
  );
};

const AllRoutes = () => routes.map((route) => renderRoute(route));

const SwiftJetRoutes = () => {
  return (
    <Switch>
      <AllRoutes />
    </Switch>
  );
};

export default SwiftJetRoutes;
