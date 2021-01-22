import type { CommerceAPIFetchOptions } from '@commerce/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface GraphQLFetcherResult<Data = any> {
  data: Data
  res: Response
}
export interface ShopifyConfig {
  locale?: string
  commerceUrl: string
  apiToken: string
  customerCookie: string
  fetch<Data = any, Variables = any>(
    query: string,
    queryData?: CommerceAPIFetchOptions<Variables>,
    fetchOptions?: RequestInit
  ): Promise<GraphQLFetcherResult<Data>>
}

// No I don't like this - will fix it later
const API_URL =
  process.env.SHOPIFY_STORE_DOMAIN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const API_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

if (!API_URL) {
  throw new Error(
    `The environment variable SHOPIFY_STORE_DOMAIN is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`
  )
}

export class Config {
  private config: ShopifyConfig

  constructor(config: ShopifyConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<ShopifyConfig> = {}) {
    return Object.entries(userConfig).reduce<ShopifyConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<ShopifyConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  fetch: fetchGraphqlApi,
  customerCookie: 'SHOP_TOKEN',
})

export function getConfig(userConfig?: Partial<ShopifyConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<ShopifyConfig>) {
  return config.setConfig(newConfig)
}
