import { lazy } from "react";
const NewsletterSubsciptionList = lazy(() =>
  import("../components/newsletters/NewsletterSubsciptionList")
);
const NewsletterChart = lazy(() =>
  import("../components/newsletters/NewsletterChart")
);
const UserProfileLayout = lazy(() =>
  import("../components/usersettings/UserLayout")
);
const SubscriptionDashboard = lazy(() =>
  import("../components/usersettings/SubscriptionsList")
);
const UserSettings = lazy(() =>
  import("../components/usersettings/UserSettings")
);
const AnalyticsDashboards = lazy(() =>
  import("../components/dashboard/analytics/Analytics")
);
const InternalAnalytics = lazy(() =>
  import("../components/dashboard/analytics/internal/InternalAnalytics")
);
const GoogleAnalytics = lazy(() =>
  import("../components/googleAnalytics/DisplayAnalytics")
);
const SiteReferencesSummary = lazy(() =>
  import("../components/sitereferences/SiteReferencesSummary")
);

const ZoneTable = lazy(() => import("../components/trainingzone/TablesOfZone"));
const Zone = lazy(() => import("../components/trainingzone/AddZoneConfig"));
const SearchBySpeedId = lazy(() =>
  import("../components/trainingzone/SearchBySpeedId")
);
const SearchBySpreadId = lazy(() =>
  import("../components/trainingzone/SearchBySpreadId")
);
const viewThreats = lazy(() =>
  import("../components/trainingzone/ViewThreats")
);
const Checkout = lazy(() => import("../components/checkout/Checkout"));
const BeforeSuccess = lazy(() =>
  import("../components/checkout/BeforeSuccess")
);
const CheckoutSuccess = lazy(() =>
  import("../components/checkout/SuccessPage")
);
const BlogForm = lazy(() => import("../components/blogs/BlogsFormAddEdit"));
const Blogs = lazy(() => import("../components/blogadmin/Blogs.jsx"));

const PageNotFound = lazy(() => import("../components/error/Error404"));
const AddTraningUnits = lazy(() =>
  import("../components/trainingunits/AddTrainingUnit")
);
const TrainingUnitsOrgList = lazy(() =>
  import("../components/trainingunits/TrainingUnitsOrgList")
);
const TrainingScheduleCalendar = lazy(() =>
  import("../components/trainingschedule/TrainingScheduleCalendar")
);
const Trainees = lazy(() => import("../components/trainees/Trainees"));
const TraineesFormAddEdit = lazy(() =>
  import("../components/trainees/TraineesFormAddEdit")
);
const Employees = lazy(() => import("../components/employees/Employees"));
const EmployeesFormComponent = lazy(() =>
  import("../components/employees/EmployeesFormComponent")
);
const AccessLogs = lazy(() => import("../components/accesslogs/AccessLogs"));

const AddFaqs = lazy(() => import("../components/faqs/faqsAddEditForm"));

const ZoneEntry = lazy(()=>
import ("../components/zones/splash/ZoneSplash"))

const ZoneMenu = lazy(()=>
import ("../components/zones/menus/ZoneMenu"))

const ZoneMain = lazy(()=>
import ("../components/zones/mains/ZoneMain"))

const AddZoneGroup = lazy(() =>
  import("../components/zonegroups/AddZoneGroup")
);
const ZoneGroupsView = lazy(() =>
  import("../components/zonegroups/ZoneGroupsView")
);
const ZoneGroupSummary = lazy(() =>
  import("../components/zonegroups/ZoneGroupSummary")
);
const ZoneGroupOverview = lazy(() =>
  import("../components/zonegroups/ZoneGroupOverview")
);
const ZoneGroupTeam = lazy(() =>
  import("../components/zonegroups/ZoneGroupTeam")
);

const TicTacToe = lazy(() =>
  import("../components/tictactoe/TicTacToeWrapper")
);
const HackTacToe = lazy(() =>
  import("../components/hacktactoe/TicTacToeWrapper")
);
const LogoutConsequence = lazy(() =>
  import(
    "../components/tictactoe/components/gamemodes/botmode/LogoutConsequence"
  )
);
const OrgEnrollForm = lazy(() =>
  import("../components/organizations/EnrollForm")
);
const TraineeAccounts = lazy(() =>
  import("../components/traineeaccounts/TraineeAccounts.jsx")
);

const TraineeAccountEdit = lazy(() =>
  import("../components/traineeaccounts/TraineeAccountEdit.jsx")
);
const TraineeAccountLogin = lazy(() =>
  import("../components/traineeaccounts/TraineeAccountLogin")
);
const TraineeAccountForm = lazy(() =>
  import("../components/traineeaccounts/TraineeAccountsForm")
);

const ZoneRegister = lazy(() =>
  import("../components/zones/register/ZoneRegister")
);

const ZoneTokensView = lazy(() =>
  import("../components/zonetokens/ZoneTokensView")
);

const ZoneLogin = lazy(() =>
  import("../components/zones/login/ZoneLogin")
  
);

const Actors = lazy(() => import("../components/actors/ActorsFormAddEdit"));
const ActorsHome = lazy(() => import("../components/actors/Actors"));
const DisplayZone = lazy(() => import("../components/zonescomp/DisplayZone"));
const JobScheduleWizard = lazy(() =>
  import("../components/cronjobs/JobScheduleWizard")
);

const Jobs = lazy(() => import("../components/cronjobs/Jobs"));

const Survey = lazy(() => import("../components/surveys/submit/SurveySubmit"));
const Surveys = lazy(() => import("../components/surveys/Surveys"));
const SurveyBuilder = lazy(() =>
  import("../components/surveybuilder/SurveyBuilder")
);

const SurveyFormBuilder = lazy(() =>
  import("../components/surveybuilder/SurveyFormBuilder")
);

const SurveyForm = lazy(() => import("../components/surveys/SurveyForm"));

const SurveyInstance = lazy(() =>
  import("../components/surveyinstance/SurveyInstance")
);

const SurveyInstanceDetailsCard = lazy(() =>
  import("../components/surveyinstance/SurveyInstanceDetails")
  )

const TaskEventsView = lazy(() =>
  import("../components/taskevents/TaskEventsView")
);
const TaskEventsForm = lazy(() =>
  import("../components/taskevents/TaskEventsForm")
);

const taskEventsRoutes = [
  {
    path: "/taskevents/add",
    name: "TaskEventsForm",
    element: TaskEventsForm,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/taskevents/view",
    name: "TaskEventsView",
    element: TaskEventsView,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const ViewActivity = lazy(() =>
  import("../components/zonetracker/FindMyTrainee")
);

const Checkers = lazy(() =>
  import("../components/zones/tasks/checkers/Checkers")
);

const cronjobs = [
  {
    path: "/cronjobs/add",
    name: "Jobs Form",
    element: JobScheduleWizard,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/cronjobs/:id/edit",
    name: "Jobs Form",
    element: JobScheduleWizard,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/cronjobs",
    name: "Jobs",
    element: Jobs,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const Zones = lazy(() => import("../components/zonescomp/AllZones.jsx"));
const AddEditZones = lazy(() =>
  import("../components/zonescomp/AddEditZone.jsx")
);
const RescueCenterShell = lazy(() =>
  import("../components/rescuecenterzone/RescueCenterShell.jsx")
);

const InstructorsClasses = lazy(() =>
  import("../components/authentication/InstructorsClasses.jsx")
);
const SecurityTips = lazy(() =>
  import("../components/rescuecenterzone/SecurityTips.jsx")
);
const SecurityReport = lazy(() =>
  import("../components/rescuecenterzone/RescueCenterReportForm.jsx")
);
const AccountRecovery = lazy(() =>
  import("../components/rescuecenterzone/AccountRecoveryForm.jsx")
);
const ConsequenceAddEdit = lazy(() =>
  import("../components/consequences/ConsequenceAddEdit.jsx")
);
const Consequences = lazy(() =>
  import("../components/consequences/Consequences")
);
const AddActorAccount = lazy(() =>
  import("../components/actoraccount/ActorAccountForm")
);
const actorAccounts = [
  {
    path: "actoraccount/add",
    name: "ActorAccountForm",
    element: AddActorAccount,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
];
const actors = [
  {
    path: "/actors",
    name: "Actors",
    element: ActorsHome,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/actors/add",
    name: "actorsForm",
    element: Actors,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];
const TrainingSchedule = lazy(() =>
  import("../components/trainingschedule/TrainingScheduleForm")
);
const Organizations = lazy(() =>
  import("../components/organizations/Organizations")
);

const LocationForms = lazy(() => import("components/locations/LocationForms"));
const LocationsList = lazy(() => import("components/locations/LocationsList"));

const Comments = lazy(() => import("../components/comments/CommentExample"));

const Event = lazy(() => import("../components/traceability/EventInfo"));

const Report = lazy(() => import("../components/traceability/Reports"));

const TraineeList = lazy(() =>
  import("../components/traceability/TraineeList")
);

const traineeRoutes = [
  {
    path: "/usertrainees/:id",
    name: "TraineeList",
    element: TraineeList,
    roles: ["Trainee"],
    isAnonymous: false,
  },
];

const siteReferenceRoutes = [
  {
    path: "/sitereferencesummary",
    name: "SiteReferencesSummary",
    exact: true,
    element: SiteReferencesSummary,
    roles: ["SysAdmin", "OrgAdmin"],
    isAnonymous: false,
  },
];

const reportRoutes = [
  {
    path: "/reports",
    name: "Report",
    element: Report,
    roles: ["OrgTrainer", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const eventRoutes = [
  {
    path: "/events/:id",
    name: "Event",
    element: Event,
    roles: ["OrgTrainer", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const AddImageToAws = lazy(() =>
  import("../components/avataraws/AvatarLoader")
);

const avatarAws = [
  {
    path: "/avatar/add",
    name: "AddAvatarImage",
    element: AddImageToAws,
    roles: ["SysSupport"],
    exact: true,
    isAnonymous: false,
  },
];

const consequenceRoutes = [
  {
    path: "/consequences/form",
    name: "ConsequenceAddEdit",
    element: ConsequenceAddEdit,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/consequences",
    name: "Consequences",
    element: Consequences,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/consequences/form/:id",
    name: "ConsequenceAddEdit",
    element: ConsequenceAddEdit,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const ActorWizard = lazy(() => import("../components/actorwizard/ActorWizard"));

const actorWizard = [
  {
    path: "/actorwizard",
    name: "Wizard",
    element: ActorWizard,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboards",
    icon: "uil-home-alt",
    header: "Navigation",
    children: [
      {
        path: "/dashboard/analytics",
        name: "Analytics",
        element: AnalyticsDashboards,
        roles: ["OrgAdmin", "SysSupport"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/analytics/internal",
        name: "AnalyticsInternal",
        element: InternalAnalytics,
        roles: ["SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/analytics/google",
        name: "Google Analytics",
        element: GoogleAnalytics,
        roles: ["SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];
const rescueCenter = [
  {
    path: "/zones/5/rescuecenter",
    name: "RescueCenterShell",
    exact: true,
    element: RescueCenterShell,
    roles: ["Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: false,
  },
  {
    path: "/zones/5/rescuecenter/securitytips",
    name: "SecurityTips",
    exact: true,
    element: SecurityTips,
    roles: ["Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: false,
  },
  {
    path: "/zones/5/rescuecenter/securityreport",
    name: "SecurityReport",
    exact: true,
    element: SecurityReport,
    roles: ["Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: false,
  },
  {
    path: "/zones/5/rescuecenter/accountrecovery",
    name: "AccountRecovery",
    exact: true,
    element: AccountRecovery,
    roles: ["Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: false,
  },
];

const instructors = [
  {
    path: "/instructors",
    name: "Instructors Classes",
    exact: true,
    element: InstructorsClasses,
    roles: ["OrgAdmin", "OrgTrainer"],
    isAnonymous: false,
  },
];
const trainees = [
  {
    path: "/trainees/form",
    name: "TraineesFormAddEdit",
    exact: true,
    element: TraineesFormAddEdit,
    roles: ["OrgAdmin", "OrgTrainer", "Trainee"],
    isAnonymous: false,
  },
  {
    path: "/trainees",
    name: "Trainees",
    exact: true,
    element: Trainees,
    roles: ["OrgAdmin", "OrgTrainer", "Trainee"],
    isAnonymous: false,
  },
  {
    path: "/trainees/activity",
    name: "Find My Trainee",
    element: ViewActivity,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
];
const employeesRoute = [
  {
    path: "/organization/:id/employees",
    name: "Employees",
    element: Employees,
    roles: ["Admin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/organization/:id/employees/add",
    name: "EmployeesForm",
    element: EmployeesFormComponent,
    roles: ["Admin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/organization/:id/employees/invitemember",
    name: "EmployeesForm",
    element: EmployeesFormComponent,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];
const comments = [
  {
    path: "/comments",
    name: "Comments",
    element: Comments,
    roles: ["SysAdmin", "OrgAdmin", "Trainee"],
    exact: true,
    isAnonymous: false,
  },
];

const accessLogs = [
  {
    path: "/accesslogs",
    name: "AccessLogs",
    element: AccessLogs,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const organizations = [
  {
    path: "/initial/setup/organization",
    name: "Organizations",
    exact: true,
    element: OrgEnrollForm,
    roles: ["SysAdmin", "OrgAdmin"],
  },
  {
    path: "/organizations",
    name: "Organizations",
    exact: true,
    element: Organizations,
    roles: ["SysAdmin", "OrgAdmin"],
    isAnonymous: false,
  },
];

const blogs = [
  {
    path: "/blogs/add",
    name: "BlogFormAddEdit",
    element: BlogForm,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/blogs/edit/:id",
    name: "BlogFormAddEdit",
    element: BlogForm,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const KArcadeMenu = lazy(() => import("../components/zones/training/languages/korean/KArcadeMenu"));
const KArcadeMain = lazy(() => import("../components/zones/training/languages/korean/KArcadeMain"));
const KArcadeAudioInForm = lazy(() => import("../components/zones/training/languages/korean/KArcadeAudioInForm"));

const zoneRoutes = [
  {
    path: "/zones",
    name: "zones",
    exact: true,
    element: Zones,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer", "Customer"],
    isAnonymous: false,
  },
  {
    path: "/zones/add",
    name: "AddEditZones",
    exact: true,
    element: AddEditZones,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: false,
  },
  {
    path: "/zones/edit/:id",
    name: "EditZone",
    exact: true,
    element: AddEditZones,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: true,
  },
  {
    path: "/zones/:id/status/:id",
    name: "UpdateStatus",
    exact: true,
    element: AddEditZones,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: true,
  },
  {
    path: "/zones/:id/menu",
    name: "ZoneMenu",
    exact: true,
    element: ZoneMenu,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: true,
  },
  {
    path: "/zones/:id/main",
    name: "ZoneMain",
    exact: true,
    element: ZoneMain,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: true,
  },
  {
    path: "/zones/7/menutic",
    name: "TicTacToe",
    exact: true,
    element: TicTacToe,
    roles: [
      "Trainee",
      "SysAdmin",
      "Customer",
      "OrgAdmin",
      "OrgReports",
      "TrainingUnitAdmin",
      "OrgTrainer",
    ],
    isAnonymous: false,
  },
  {
    path: "/zones/11/menutic",
    name: "HackTacToe",
    exact: true,
    element: HackTacToe,
    roles: [
      "Trainee",
      "SysAdmin",
      "Customer",
      "OrgAdmin",
      "OrgReports",
      "TrainingUnitAdmin",
      "OrgTrainer",
    ],
    isAnonymous: false,
  },
  {
    path: "/zones/tictactoe/hacked",
    name: "LogoutConsequence",
    exact: true,
    element: LogoutConsequence,
    roles: [
      "Trainee",
      "SysAdmin",
      "Customer",
      "OrgAdmin",
      "OrgReports",
      "TrainingUnitAdmin",
      "OrgTrainer",
    ],
    isAnonymous: false,
  },
  {
    path: "/zones/tokens/qrgenerator",
    name: "LogoutConsequence",
    exact: true,
    element: ZoneTokensView,
    roles: [
      "SysAdmin",
      "OrgAdmin",
      "OrgReports",
      "TrainingUnitAdmin",
      "OrgTrainer",
    ],
    isAnonymous: false,
  },
  {
    path: "/zones/10/k-arcade",
    name: "K-Arcade Menu",
    exact: true,
    element: KArcadeMenu,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: false,
  },
  {
    path: "/zones/10/k-arcade/main",
    name: "K-Arcade Main",
    exact: true,
    element: KArcadeMain,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    isAnonymous: false,
  },
  {
    path: "/zones/10/k-arcade/audio/form",
    name: "K-Arcade Audio Form",
    exact: true,
    element: KArcadeAudioInForm,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
];

const test = [
  {
    path: "/test",
    name: "Test",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured2",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
];
const trainingUnitRoutes = [
  {
    path: "/trainingUnits/create",
    name: "/trainingUnits/create",
    element: AddTraningUnits,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/trainingUnits/OrgList",
    name: "Organization List",
    element: TrainingUnitsOrgList,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/trainingunit/:id/edit",
    name: "/trainingunit/:id/edit",
    element: AddTraningUnits,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "trainingunits/calendar",
    name: "Training Calendar",
    element: TrainingScheduleCalendar,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
];

const traineeAccountsComponents = [
  {
    path: "/transit",
    name: "DisplayZone",
    element: DisplayZone,
    roles: ["Trainee", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/trainee/accounts",
    name: "TraineeAccounts",
    element: TraineeAccounts,
    roles: ["OrgAdmin", "Super"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/zones/:id/register",
    name: "ZoneRegister",
    exact: true,
    element: ZoneRegister,
    roles: ["OrgAdmin", "OrgTrainee", "Trainee", "Super","SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/zones/:id/logins",
    name: "TraineeAccountLogin",
    exact: true,
    element: ZoneLogin, 
    roles: ["OrgAdmin", "OrgTrainee", "Trainee"],
    isAnonymous: false, 
  },
  {
    path: "/zones/:id/entry",
    name: "Zone Entry Point",
    exact: true,
    element: ZoneEntry,
    roles: ["OrgAdmin", "OrgTrainee", "Trainee", "Super", "SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/zones/register",
    name: "TraineeAccountsForm",
    exact: true,
    element: TraineeAccountForm,
    roles: ["OrgAdmin", "OrgTrainee", "SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/trainee/account/edit",
    name: "TraineeAccountEdit",
    exact: true,
    element: TraineeAccountEdit,
    roles: ["Trainee"],
    isAnonymous: false,
  },
  {
    path: "/zones/:id/login",
    name: "TraineeAccountLogin",
    exact: true,
    element: TraineeAccountLogin,
    roles: ["OrgAdmin", "OrgTrainee", "Trainee", "Super"],
    isAnonymous: false,
  },
];

const stripeCheckout = [
  {
    path: "/checkout",
    name: "checkout",
    exact: true,
    element: Checkout,
    roles: ["Customer", "OrgAdmin", "SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/success",
    name: "BeforeSuccess",
    exact: true,
    element: BeforeSuccess,
    roles: ["Customer", "OrgAdmin", "SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/invoice",
    name: "CheckoutSuccess",
    exact: true,
    element: CheckoutSuccess,
    roles: ["Customer", "OrgAdmin", "SysAdmin"],
    isAnonymous: false,
  },
];

const zoneConfiguration = [
  {
    path: "/addzoneconfig",
    element: Zone,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/editzoneconfig/:id",
    element: Zone,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/viewthreats",
    element: viewThreats,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "viewthreats/zone/config/table",
    element: ZoneTable,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/zone/config/speed",
    element: SearchBySpeedId,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/zone/config/spread",
    element: SearchBySpreadId,
    roles: ["OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
];

const blogApproval = [
  {
    path: "/blogsapproval",
    name: "Blogs",
    exact: true,
    element: Blogs,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
];

const PseudoAds = lazy(() => import("../components/fakeads/PseudoAds.jsx"));
const PseudoAdsForm = lazy(() => import("../components/fakeads/PseudoAdsForm"));
const PseudoAdsView = lazy(() => import("../components/fakeads/PseudoAdsView"));

const pseudoAds = [
  {
    path: "/pseudoads",
    name: "PseudoAds",
    exact: true,
    element: PseudoAds,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/pseudoads/new",
    name: "CreatePseudoAd",
    element: PseudoAdsForm,
    exact: true,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/pseudoads/:adId",
    name: "UpdatedPseudoAd",
    element: PseudoAdsForm,
    exact: true,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/pseudoads/view",
    name: "PseudoAdsView",
    element: PseudoAdsView,
    exact: true,
    roles: ["Trainee", "OrgTrainer", "OrgAdmin", "SysAdmin"],
    isAnonymous: false,
  },
];

const zoneGroups = [
  {
    path: "/zonegroups/add",
    name: "AddZoneGroupsForm",
    element: AddZoneGroup,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/zone/zonegroupsview",
    name: "ZoneGroupsView",
    element: ZoneGroupsView,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/zonegroupview/summary",
    name: "ZoneGroupSummary",
    element: ZoneGroupSummary,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/zonegroupview/overview",
    name: "ZoneGroupOverview",
    element: ZoneGroupOverview,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/zonegroupview/team",
    name: "ZoneGroupTeam",
    element: ZoneGroupTeam,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
];

const userSettings = [
  {
    path: "/usersettings",
    element: UserProfileLayout,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer", "Customer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/usersettings/subscription",
    element: SubscriptionDashboard,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer", "Customer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/usersettings/edit-profile",
    element: UserSettings,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer", "Customer"],
    exact: true,
    isAnonymous: false,
  },
];

const addFaqs = [
  {
    path: "/addfaqsform",
    name: "FAQS",
    exact: true,
    element: AddFaqs,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
];

const locationFormsRoute = [
  {
    path: "/locationform",
    name: "LocationForm",
    element: LocationForms,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/locationslist",
    name: "LocationsList",
    element: LocationsList,
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
    exact: true,
    isAnonymous: false,
  },
];

const TrainingScheduleRoutes = [
  {
    path: "/trainingscheduleform",
    name: "trainingScheduleForm",
    element: TrainingSchedule,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: false,
    isAnonymous: false,
  },
  {
    path: "/trainingscheduleform/:id",
    name: "trainingScheduleForm",
    element: TrainingSchedule,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: false,
    isAnonymous: false,
  },
];

const surveyRoutes = [
  {
    path: "/surveys",
    name: "Surveys",
    element: Surveys,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/surveys/:id",
    name: "Survey",
    element: SurveyForm,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/surveys/builder",
    name: "SurveyBuilder",
    element: SurveyBuilder,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/surveys/builder/surveyformbuilder",
    name: "SurveyFormBuilder",
    element: SurveyFormBuilder,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/surveys/builder/:id",
    name: "SurveyBuilder",
    element: SurveyBuilder,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/surveys/instances",
    name: "SurveyInstance",
    exact: true,
    element: SurveyInstance,
    roles: ["SysAdmin", "OrgAdmin"],
    isAnonymous: false,
  },
  {
    path: "/surveys/instances/:instanceId/details",
    name: "SurveyInstanceDetailsCard",
    exact: true,
    element: SurveyInstanceDetailsCard,
    roles: ["SysAdmin", "OrgAdmin"],
    isAnonymous: false,
  },
  {
    path: "/survey",
    name: "Take Survey",
    element: Survey,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  }
];

const checkers = [
  {
    path: "/zones/9/checkers",
    name: "Checkers",
    element: Checkers,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const newsLetterSubscriptionRoutes = [
  {
    path: "/newsletters/subscribersview",
    name: "SurveyInstance",
    exact: true,
    element: NewsletterSubsciptionList,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/newsletters/subscribersview/chart",
    name: "SurveyInstance",
    exact: true,
    element: NewsletterChart,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
];

const allRoutes = [
  ...avatarAws,
  ...accessLogs,
  ...blogApproval,
  ...pseudoAds,
  ...actors,
  ...blogs,
  ...consequenceRoutes,
  ...cronjobs,
  ...dashboardRoutes,
  ...test,
  ...errorRoutes,
  ...organizations,
  ...traineeAccountsComponents,
  ...zoneConfiguration,
  ...zoneGroups,
  ...zoneRoutes,
  ...trainingUnitRoutes,
  ...trainees,
  ...employeesRoute,
  ...instructors,
  ...TrainingScheduleRoutes,
  ...rescueCenter,
  ...actorAccounts,
  ...comments,
  ...userSettings,
  ...locationFormsRoute,
  ...stripeCheckout,
  ...addFaqs,
  ...eventRoutes,
  ...reportRoutes,
  ...actorWizard,
  ...traineeRoutes,
  ...siteReferenceRoutes,
  ...checkers,
  ...surveyRoutes,
  ...newsLetterSubscriptionRoutes,
  ...taskEventsRoutes,
];
export default allRoutes;