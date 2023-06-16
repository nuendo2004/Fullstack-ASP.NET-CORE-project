import React from "react";
import { v4 as uuid } from "uuid";
import { HelpCircle, Book, LifeBuoy } from "react-feather";

export const securityTipsData = [
  {
    id: 1,
    title: "Use Strong and Unique Passwords",
    content: `There are millions of stolen usernames and passwords sold by cybercriminals 
        on the dark web. Weak passwords can be guessed or cracked in milliseconds, exposing your students’ 
        sensitive data. A password manager is an app that generates uncrackable passwords and auto-fills 
        them whenever you need them. Many password keepers will store any credentials in an encrypted vault, 
        which only you can access.`,
  },
  {
    id: 2,
    title: "Avoid Phising Scams",
    content: `Student databases are a goldmine of personal student information. A phishing scam relies 
        on a staff member being tricked into replying or clicking on a link in a bogus email or text message 
        to spread malware, steal credentials, or worse. Cybercriminals have used student emails to apply for
        fraudulent loans, steal identities, and infect entire networks, crashing them completely.`,
  },
  {
    id: 3,
    title: "Don't Share Personal Information",
    content: `Don’t share personal information or at least be aware of exactly who might read 
        (or ultimately ‘find out’) about what. It doesn’t take much of an information breach–an email
        address with a weak password or your full name and address–to enable someone willing to use a 
        little deductive reasoning and internet search skills to create a threat to your identity, financial 
        security, and more.`,
  },
  {
    id: 4,
    title: "Consider a Password Manager",
    content: `Password managers eliminate the need to remember incredibly complex strings of characters, 
    and they keep your online accounts safe. If you feel you might lock yourself out of the password manager
    if you forget the master password, consider opting for a passwordless login solution such as LastPass.
    By going passwordless, you can get into your password vault using a mobile authenticator or biometric
    methods, such as a fingerprint or face scan. `,
  },
  {
    id: 5,
    title: "Are you using HTTPS?",
    content: `When you’re on a website that isn’t using HTTPS, there’s no guarantee that the transfer of 
    information between you and the site’s server is secure. Double-check that a site’s using HTTPS before 
    you give away personal or private information.`,
  },
  {
    id: 6,
    title: "Enable 2-Factor Authentication",
    content: `Many platforms now allow you to enable 2-factor authentication to keep your accounts more secure. 
    It’s another layer of protection that helps verify that it’s actually you who is accessing your account and 
    not someone who’s unauthorized. Enable this security feature when you can.`,
  },
  {
    id: 7,
    title: "Avoid Suspicious Emails",
    content: `If an email looks suspicious, don’t open it because it might be a phishing scam.
    Someone might be impersonating another individual or company to gain access to your personal information.
    Sometimes the emails may also include attachments or links that can infect your devices.`,
  },
  {
    id: 8,
    title: "Check Links Before You Click",
    content: `Links can easily be disguised as something they’re not so it’s best to double check before you 
    click on a hyperlink. On most browsers, you can see the target URL by hovering over the link. Do this to 
    check links before you click on them.`,
  },
  {
    id: 9,
    title: "Be Careful with Bluetooth",
    content: `Devices can be hacked via Bluetooth and subsequently your private information can be stolen. 
    If there’s no reason to have your Bluetooth on, turn it off!`,
  },
  {
    id: 10,
    title: "Don’t Store Important Information in Non-Secure Places",
    content: `When storing information online, you want to keep it in a location that can’t be accessed by unauthorized 
    users.`,
  },
];

export const overviewFeaturesData = [
  {
    id: uuid(),
    icon: <HelpCircle size="40" strokeWidth="1.5" className="text-primary" />,
    title: "Helpful Tips",
    link: "/zones/rescuecenter/securitytips",
    description:
      "Access helpful cyber security tips to help you learn about possible security issues you might have to encouter",
    linkname: "Access Tips",
  },
  {
    id: uuid(),
    icon: <Book size="40" strokeWidth="1.5" className="text-primary" />,
    title: "Reporting",
    link: "/zones/rescuecenter/securityreport",
    description:
      "Access a form to input information with a security event experience in a zone for your organization trainer to view.",
    linkname: "Make a Report",
  },
  {
    id: uuid(),
    icon: <LifeBuoy size="40" strokeWidth="1.5" className="text-primary" />,
    title: "Account Recovery",
    link: "/zones/rescuecenter/accountrecovery",
    description:
      "Come here if you need to recover your account. Make sure you know your current account infomation as it will be needed",
    linkname: "Recover Account",
  },
];

const createPasswordArticleContent = `<h3>If you are going to be using the web it is crucial that you set up secure passwords to protect yourself</h3>
<br/><div>
<h2>Creating strong passwords</h2>
<p>You'll need to create a password to do just about everything on the Web, from checking your email to online banking. 
And while it's simpler to use a short, easy-to-remember password, this can also pose serious risks to your online security. To protect yourself and your information,
you'll want to use passwords that are long, strong, and difficult for someone else to guess while still keeping them relatively easy for you to remember.</p>
<br/><div><h3>Why do I need a strong password?</h3>
<p>At this point, you may be wondering, why do I even need a strong password anyway? The truth is that even though most websites are secure, there's always a small
chance someone may try to access or steal your information. This is commonly known as hacking. A strong password is one of the best ways to defend your accounts and
private information from hackers.</p></div>
<img src="https://comptroller.texas.gov/economy/fiscal-notes/2022/jan/images/cybersecurity-hero.jpg" alt="404" style="width:100%"/> </div><br/><div >
<h4>Tips for creating strong passwords</h4>
<p>A strong password is one that's easy for you to remember but difficult for others to guess. Let's take a look at some of the most important things to consider
when creating a password.</p></div>
<br/>
<div>
<ol style="padding-left:15px;">
<li>Never use personal information such as your name, birthday, user name, or email address. This type of information is often publicly available, which makes it easier for someone to guess your password.</li>
<li>Use a longer password. Your password should be at least six characters long, although for extra security it should be even longer.</li>
<li>Don't use the same password for each account. If someone discovers your password for one account, all of your other accounts will be vulnerable.</li>
<li>Try to include numbers, symbols, and both uppercase and lowercase letters.</li>
<li>Avoid using words that can be found in the dictionary. For example, swimming1 would be a weak password.</li>
<li>Random passwords are the strongest. If you're having trouble creating one, you can use a password generator instead.</li>
</ol>
</div>
<br/>
<div>
<h4>Common password mistakes</h4>
<p>Some of the most commonly used passwords are based on family names, hobbies, or just a simple pattern. While these types of passwords are easy to remember,
they're also some of the least secure. Let's take a look at some of the most common password mistakes and how to fix them</p>
<p>For example the password "brian12kate5".  This password uses too much personal information, along with common words that could be found in the dictionary.</p>
<p>A stronger version of this password would use symbols, uppercase letters, and a more random order. And rather than using family names, we could combine a 
character from a movie with a type of food. For example, Chewbacca and pizza could become chEwbAccAp!ZZa.</p>
</div><br/>`;

const phisingArticleContent = `<h3>Internet pirates steal personal information with a new a type of Internet piracy called phishing, pronounced "fishing," 
and that's exactly what these thieves are doing: "fishing" for your personal information.</h3>
<br/><div>
<h2>What is Phishing?</h2>
<p>Phishing occurs when a person sends a fake text, email, or pop-up message to get people to share their personal information, 
passwords, or financial information. Once they have this information, these criminals use the information gathered to commit 
identity theft or to steal money.</p>
<p>"Usually, the individual trying to obtain the information is doing so under the illusion of a legitimate need," explains Brian Sampsel,
vice president of analytics for a cybersecurity firm in Columbus, Ohio and father of two. "They try to look like they are from a reputable
organization—maybe even one you have a relationship with. This could be someone requesting a bank account number, or wanting to know your
physical address, or asking for a password that you would know."</p>
<br/><div><h3>How to Recognize Phishing and Online Scams?</h3>
<p>When it comes to recognizing a phishing email or online scam, it takes practice and knowing what you are looking for. 
To start, remind yourself and your kids that legitimate organizations won’t call, email, or text to ask for your personal 
information, like a Social Security number, account number, or credit card number.</p>
<p>If you or your child receive an email or message that you didn’t expect, especially if it is offering you something valuable, 
you should ignore it, suggests Sampsel. If you aren’t expecting an email from your bank, but it looks like they sent you one, 
then it probably isn’t from them and you should just delete the email.</p>
</div>
<img src="https://media.istockphoto.com/photos/digital-cyberspace-with-particles-and-digital-data-network-high-picture-id1302189748?b=1&k=20&m=1302189748&s=170667a&w=0&h=s0o2dhTh40lrWLPt6rg54S0jCUywkr6h04rDdfStMq8=" alt="404" style="width:100%"/> </div><br/><div >
<h4>Red Flags to Watch Out For</h4>
<p>Keep an eye out for any of these items as they might be a sign of a phising attack attempt.</p></div>
<br/>
<div>
<ul style="padding-left:15px;">
<li>Uses threatening or urgent language</li>
<li>Urges you to respond right away</li>
<li>Requests private or personal information</li>
<li>Asks you to update your account information</li>
<li>Makes threats like closing your account</li>
<li>Contains suspicious attachments</li>
<li>Urges you to click on a link</li>
<li>Appears too good to be true</li>
<li>Contains information you weren't expecting</li>
</ul>
</div>
<br/>
<div>
<h4>Safeguards to Try</h4>
<p>Cybersecurity experts like Sampsel and Horn also advise parents to look for "teachable moments," so if you get a phishing message, 
show it to your kids. Seeing an actual phishing message or email can help your kids recognize potential online scams and help them 
understand that the messages or emails they receive aren't always what they seem. </p>
<p>"There also are a number of sites that evaluate apps and other types of media for appropriateness," Sampsel adds. "If one of our 
children wants to download something and we haven’t heard of it, we check one of these. Common Sense Media is one. Plugged In is another."</p>
<p>Make sure you also talk to your kids about protecting their personal information. They should not share passwords, account information, 
their address, or their birthday. Tell them to also watch out for free stuff like free games, ring tones, and even online surveys, and advise 
them not to download anything until they have either talked to you or know that it is from a trusted source.</p>
</div><br/>`;

const recoverAccountArticleContent = `<h3>Did you get locked out your account while completing a training exercise? You may be able to 
recover it. You will need to know your current account infomration</h3>
<br/><div>
<h2>What Happened?</h2>
<p>Take note of what happened to get your account locked. Training exercises here are designed to simiulate cyber security attacks.
If you where in an exercise and now you are having issues you most likely did something in that exercise that led to this. It
is important to take note of this</p>
<p>It is always good to learn from mistakes. Many issues like this are great for learning from those mistakes so that they
don't happen to you again. You will most likely have to face a similar situation so if you can point out what exactly happened
it will be easier to spot next time around</p>
<br/><div><h3>What Steps to Take Next</h3>
<p>What you are going to want to do next is make sure you know your current information, as you will need this to recover you account.
Next while already on the Rescue Center, you can then travel to the Recover My Account tab. This tab will open up a form to input 
you information. Make sure to select your correct username, and zone where this occured. From there you will be asked to confirm
your current information.</p>
<p>If you successfully input your information along with a new password then your account will be reset. Without succesfully inputting
your current information you will be unable to recover your account. So you do not know your account information, please contact your
org trainer to help you get a new account.</p>
</div>
<img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" alt="404" style="width:100%"/> </div><br/><div >
<h4>Thing to Remember</h4>
<p>These are good tips to remember about your account on this platform</p></div>
<br/>
<div>
<ul style="padding-left:15px;">
<li>You should still be careful to avoid security threats</li>
<li>You don't want to relay on recover my account all the time</li>
<li>It is best to learn from the mistakes that got you here</li>
<li>Make sure you always remember you credentials</li>
<li>Make sure your new password is secure and unique</li>
<li>Do not give your credentials out as they will then be able to reset your account</li>
</ul>
</div>
<br/>
<div>`;

export const createPassword = {
  title: "How to Create a Secure Password",
  content: createPasswordArticleContent,
};
export const phishingAttack = {
  title: "How to Avoid a Phising Attack",
  content: phisingArticleContent,
};
export const recoverAccount = {
  title: "How Recover Your Acount",
  content: recoverAccountArticleContent,
};

export const rescueCenterData = [
  securityTipsData,
  overviewFeaturesData,
  createPassword,
  phishingAttack,
  recoverAccount,
];
export default rescueCenterData;
