// Components
import Banner from '../templates/components/Banner';
// Pages
import Basic from '../templates/pages/Basic';
import Search from '../templates/pages/Search';
import Blog from '../templates/pages/Blog';
import BlogTeaser from '../templates/components/BlogTeaser';
import BusinessCard from '../templates/components/BusinessCard';
import Card from '../templates/components/Card';
import Carousel from '../templates/components/Carousel';
import Category from '../templates/pages/Category';
import Columns from '../templates/components/Columns';
import ConversationalForm from '../templates/pages/ConversationalForm';
import CrossSelling from '../templates/components/CrossSelling';
import EventTeaser from '../templates/components/EventTeaser';
import Form from '../templates/components/Form';
import Home from '../templates/pages/Home';
import Login from '../templates/pages/Login';
import ManagedCampaign from '../templates/components/ManagedCampaign';
import ManagedCampaignPage from '../templates/pages/ManagedCampaign';
import Map from '../templates/components/Map';
import PageLink from '../templates/components/PageLink';
import Portal from '../templates/pages/Portal';
import Post from '../templates/pages/Post';
import Profile from '../templates/pages/Profile';
import Quote from '../templates/components/Quote';
import Section from '../templates/components/Section';
import StoryTeaser from '../templates/components/StoryTeaser';
import Table from '../templates/components/Table';
import TextImage from '../templates/components/TextImage';
import BannerSearch from '../templates/components/BannerSearch';
import HomeTile from '../templates/components/HomeTile';
import HomeTileCard from '../templates/components/HomeTileCard';
import HomeLongColumn from '../templates/components/HomeLongColumn';
import HomeLongCard from '../templates/components/HomeLongCard';
import HomeLongTitle from '../templates/components/HomeLongTitle';
import ConnectWithUs from '../templates/components/connectWithUs';
import ConnectWithUsItem from '../templates/components/ConnectWithUsItem';
import FeedbackAndComplaints from '../templates/components/FeedbackAndComplaints';
import NewsAndStories from '../templates/components/NewsAndStories';
import HTMLComp from '../templates/components/HTLMComp';
import Setting from '../templates/pages/Setting';
import PremiumCalculator from '../templates/pages/PremiumCalculator';
import IframeComp from '../templates/components/IframeComp';
import Code from '../templates/components/Code';

const spaRootNodePath = '/icare-demo';
const languages = ['en', 'de'];
const languageLabels = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'German',
    value: 'de',
  },
];
const config = {
  componentMappings: {
    // Pages
    'demo-insurance:pages/basic': Basic,
    'demo-insurance:pages/blog': Blog,
    'demo-insurance:pages/conversationalForm': ConversationalForm,
    'demo-insurance:pages/home': Home,
    'demo-insurance:pages/login': Login,
    'demo-insurance:pages/portal': Portal,
    'demo-insurance:pages/post': Post,
    'demo-insurance:pages/profile': Profile,
    'demo-insurance:pages/category': Category,
    'demo-insurance:pages/ManagedCampaign': ManagedCampaignPage, // This template is used in the campaign manager
    'demo-insurance:pages/search': Search,
    'demo-insurance:pages/setting': Setting,
    'demo-insurance:pages/premiumCalculator': PremiumCalculator,

    // Components
    'demo-insurance:components/banner': Banner,
    'demo-insurance:components/businessCard': BusinessCard,
    'demo-insurance:components/card': Card,
    'demo-insurance:components/carousel': Carousel,
    'demo-insurance:components/columns': Columns,
    'demo-insurance:components/pageLink': PageLink,
    'demo-insurance:components/section': Section,
    'demo-insurance:components/textImage': TextImage,
    'demo-insurance:components/quote': Quote,
    'demo-insurance:components/blogTeaser': BlogTeaser,
    'demo-insurance:components/map': Map,
    'demo-insurance:components/form': Form,
    'demo-insurance:components/crossSelling': CrossSelling,
    'demo-insurance:components/table': Table,
    'demo-insurance:components/bannerSearch':  BannerSearch,
    'demo-insurance:components/homeTile': HomeTile,
    'demo-insurance:components/homeTileItem': HomeTileCard,
    'demo-insurance:components/homeTileCard': HomeTileCard,
    'demo-insurance:components/homeLongColumn': HomeLongColumn,
    'demo-insurance:components/homeLongCard': HomeLongCard,
    'demo-insurance:components/homeLongTitle': HomeLongTitle,
    'demo-insurance:components/connectWithUs': ConnectWithUs,
    'demo-insurance:components/connectWithUsItem': ConnectWithUsItem,
    'demo-insurance:components/feedbackAndComplaints': FeedbackAndComplaints,
    'demo-insurance:components/newsAndStories': NewsAndStories,
    'demo-insurance:components/htmlComp': HTMLComp,
    'demo-insurance:components/iframeComp': IframeComp,
    'demo-insurance:components/code': Code,
    'demo-ecommerce:components/EventTeaser': EventTeaser,
    'demo-ecommerce:components/StoryTeaser': StoryTeaser,
    // Campaign manager
    'campaign-manager:components/managed-campaign': ManagedCampaign,
    
  },
};

const baseUrl = "https://author.icare.ap-playground.magnolia-platform.com"; // + process.env.NEXT_PUBLIC_BASE_URL;

const pagesApi = baseUrl + '/.rest/delivery/insurance-demo-websites';
const campaignPagesApi = baseUrl + '/.rest/campaign-manager';
const templateAnnotationsApi = baseUrl + '/.rest/template-annotations/v1/website'; // TODO: change once product feature added
const campaignTemplateAnnotationApi = baseUrl + '/.rest/template-annotations/v1/campaign-manager';
const homeHeaderApi = pagesApi + spaRootNodePath + '/header';
const storiesApi = baseUrl + '/.rest/delivery/insurance-demo-stories';
const postApi = baseUrl + '/.rest/delivery/insurance-demo-post/insurance-demo';
const insuranceInvoicesApi = baseUrl + '/.rest/delivery/insurance-invoices';
const insurancePoliciesApi = baseUrl + '/.rest/delivery/insurance-policies';
const insuranceUsersApi = baseUrl + '/.rest/delivery/insurance-users';
const insuranceUsersPostApi = baseUrl + '/.rest/nodes/v1/insurance-users';
const insuranceClaimsApi = baseUrl + '/.rest/delivery/insurance-claims';
const insuranceClaimsPostApi = baseUrl + '/.rest/nodes/v1/claims';
const formsApi = baseUrl + '/.rest/forms/v1/forms';
const bsiApiUser = baseUrl + '/.rest/delivery/bsi/insurance-demo-user-old';
const bsiApiCrossSelling = baseUrl + '/.rest/delivery/bsi/insurance-demo-cross-selling';
const searchStaxSearch = baseUrl + '/.rest/delivery/search-stax-search';
const searchStaxSuggest = baseUrl + '/.rest/delivery/search-stax-suggest';
const searchStaxAnalytics = baseUrl + '/.rest/delivery/search-stax-analytics';
const i18n = {
  yes: 'Yes',
  no: 'No',
  contact: 'Get in touch',
  furtherReadings: 'Further readings',
  readMore: 'Read more',
  name: 'User Policy Number',
  nameRequired: 'User Policy Number is required',
  pass: 'Password',
  passRequired: 'Password is required',
  passError: 'Incorrect password',
  loginError: 'User Policy Number or password is incorrect',
  submit: 'Submit',
  menu: 'MENU',
  logOut: 'Log Out',
  policies: 'Your products',
  invoices: 'Invoices',
  nr: 'Nr.',
  date: 'Date',
  status: 'Status',
  download: 'Download',
  noInvoices: 'You do not have any invoices',
  modifyPolicy: 'Modify Policy',
  noPolicies: 'You do not have any policies',
  profilePassInfo: 'Enter your current password to confirm your changes',
  profileError: 'Problem with updating information',
  profileNoData: 'No data to submit',
  profileSuccess: 'User information was updated',
  portal: 'My Life',
  profile: 'My Profile',
  claims: 'Your Claims',
  noClaims: 'You do not have any claims',
  type: 'Type',
  policyNumber: 'Policy Number',
  accident: 'Accident',
  minorAccident: 'Minor Accident',
  dental: 'Dental Claim',
  occupationalDisease: 'Occupational Disease',
  new: 'New',
  progress: 'In progress',
  missing: 'Missing Information',
  rejected: 'Rejected',
  settled: 'Settled',
  policeReport: 'Police Reports Filed?',
  location: 'Location',
  details: 'Details',
  submitAClaim: 'Submit A Claim',
  thankYou: 'Thank You',
  getAQuote: 'Get A Quote',
  autopopulatedContent:
    'Content will be populated automatically. Content can be previewed or accessed in the Public instance',
};

export {
  baseUrl,
  spaRootNodePath,
  languages,
  languageLabels,
  config,
  pagesApi,
  campaignPagesApi,
  templateAnnotationsApi,
  campaignTemplateAnnotationApi,
  homeHeaderApi,
  storiesApi,
  postApi,
  insuranceInvoicesApi,
  insurancePoliciesApi,
  insuranceUsersApi,
  insuranceUsersPostApi,
  insuranceClaimsApi,
  insuranceClaimsPostApi,
  formsApi,
  bsiApiUser,
  bsiApiCrossSelling,
  i18n,
  searchStaxSearch,
  searchStaxSuggest,
  searchStaxAnalytics,
};
