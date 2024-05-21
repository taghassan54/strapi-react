import {AxiosRequestConfig} from "axios";
import {useStrapiVersion} from "@/strapi-hooks/composables/useStrapiVersion";
import {useStrapiClient} from "@/strapi-hooks/composables/useStrapiClient";
import {Strapi4RequestParams} from "@/strapi-hooks/types";

/**
 * @deprecated use `useStrapi` for correct types
 */
export const useStrapi4 = () => {

    const client = useStrapiClient()
    const version = useStrapiVersion()
    if (version !== 'v4') {
        console.warn('useStrapi4 is only available for v4')
    }

    /**
     * Get a list of {content-type} entries
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {Strapi4RequestParams} [params] - Query parameters
     * @param fetchOptions
     * @returns Promise<T>
     */
    const find = (contentType: string, params?: Strapi4RequestParams,fetchOptions?: AxiosRequestConfig): Promise<T> => {
      return client(`/${contentType}`,{method:'get',params:params,...fetchOptions})
    }

    /**
     * Get a specific {content-type} entry
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {string|number} id - ID of entry
     * @param  {Strapi4RequestParams} [params] - Query parameters
     * @param fetchOptions
     * @returns Promise<T>
     */
    const findOne = <T>(contentType: string, id?: string | number | Strapi4RequestParams, params?: Strapi4RequestParams, fetchOptions?: AxiosRequestConfig): Promise<T> => {
        if (typeof id === 'object') {
            params = id
            id = undefined
        }

        const path = [contentType, id].filter(Boolean).join('/')

        return client(`/${path}`, { method: 'GET', params, ...fetchOptions })
    }


    /**
     * Create a {content-type} entry
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {Record<string, any>} data - Form data
     * @param fetchOptions
     * @returns Promise<T>
     */
    const create = <T>(contentType: string, data: Partial<T>,fetchOptions?: AxiosRequestConfig): Promise<T> => {
        return client(`/${contentType}`, { method: 'POST', data: { data } ,...fetchOptions })
    }

    /**
     * Update an entry
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {string|number} id - ID of entry to be updated
     * @param  {Record<string, any>} data - Form data
     * @returns Promise<T>
     */
    const update = <T>(contentType: string, id?: string | number | Partial<T>, data?: Partial<T>): Promise<T> => {
        if (typeof id === 'object') {
            data = id
            id = undefined
        }

        const path = [contentType, id].filter(Boolean).join('/')

        return client(path, { method: 'PUT', body: { data } })
    }

    /**
     * Delete an entry
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {string|number} id - ID of entry to be deleted
     * @returns Promise<T>
     */
    const _delete = <T>(contentType: string, id?: string | number): Promise<T> => {
        const path = [contentType, id].filter(Boolean).join('/')

        return client(path, { method: 'DELETE' })
    }



    return {
        find,
        findOne,
        create,
        update,
        delete: _delete
    }
}