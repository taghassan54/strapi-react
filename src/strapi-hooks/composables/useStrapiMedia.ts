import {joinURL} from 'ufo'
import axios, {AxiosHeaders, AxiosProgressEvent} from "axios";
import {useStrapiToken} from "@/strapi-hooks/composables/useStrapiToken";
import {useStrapiUrl} from "@/strapi-hooks/composables/useStrapiUrl";
import {useState} from "react";
import {strapiConfig} from "@/strapi-hooks/config/strapiConfig";

export const useStrapiMedia = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const {getToken} = useStrapiToken()
    const {adminUrl, userUrl} = useStrapiUrl()
    const getMediaUrl = (path: string) => {
        const url = strapiConfig.url ?? 'http://localhost:1337'
        return joinURL(url, path)
    }

    const uploadSingleMedia = async (formData?:FormData|null|undefined, isForAdmin = false, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
        try {

            if(!formData && !selectedFile){
                   throw 'Please select a file first.'
            }

            const headers: AxiosHeaders = new AxiosHeaders()

            headers.setContentType('multipart/form-data')

            const token = getToken()

            if (token != null) {
                headers.Authorization = `Bearer ${token}`
            }

            if(!formData){
                 formData = new FormData();

                    formData.append('files', selectedFile);
            }

            const response = await axios.post(`${isForAdmin ? adminUrl() : userUrl()}/upload`, formData, {
                headers: headers,
                onUploadProgress: onUploadProgress,
            });

            console.log('File uploaded successfully:', response.data);
            return response.data
        } catch (error) {

            console.error('Error uploading file:', error);
            throw error
        }
    }
    const uploadMultipleMedia = async (formData?:FormData|null|undefined, isForAdmin = false, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
        try {

            if(!formData && selectedFiles.length === 0){
                    throw 'Please select at least one file.';
            }

            const headers: AxiosHeaders = new AxiosHeaders()

            headers.setContentType('multipart/form-data')

            const token = getToken()

            if (token != null) {
                headers.Authorization = `Bearer ${token}`
            }

            if(!formData){

                formData = new FormData();

                    for (let i = 0; i < selectedFiles.length; i++) {
                        formData.append('files', selectedFiles[i]);
                    }

            }

            const response = await axios.post(`${isForAdmin ? adminUrl() : userUrl()}/upload`, formData, {
                headers: headers,
                onUploadProgress: onUploadProgress,
            });

            console.log('File uploaded successfully:', response.data);
            return response.data
        } catch (error) {

            console.error('Error uploading file:', error);
            throw error
        }
    }

    return {
        getMediaUrl,
        uploadSingleMedia,
        uploadMultipleMedia,
        setSelectedFiles,
        selectedFiles,
        selectedFile,
        setSelectedFile
    }

}
