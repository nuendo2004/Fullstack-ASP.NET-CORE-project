import { v4 as uuid } from "uuid";

export const MostAskedFAQs = [
  {
    id: uuid(),
    title: "What is Immersed",
    content: `Fill in Later`,
  },
  {
    id: uuid(),
    title: "Who can use Immersed",
    content: `Anyone`,
  },
  {
    id: uuid(),
    title: "How much time I will need to learn this app?",
    content: `However much time you put into it`,
  },
  {
    id: uuid(),
    title: "Are there any free tutorials available?",
    content: `Of course`,
  },
  {
    id: uuid(),
    title: "Is there a month-to-month payment option?",
    content: `You bet ya`,
  },
];

export const GeneralInquiriesFAQs = [
  {
    id: uuid(),
    title: "Is there a 14-days trial?",
    content: `7 day Trial`,
  },
  {
    id: uuid(),
    title: "What’s the benefits of the Premium Membership?",
    content: `More Savings`,
  },
  {
    id: uuid(),
    title: "How much time I will need to learn this app?",
    content: `It depends but for most 2 weeks is the average`,
  },
  {
    id: uuid(),
    title: "Are there any free tutorials available?",
    content: `Yes there are`,
  },
];

export const SupportFAQs = [
  {
    id: uuid(),
    title: "Are there any free tutorials available?",
    content: `Yes there are`,
  },
  {
    id: uuid(),
    title: "Is there a month-to-month payment option?",
    content: `There are multiple payment options including month to month`,
  },
];

export const HelpCenterFAQsData = [
  MostAskedFAQs,
  GeneralInquiriesFAQs,
  SupportFAQs,
];
export default HelpCenterFAQsData;
