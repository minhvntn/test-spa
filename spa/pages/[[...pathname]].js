import { EditablePage, EditorContextHelper } from '@magnolia/react-editor';
import {
  baseUrl,
  campaignPagesApi,
  campaignTemplateAnnotationApi,
  config,
  languages,
  pagesApi,
  postApi,
  spaRootNodePath,
  storiesApi,
  templateAnnotationsApi,
} from '../utils/config';

import Head from 'next/head';
import MagnoliaContext from '../utils/MagnoliaContext';
import { isNotEmpty } from '../utils';
import perfume from '../utils/perfume';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const resolvedUrl = context.resolvedUrl;
  const magnoliaContext = EditorContextHelper.getMagnoliaContext(resolvedUrl, spaRootNodePath, languages);
  const isCampaign = magnoliaContext.searchParams.campaigns;
  const props = {resolvedUrl, magnoliaContext};

  // Fetching page content
  const postPathname = magnoliaContext.nodePath.match(/(?<=\/blog\/).+/); // = isPost
  const categoryPathname = magnoliaContext.nodePath.match(/(?<=\/life-blog\/).+/); // = isCategory
  let pageJson;

  if (postPathname) {
    const pagesRes = await fetch(postApi + '/' + postPathname + magnoliaContext.search);

    pageJson = await pagesRes.json();
    pageJson['mgnl:template'] = 'demo-insurance:pages/post';
  } else if (categoryPathname) {
    const pagesRes = await fetch(storiesApi + '?limit=100&categories=' + context.query?.id);

    pageJson = await pagesRes.json();
    pageJson['title'] = categoryPathname[0];
    pageJson['mgnl:template'] = 'demo-insurance:pages/category';
  } else {
    let url;
    if (isCampaign) {
      url = campaignPagesApi + magnoliaContext.nodePath.replace(spaRootNodePath, '');
    } else {
      url = pagesApi + magnoliaContext.nodePath;
    }

    url += magnoliaContext.search;

    const crossSellingProduct = context.req?.cookies?.['crossSellingProduct'];
    if (crossSellingProduct) url += '&crossSellingProduct=' + crossSellingProduct;

    const pagesRes = await fetch(url);

    pageJson = await pagesRes.json();
  }

  if (!pageJson.error) props.page = pageJson;

  if (magnoliaContext.isMagnolia) {
    let templateAnnotationUrl;
    if (isCampaign) {
      templateAnnotationUrl = campaignTemplateAnnotationApi + magnoliaContext.nodePath.replace(spaRootNodePath, '');
    } else {
      templateAnnotationUrl = templateAnnotationsApi + magnoliaContext.nodePath;
    }

    const templateAnnotationsRes = await fetch(templateAnnotationUrl);
    const templateAnnotationsJson = await templateAnnotationsRes.json();

    if (!templateAnnotationsJson.error) props.templateAnnotations = templateAnnotationsJson;
  }

  // Required by @magnolia/react-editor
  global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;

  return {props};
}

export default function Pathname(props) {
  const {resolvedUrl, page = {}, templateAnnotations = {}, magnoliaContext = {}} = props;
  const router = useRouter();
  const currentPath = resolvedUrl.split('?')[0];
  const path = page['@path'];
  const title = page.browserTitle || page.title || page['@name'];
  const description = page.seoDescription || title;
  const bottomImage = page.bottomImage;
  const nodeType = page['@nodeType'];
  const pageType = nodeType === 'mgnl:page' ? 'website' :
    nodeType === 'mgnl:composition' ? 'blog article' :
      'other';

  useEffect(() => {
    perfume();
  }, []);

  useEffect(() => {
    if (magnoliaContext.isMagnolia) return;

    const privatePaths = [
      '/insurance-demo/submit-a-claim',
      '/insurance-demo/portal',
      '/insurance-demo/profile',
      '/submit-a-claim',
      '/portal',
      '/profile',
    ];

    if (privatePaths.includes(currentPath) && !JSON.parse(localStorage.getItem('user'))) {
      router.push({
        pathname: '/insurance-demo/login',
        query: {returnUrl: path},
      });
    }
  }, [magnoliaContext.isMagnolia, currentPath]);

  return (
    <MagnoliaContext.Provider value={magnoliaContext}>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
        <meta name='robots' content={page.noIndex === true ? 'noindex, nofollow' : 'index, follow'}/>
        <meta name='description' content={description}/>
        <meta name='keywords' content={page.seoKeywords || title}/>
        <meta property='search:title' content={title}/>
        <meta property='search:type' content={pageType}/>
        <meta property='og:type' content='website'/>
        <meta property='og:title' content={title}/>
        <meta property='og:description' content={description}/>
        <meta property='og:image' content={baseUrl + page.seoImage?.['@link'] || '#'}/>
        <link rel='shortcut icon' href='/favicon.ico'/>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png'/>
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'/>
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"/>
        <title>{title}</title>
      </Head>
      <div
        className={'main ' +magnoliaContext.isMagnoliaEdit ? 'isMagnoliaEdit' : ''}
        // style={bottomImage ? {backgroundImage: 'url(' + baseUrl + bottomImage['@link'] + ')'} : null}
      >
        {isNotEmpty(page) && isNotEmpty(config) && (
          <EditablePage content={page} config={config} templateAnnotations={templateAnnotations}/>
        )}
      </div>
    </MagnoliaContext.Provider>
  );
}
