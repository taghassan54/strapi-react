import {useStrapi4} from "@/strapi-hooks/useStrapi4";
import {Strapi4RequestParams, Strapi4ResponseMany, Strapi4ResponseSingle} from "@/strapi-hooks/types";

interface StrapiV4Client<T> {
  find<F = T>(contentType: string, params?: Strapi4RequestParams): Promise<Strapi4ResponseMany<F>>
  findOne<F = T>(contentType: string, id?: string | number | Strapi4RequestParams, params?: Strapi4RequestParams): Promise<Strapi4ResponseSingle<F>>
  create<F = T>(contentType: string, data: Partial<F>): Promise<Strapi4ResponseSingle<F>>
  update<F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<Strapi4ResponseSingle<F>>
  delete<F = T>(contentType: string, id?: string | number): Promise<Strapi4ResponseSingle<F>>
}

export const useStrapi = () => {
  return useStrapi4()
}
