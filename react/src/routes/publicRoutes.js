import { lazy } from "react";

const PrivacyPolicy = lazy(() => import("components/privpolicy/PrivacyPolicy"));

const Organizations = lazy(() =>
  import("../components/organizations/Organizations")
);
const AboutPage = lazy(() => import("../components/teammembers/AboutPage"));

const Landing = lazy(() => import("../components/landing/Landing"));

const PageNotFound = lazy(() => import("../components/error/Error404"));

const SignUp = lazy(() => import("../components/authentication/SignUp"));

const SignIn = lazy(() => import("../components/authentication/SignIn"));

const ForgotPassword = lazy(() =>
  import("../components/authentication/ForgotPassword")
);

const ChangePassword = lazy(() =>
  import("../components/authentication/ChangePassword")
);

const InviteMembers = lazy(() =>
  import("../components/invitemembers/InviteMembers")
);
const Subscription = lazy(() =>
  import("../components/subscriptions/Subscription")
);

const Podcasts = lazy(() => import("../components/podcasts/Podcasts"));
const PodForm = lazy(() => import("../components/podcasts/PodForm"));
const CookiePolicy = lazy(() => import("components/cookiepolicy/CookiePolicy"));
const ContactUs = lazy(() => import("../components/contactus/ContactUsForm"));
const EmailConfirmation = lazy(() =>
  import("../components/authentication/EmailConfirmation")
);
const BlogPage = lazy(() => import("../components/blogs/BlogsArticleData"));
const Faqs = lazy(() => import("../components/faqs/AllFAQsList"));
const Stories = lazy(() => import("../components/sharedstories/Stories"));
const Story = lazy(() => import("../components/sharedstories/Story"));

const BlogPageList = lazy(() => import("../components/blogs/Blogs"));

const StoryForm = lazy(() => import("../components/sharedstories/StoryForm"));

const Ratings = lazy(() => import("../components/ratings/Ratings"));

const NewsletterTemplatesList = lazy(() =>
  import("../components/newsletters/NewsletterTemplatesList")
);
const Newsletters = lazy(() => import("../components/newsletters/Newsletters"));
const NewslettersUnsubscribe = lazy(() =>
  import("../components/newsletters/NewsletterUnsubscribe")
);

const TraineesLink = lazy(() =>
  import("../components/authentication/TraineesLink")
);

const Chat = lazy(() => import("../components/chat/ChatParentExample"));

const PhishingEmail = lazy(() =>
  import("../components/authentication/PhishingEmail")
);

const FileManager = lazy(() => import("../components/filemanager/FileManager"));

const routes = [
  {
    path: "/fileManager",
    name: "File Manager",
    exact: true,
    element: FileManager,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/ratings",
    name: "Ratings",
    exact: true,
    element: Ratings,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/newsletters",
    name: "Newsletters",
    exact: true,
    element: Newsletters,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/newsletters/unsubscribe",
    name: "Newsletters",
    exact: true,
    element: NewslettersUnsubscribe,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/newslettertemplateslist",
    name: "NewsletterTemplatesList",
    exact: true,
    element: NewsletterTemplatesList,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/newslettertemplateslist",
    name: "NewsletterTemplatesList",
    exact: true,
    element: NewsletterTemplatesList,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/",
    name: "Landing",
    exact: true,
    element: Landing,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/signup",
    name: "Sign Up",
    exact: true,
    element: SignUp,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/signin",
    name: "Sign In",
    exact: true,
    element: SignIn,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/changepassword",
    name: "Change Password",
    exact: true,
    element: ChangePassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/authentication/forget-password",
    name: "Forgot Password",
    exact: true,
    element: ForgotPassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/invitemembers/signup",
    name: "Invite Members",
    exact: true,
    element: InviteMembers,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/privpolicy",
    name: "Privacy Policy",
    exact: true,
    element: PrivacyPolicy,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/contact",
    name: "Contact Us",
    exact: true,
    element: ContactUs,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/cookiepolicy",
    name: "Cookie Policy",
    exact: true,
    element: CookiePolicy,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/podcasts",
    name: "Podcasts",
    exact: true,
    element: Podcasts,
    roles: [],
    isAnonymous: true,
  },

  {
    path: "/podcasts/new",
    name: "PodForm",
    exact: true,
    element: PodForm,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/podcasts/edit/:id",
    name: "PodForm",
    exact: true,
    element: PodForm,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/subscription",
    name: "Subscription",
    exact: true,
    element: Subscription,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/faq",
    name: "FAQs",
    exact: true,
    element: Faqs,
    roles: [],
    isAnonymous: true,
  },

  {
    path: "/blogs/:id",
    name: "Blog Article",
    exact: true,
    element: BlogPage,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/blogs",
    name: "Blogs",
    exact: true,
    element: BlogPageList,
    roles: [],
    isAnonymous: true,
  },

  {
    path: "/confirm",
    name: "Email Confirmation",
    exact: false,
    element: EmailConfirmation,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/aboutpage",
    name: "AboutPage",
    exact: true,
    element: AboutPage,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/phishing",
    name: "Phishing Email",
    exact: false,
    element: PhishingEmail,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/chat",
    name: "Chat",
    exact: true,
    element: Chat,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/trainee/confirm",
    name: "Trainee Confirmated",
    exact: false,
    element: PhishingEmail,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/organizations",
    name: "Organizations",
    exact: true,
    element: Organizations,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/trainees/link",
    name: "traineeslink",
    element: TraineesLink,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

const sharedStoriesRoute = [
  {
    path: "/sharedstories",
    name: "Stories",
    exact: true,
    element: Stories,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/sharedstories/:storyId",
    name: "Story",
    exact: true,
    element: Story,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/sharedstories/create",
    name: "StoryForm",
    element: StoryForm,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: "/sharedstories/edit/:id",
    name: "StoryForm",
    element: StoryForm,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

var allRoutes = [...routes, ...errorRoutes, ...sharedStoriesRoute];

export default allRoutes;
