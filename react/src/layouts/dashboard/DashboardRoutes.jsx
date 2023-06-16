import { v4 as uuid } from "uuid";
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 * 				: Object - Icon as an object added from v1.4.0.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "screen",
    children: [
      {
        id: uuid(),
        link: "/dashboard/overview",
        name: "Overview",
        roles: ["SysAdmin"],
      },
      {
        id: uuid(),
        link: "/dashboard/analytics",
        name: "Analytics",
        roles: ["SysAdmin", "OrgAdmin"],
      },
      {
        id: uuid(),
        link: "/dashboard/analytics/internal",
        name: "Internal Analytics",
        roles: ["SysAdmin"],
      },
      {
        id: uuid(),
        link: "/dashboard/analytics/google",
        name: "Google Analytics",
        roles: ["SysAdmin", "admin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Reports",
    icon: "book",
    link: "/reports",
    roles: ["OrgAdmin", "OrgTrainer"],
  },
  {
    id: uuid(),
    title: "Instructors",
    icon: "book",
    children: [
      {
        id: uuid(),
        link: "/instructors",
        roles: ["OrgAdmin", "OrgTrainer"],
        name: "Trainee access link",
      },
    ],
  },
  {
    id: uuid(),
    title: "Actors",
    icon: "book",
    children: [
      { id: uuid(), link: "/actors", roles: ["SysAdmin"], name: "All Actors" },
      {
        id: uuid(),
        link: "/actors/add",
        roles: ["SysAdmin"],
        name: "Add Actors",
      },
    ],
  },
  {
    id: uuid(),
    title: "Rescue Center",
    icon: "book-open",
    link: "/zones/rescuecenter",
    roles: ["Trainee", "OrgAdmin", "OrgTrainer"],
  },
  {
    id: uuid(),
    title: "Trainees",
    icon: "file",
    children: [
      {
        id: uuid(),
        link: "/trainees",
        roles: ["OrgAdmin", "OrgTrainer"],
        name: "View All Trainees",
      },
      {
        id: uuid(),
        link: "/trainees/form",
        roles: ["OrgAdmin", "OrgTrainer"],
        name: "Add a Trainee",
      },
      {
        id: uuid(),
        link: "/trainees/activity",
        roles: ["OrgAdmin", "OrgTrainer"],
        name: "Activity",
      },
    ],
  },
  {
    id: uuid(),
    title: "Avatar Upload Utility",
    icon: "file",
    link: "/avatar/add",
    roles: ["SysSupport"],
  },
  {
    id: uuid(),
    title: "Employees",
    icon: "file",
    children: [
      {
        id: uuid(),
        link: "/organization/:id/employees",
        roles: ["OrgAdmin"],
        name: "View All Employees",
      },
      {
        id: uuid(),
        link: "/organization/:id/employees/add",
        roles: ["OrgAdmin"],
        name: "Add an Employee",
      },
      {
        id: uuid(),
        link: "/organization/:id/employees/invitemember",
        roles: ["OrgAdmin"],
        name: "Invite New Employee",
      },
    ],
  },
  {
    id: uuid(),
    title: "Shared Stories",
    icon: "layout",
    children: [
      {
        id: uuid(),
        link: "/sharedstories",
        roles: ["Customer", "SysAdmin"],
        name: "All Stories",
      },
      {
        id: uuid(),
        link: "/sharedstories/create",
        roles: ["Customer", "SysAdmin"],
        name: "Share Your Story",
      },
    ],
  },
  {
    id: uuid(),
    title: "Surveys",
    icon: "book",
    children: [
      {
        id: uuid(),
        link: "/surveys",
        roles: ["SysAdmin", "OrgAdmin", "Trainee"],
        name: "All Surveys",
      },
      {
        id: uuid(),
        link: "/surveys/builder",
        roles: ["SysAdmin", "OrgAdmin"],
        name: "Builder",
      },
      {
        id: uuid(),
        link: "/surveys/instances",
        roles: ["SysAdmin", "OrgAdmin"],
        name: "Survey Instances",
      },
      {
        id: uuid(),
        link: "/surveys/responses",
        roles: ["SysAdmin"],
        name: "Responses",
      },
      {
        id: uuid(),
        link: "/surveys/analytics",
        roles: ["SysAdmin"],
        name: "Analytics",
      },
      // This is a temporary placement for taking survey.
      // Since the actual location of taking survey is not done yet.
      {
        id: uuid(),
        link: "/survey",
        roles: ["SysAdmin", "OrgAdmin", "Trainee"],
        name: "Take Survey",
      },
    ],
  },
  {
    id: uuid(),
    title: "AccessLogs",
    link: "/accesslogs",
    roles: ["SysAdmin"],
  },
  {
    id: uuid(),
    title: "Organizations",
    icon: "book",
    link: "/organizations",
    roles: ["SysAdmin", "OrgAdmin"],
  },
  {
    id: uuid(),
    title: "Blogs",
    icon: "book",
    children: [
      {
        id: uuid(),
        link: "/blogs",
        name: "View All Blogs",
        roles: [
          "Trainee",
          "SysAdmin",
          "Customer",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
      {
        id: uuid(),
        link: "/blogs/add",
        name: "Add a Blog",
        roles: [
          "Trainee",
          "SysAdmin",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
      {
        id: uuid(),
        link: "/blogsapproval",
        roles: ["SysAdmin"],
        name: "Blogs Approval",
      },
    ],
  },
  {
    id: uuid(),
    title: "Newsletters",
    icon: "file-text",
    children: [
      {
        id: uuid(),
        link: "/newsletters",
        name: "View All Newsletters",
        roles: [
          "SysAdmin",
          "Customer",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "NewsLetter Subscribers",
    icon: "book",
    children: [
      {
        id: uuid(),
        link: "/newsletters/unsubscribe",
        name: "Unsubscribe Form",
      },
      {
        id: uuid(),
        link: "/newsletters/subscribersview",
        name: "Subscriber list",
        roles: ["SysAdmin"],
      },
      {
        id: uuid(),
        link: "/newsletters/subscribersview/chart",
        name: "Subscribers Chart",
        roles: ["SysAdmin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Zones",
    icon: "book",
    children: [
      {
        id: uuid(),
        link: "/transit",
        name: "Transit",
        roles: [
          "Trainee",
          "SysAdmin",
          "Customer",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
      {
        id: uuid(),
        link: "/zones/7/menutic",
        name: "Tic Tac Toe",
        roles: [
          "Trainee",
          "SysAdmin",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
      {
        id: uuid(),
        link: "/zones/11/menutic",
        name: "Hack Tac Toe",
        roles: [
          "Trainee",
          "SysAdmin",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
      {
        id: uuid(),
        link: "/zones/9/checkers",
        name: "Checkers",
        roles: [
          "Trainee",
          "SysAdmin",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
      {
        id: uuid(),
        link: "/zones/rescuecenter",
        name: "Rescue Center",
        roles: [
          "Trainee",
          "SysAdmin",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
      {
        id: uuid(),
        link: "/zones/add",
        name: "Add a Zone",
        roles: ["SysAdmin", "OrgAdmin"],
      },
      {
        id: uuid(),
        link: "/zones/tokens/qrgenerator",
        name: "Qr Generator",
        roles: ["SysAdmin", "OrgAdmin", "OrgTrainer", "TrainingUnitAdmin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Consequences",
    icon: "book",
    children: [
      {
        id: uuid(),
        link: "/consequences",
        name: "View All",
        roles: [
          "SysAdmin",
          "OrgAdmin",
          "OrgReports",
          "TrainingUnitAdmin",
          "OrgTrainer",
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "Ads Management",
    icon: "book",
    children: [
      {
        id: uuid(),
        link: "/pseudoads",
        name: "Fake Ads",
        roles: ["SysAdmin", "OrgAdmin"],
      },
      {
        id: uuid(),
        link: "/sitereferencesummary",
        name: "Site Reference Summary",
        roles: ["SysAdmin", "OrgAdmin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Training Unit",
    icon: "settings",
    children: [
      {
        id: uuid(),
        link: "/trainingUnits/OrgList",
        name: "View All",
        roles: ["OrgAdmin", "OrgTrainer"],
      },
      {
        id: uuid(),
        link: "/trainingUnits/create",
        name: "Add a Training Unit",
        roles: ["OrgAdmin", "OrgTrainer"],
      },
      {
        id: uuid(),
        link: "/trainingunits/calendar",
        name: "Training Schedule Calendar",
        roles: ["SysAdmin", "OrgAdmin"],
      },
      {
        id: uuid(),
        link: "/taskevents/add",
        name: "Add a Task Event",
        roles: ["OrgAdmin", "SysAdmin"],
      },
      {
        id: uuid(),
        link: "/taskevents/view",
        name: "View Task Events",
        roles: ["OrgAdmin", "SysAdmin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "Trainee Accounts",
    icon: "settings",
    children: [
      {
        id: uuid(),
        link: "/trainee/accounts",
        roles: ["OrgAdmin"],
        name: "View All Accounts",
      },
      {
        id: uuid(),
        link: "/trainee/account/add",
        roles: ["OrgAdmin", "OrgTrainee", "Trainee"],
        name: "Add an Account",
      },
    ],
  },
  {
    id: uuid(),
    title: "Zone Configuration",
    icon: "settings",
    children: [
      {
        id: uuid(),
        link: "/addzoneconfig",
        roles: ["OrgAdmin", "OrgTrainer"],
        name: "Zone Config",
      },
      {
        id: uuid(),
        link: "/viewthreats",
        roles: ["OrgAdmin", "OrgTrainer"],
        name: "View Threats",
      },
    ],
  },
  {
    id: uuid(),
    title: "Zone Groups",
    icon: "git-pull-request",
    children: [
      {
        id: uuid(),
        link: "/zonegroups/zonegroupsview",
        roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
        name: "View All Zone Groups",
      },
      {
        id: uuid(),
        link: "/zonegroups/add",
        roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer"],
        name: "Add a Zone Group",
      },
    ],
  },
  {
    id: uuid(),
    title: "Job Scheduler",
    icon: "book",
    children: [
      {
        id: uuid(),
        link: "/cronjobs",
        name: "View All Jobs",
        roles: ["SysAdmin"],
      },
      {
        id: uuid(),
        link: "/cronjobs/add",
        name: "Add a Job",
        roles: ["SysAdmin"],
      },
    ],
  },
  {
    id: uuid(),
    title: "File Manager",
    link: "/fileManager",
    icon: "settings",
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer", "Customer"],
  },
  {
    id: uuid(),
    title: "User Settings",
    link: "/usersettings",
    icon: "settings",
    roles: ["SysAdmin", "Trainee", "OrgAdmin", "OrgTrainer", "Customer"],
  },
];

export default DashboardMenu;
