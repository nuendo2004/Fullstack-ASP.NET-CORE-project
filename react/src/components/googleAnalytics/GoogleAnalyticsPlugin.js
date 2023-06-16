import ReactGA from "react-ga";

const GoogleAnalyticsPlugin = () => {
  const GOOGLE_ANALYTICS_ID = "UA-249851394-1";
  ReactGA.initialize(GOOGLE_ANALYTICS_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
  ReactGA.event();
};
export default GoogleAnalyticsPlugin;
