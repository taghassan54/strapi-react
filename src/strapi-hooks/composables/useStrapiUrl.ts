import {useStrapiVersion} from "@/strapi-hooks/composables/useStrapiVersion";

export const useStrapiUrl = () => {

    const userUrl = (): string => {
        const version = useStrapiVersion()
        // return version === 'v3' ? config.strapi.url : `${config.strapi.url}${config.strapi.prefix}`
        return `${process.env.STRAPI_URL ?? 'http://localhost:1337'}/${process.env.STRAPI_PREFIX ?? 'api'}`
    }
    const adminUrl = (): string => {
        const version = useStrapiVersion()
        // return version === 'v3' ? config.strapi.url : `${config.strapi.url}${config.strapi.prefix}`
        return `${process.env.STRAPI_URL ?? 'http://localhost:1337'}`
    }
    return {
        userUrl,
        adminUrl
    }
}
