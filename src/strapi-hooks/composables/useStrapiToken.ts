import Cookies from 'js-cookie';

export const useStrapiToken = () => {
    const getToken = (): string | null => {
        const token = Cookies.get(`${process.env.STRAPI_COOKIENAME ?? 'strapi_jwt'}`)
        return token === null || token === "null" ?   null:token;
    }
    const setToken = (token: string | null) => {
        Cookies.set(`${process.env.STRAPI_COOKIENAME ?? 'strapi_jwt'}`, token)
    }
    return {
        getToken,
        setToken
    }
}
