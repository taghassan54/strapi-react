import { useRuntimeConfig } from '#imports'

export const useStrapiVersion = (): string => {

  return  process.env.STRAPI_VERSION??"v4"
}
