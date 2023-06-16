import React, { Suspense, useState, useEffect, useCallback } from "react";
import debug from "sabio-debug";
import { Routes, Route, useLocation } from "react-router-dom";
import DefaultLayout from "./layouts/marketing/DefaultLayout";
import HorizontalLayout from "./layouts/dashboard/DashboardIndex";
import GoogleAnalyticsPlugin from "./components/googleAnalytics/GoogleAnalyticsPlugin";
import {
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
} from "./routes";
import userService from "services/userService";
import toastr from "toastr";
import FooterWithLinks from "layouts/marketing/footers/FooterWithLinks";

const DEFAULT_USER = {
  id: 0,
  roles: [],
  organizations: [],
  currentOrgId: 0,
  email: "",
  isLoggedIn: false,
};

const loading = () => <div className="">loading....</div>;
const _logger = debug.extend("App");
_logger("publicProtectedFlattenRoutes", publicProtectedFlattenRoutes);
_logger("authProtectedFlattenRoutes", authProtectedFlattenRoutes);
export default function App(props) {
  const { pathname } = useLocation();
  let [currentUser, setCurrentUser] = useState(() => {
    return DEFAULT_USER;
  });

  const { state } = useLocation();

  const getCurrent = () => {
    userService
      .currentUser()
      .then(onCurrentUserSuccess)
      .catch(onCurrentUserFail);
  };

  useEffect(() => {
    getCurrent();
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    if (state?.type === "LOGOUT") {
      setCurrentUser(DEFAULT_USER);
    } else if (state?.type === "LOGIN") {
      getCurrent();
    }
  }, [state?.type]);

  const onCurrentUserSuccess = (data) => {
    _logger("currentUser success", data);
    let loggedInUserId = data.item.id;
    _logger("currentUser------>", loggedInUserId);
    userService
      .getUserById(loggedInUserId)
      .then(onGetUserByIdSuccess)
      .catch(onGetUserByIdFail);
    setCurrentUser((prevState) => {
      let userInfo = { ...prevState };
      userInfo.id = data.item.id;
      userInfo.email = data.item.name;
      userInfo.roles = data.item?.roles;
      userInfo.organizations = data.item.organizations;
      userInfo.trainees = data.item.trainees;
      userInfo.currentOrgId = data.item.currentOrgId;
      userInfo.currentTraineeId = data.item.currentTraineeId;
      userInfo.isLoggedIn = data.isSuccessful;
      return userInfo;
    });
  };

  const onCurrentUserFail = (error) => {
    _logger("getCurrentUserFail", error);
  };

  const onGetUserByIdSuccess = (data) => {
    _logger("getUserById success", data.item);
    setCurrentUser((prevState) => {
      let userInfo = { ...prevState };
      userInfo.avatarUrl = data.item.avatarUrl;
      userInfo.firstName = data.item.firstName;
      userInfo.lastName = data.item.lastName;
      return userInfo;
    });
  };

  const onGetUserByIdFail = (error) => {
    toastr.error("getUserById fail", error);
  };

  const handleChangeOrg = (newOrgId) => {
    userService.changeOrg(newOrgId).then(onChangeSuccess).catch(onChangeError);
  };

  const onChangeSuccess = () => {
    getCurrent();
  };
  const onChangeError = (error) => {
    toastr.error("changeOrg fail", error);
  };

  const [currentPath, setCurrentPath] = useState({
    isPublic: false,
    isSecured: false,
    isUnknown: false,
  });

  const getRouteMapper = useCallback(
    (user) => (routeData) =>
      (
        <Route
          key={routeData.path}
          path={routeData.path}
          exact={routeData.exact}
          name={routeData.name}
          element={<routeData.element currentUser={user} />}
        />
      ),
    []
  );

  const getMappedRoutes = useCallback(
    (arrOfRouteData, user) => {
      let theseRoutes = arrOfRouteData.map(getRouteMapper(user));
      _logger("getMappedRoutes.", theseRoutes);
      return theseRoutes;
    },
    [getRouteMapper]
  );

  const currentPathCheck = (pp) => {
    let ppPath = pp.path.split("/").filter((el) => el !== "");
    let pathNameCheck = pathname.split("/").filter((el) => el !== "");
    let result = false;
    if (ppPath.length === pathNameCheck.length) {
      if (pathNameCheck.length === 0) {
        result = true;
      } else {
        for (let a = 0; a < pathNameCheck.length; a++) {
          if (pathNameCheck[a] !== ppPath[a]) {
            if (
              ppPath[a].startsWith(":") &&
              pathNameCheck[a].match(/^[0-9]+$/)
            ) {
              result = true;
            } else {
              return false;
            }
          } else {
            result = true;
          }
        }
      }
    }
    return result;
  };

  useEffect(() => {
    if (publicProtectedFlattenRoutes.some((pp) => currentPathCheck(pp))) {
      if (!currentPath.isPublic) {
        setCurrentPath(() => {
          return { isSecured: false, isPublic: true };
        });
      }
    } else if (authProtectedFlattenRoutes.some((pp) => currentPathCheck(pp))) {
      if (!currentPath.isSecured) {
        setCurrentPath(() => {
          return { isPublic: false, isSecured: true };
        });
      }
    } else if (!currentPath.isUnknown) {
      setCurrentPath(() => {
        return { isUnknown: true };
      });
    }
  }, [pathname, currentPath]);

  const generateDynamicRoutes = (currentUser) => {
    _logger("generateDynamicRoutes", authProtectedFlattenRoutes);
    let routes = authProtectedFlattenRoutes.filter((route) => {
      if (route.roles?.length === 0) {
        return true; //all any loggedIn user to see routes that have empty roles
      }
      return route.roles?.some((role) => currentUser.roles.includes(role));
    });
    _logger("generateDynamicRoutesA", routes);

    return getMappedRoutes(routes, currentUser);
  };

  const getLast = (arr) => {
    return [arr[arr.length - 1]];
  };

  _logger("render", {
    pathname,
    currentUser,
    currentPath: JSON.stringify(currentPath),
  });

  GoogleAnalyticsPlugin();

  return (
    <div>
      <Suspense fallback={loading()}>
        {/* if the path is public we do not care about the current User  */}
        {currentPath.isPublic && (
          <DefaultLayout
            {...props}
            handleChangeOrg={handleChangeOrg}
            currentUser={currentUser}
          >
            <Routes>
              {getMappedRoutes(publicProtectedFlattenRoutes, currentUser)}
            </Routes>
          </DefaultLayout>
        )}

        {/* if the user is logged in and attempting to go to an KNOWN page, that is is also secure/not public  */}

        {currentUser.isLoggedIn &&
          !currentPath.isPublic &&
          !currentPath.isUnknown && (
            <HorizontalLayout
              {...props}
              handleChangeOrg={handleChangeOrg}
              currentUser={currentUser}
            >
              <Routes>{generateDynamicRoutes(currentUser)}</Routes>
            </HorizontalLayout>
          )}

        {/* we do not know this url , and so the user status does not matter */}
        {currentPath.isUnknown && (
          <DefaultLayout
            {...props}
            handleChangeOrg={handleChangeOrg}
            currentUser={currentUser}
          >
            <Routes>
              {getMappedRoutes(
                getLast(publicProtectedFlattenRoutes),
                currentUser
              )}
            </Routes>
          </DefaultLayout>
        )}
        <FooterWithLinks />
      </Suspense>
    </div>
  );
}
