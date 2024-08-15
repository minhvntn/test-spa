# Sales-Demo

## Documentation

https://wiki.magnolia-cms.com/display/demo/Local+Development+Setup

## Version history (Release notes)

https://wiki.magnolia-cms.com/display/demo/Release+Notes

| `sales-demo-integration`                                                                     | `sales-demo-prod`                                                                     |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Magnolia Author](https://author.sales-demo-integration.ap-playground.magnolia-platform.com) | [Magnolia Author](https://author.sales-demo-prod.ap-playground.magnolia-platform.com) |
| [Magnolia Public](https://public.sales-demo-integration.ap-playground.magnolia-platform.com) | [Magnolia Public](https://public.sales-demo-prod.ap-playground.magnolia-platform.com) |

## SPA Instances

All author links point to one Node.js author instance.  
All public links point to one Node.js public instance.

JavaScript looking at URL knows which site should it fetch data from.  
You can see the code for it in `/services-sales-demo-frontend/spa/src/index.js`

| Name   | `sales-demo-integration`                                                                                                                                                                                   | `sales-demo-prod`                                                                                                                                                                            | Node name     | Languages                        |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------- |
| **HQ** | [SPA Author](https://author-spa.sales-demo-integration.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa.sales-demo-integration.ap-playground.magnolia-platform.com)             | [SPA Author](https://author-spa.sales-demo-prod.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa.sales-demo-prod.ap-playground.magnolia-platform.com)             | `/home`       | en, de, es, fr, it, en_US, zh_CN |
| **CH** | [SPA Author](https://author-spa-ch.sales-demo-integration.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-ch.sales-demo-integration.ap-playground.magnolia-platform.com)       | [SPA Author](https://author-spa-ch.sales-demo-prod.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-ch.sales-demo-prod.ap-playground.magnolia-platform.com)       | `/home_ch`    | de, it, fr, en                   |
| **DE** | [SPA Author](https://author-spa-de.sales-demo-integration.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-de.sales-demo-integration.ap-playground.magnolia-platform.com)       | [SPA Author](https://author-spa-de.sales-demo-prod.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-de.sales-demo-prod.ap-playground.magnolia-platform.com)       | `/home_de`    | de, en                           |
| **ES** | [SPA Author](https://author-spa-es.sales-demo-integration.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-es.sales-demo-integration.ap-playground.magnolia-platform.com)       | [SPA Author](https://author-spa-es.sales-demo-prod.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-es.sales-demo-prod.ap-playground.magnolia-platform.com)       | `/home_es`    | es, en                           |
| **US** | [SPA Author](https://author-spa-en-us.sales-demo-integration.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-en-us.sales-demo-integration.ap-playground.magnolia-platform.com) | [SPA Author](https://author-spa-en-us.sales-demo-prod.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-en-us.sales-demo-prod.ap-playground.magnolia-platform.com) | `/home_en_US` | en_US, en                        |
| **ZH** | [SPA Author](https://author-spa-zh-cn.sales-demo-integration.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-zh-cn.sales-demo-integration.ap-playground.magnolia-platform.com) | [SPA Author](https://author-spa-zh-cn.sales-demo-prod.ap-playground.magnolia-platform.com) <br /> [SPA Public](https://public-spa-zh-cn.sales-demo-prod.ap-playground.magnolia-platform.com) | `/home_zh_CN` | zh_CN, en                        |

## CI/CD

In `.gitlab-ci.yml` we use `sed` command to add sensitive values e.g. passwords, tokens etc.  
In CI/CD settings you must add following variables:

https://wiki.magnolia-cms.com/pages/viewpage.action?pageId=289506023

## Basic auth

1. Add the `Create Basic Auth Pass File` CI/CD job (see example in `.gitlab-ci.yml`):.
2. Set `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` CI/CD variables used in job from point 1.
3. Add following lines in `Deploy` job (see example in `Deploy Insurance Demo`):

```
cache:
  paths:
    - auth
  policy: pull
```

```
kubectl -n $KUBECTL_NAMESPACE create secret generic basic-auth --from-file=auth --dry-run=client -o yaml | kubectl apply -f -
```

4. Add the annotations in k8s YAML file (see example in `sales-demo-ins.yaml`):

```
nginx.ingress.kubernetes.io/auth-type: basic
nginx.ingress.kubernetes.io/auth-secret: basic-auth
nginx.ingress.kubernetes.io/auth-realm: 'Please login'
nginx.ingress.kubernetes.io/configuration-snippet: |
  proxy_set_header Authorization $http_authorization;
  more_set_headers "X-Robots-Tag: noindex, nofollow";
```
