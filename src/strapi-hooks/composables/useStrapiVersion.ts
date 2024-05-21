import { useRuntimeConfig } from '#imports'
import {strapiConfig} from "@/strapi-hooks/config/strapiConfig";

export const useStrapiVersion = (): string => {

  return  strapiConfig.version??"v4"
}
