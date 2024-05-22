'use client';
import {useStrapi} from "@/strapi-hooks/useStrapi";
import {useStrapiAuth} from "@/strapi-hooks/composables/useStrapiAuth";
import React, {FormEvent, useState} from "react";
import axios, {AxiosHeaders} from "axios";
import {useStrapiToken} from "@/strapi-hooks/composables/useStrapiToken";
import {useStrapiMedia} from "@/strapi-hooks/composables/useStrapiMedia";
import {useStrapiUser} from "@/strapi-hooks/composables/useStrapiUser";

export default function Home() {
    const num = 55
    const {find, findOne, create} = useStrapi()
    const {register, login, adminLogin, renewToken,} = useStrapiAuth()
    const {user,  getUser} = useStrapiUser()
    const {
        uploadSingleMedia,
        uploadMultipleMedia,
        selectedFiles,
        setSelectedFiles,
        selectedFile,
        setSelectedFile,
        getMediaUrl,
        updateFileInfo
    } = useStrapiMedia()
    const {getToken} = useStrapiToken()


    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        await uploadMultipleMedia()
    };


    async function handleClick() {
        // alert('You clicked me!');

        // const  admin =await adminLogin({
        //     email:"taghassan54@gmail.com",
        //     password:"Gmail159370!@#"
        // })
        // console.log('====================================');
        // console.log("admin",admin);
        // console.log('====================================');

        const user = await login({
            identifier: "taghassan54@gmail.com",
            password: "Gmail159370!@#"
        })
        console.log('====================================');
        console.log("user", user);
        console.log('====================================');


        const transactions = await find('transactions', {populate: '*'})
        const transaction = await findOne('transactions', 1, {populate: '*'})
        console.log('====================================');
        console.log("transactions", transactions);
        console.log('====================================');
        //
        // const response = await register({
        //     email: `taghassan${num}@gmail.com`,
        //     password: "Gmail159370!@#",
        //     username: `taghassan${num}`
        // },)

        const response = await login({
            identifier: `taghassan${num}@gmail.com`,
            password: "Gmail159370!@#",
        },)

        console.log('====================================');
        console.log(response);
        console.log('====================================');
    }

    const handleSingleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }
    const handleSingleUpload = async () => {
        await uploadSingleMedia()
    }

    return (
        <div style={{padding: 50}}>

            <h1>File Upload</h1>
            <input type="file" multiple onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload</button>
            <div style={{height: 40}}></div>
            <h1>File Upload Single</h1>
            <input type="file" onChange={handleSingleFileChange}/>
            <button onClick={handleSingleUpload}>Upload Single</button>

            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            {uploadError && <p style={{color: 'red'}}>Error: {uploadError}</p>}
            <br/>
            <br/>
            <button onClick={async () => {
                const admin = await adminLogin({
                    email: "taghassan54@gmail.com",
                    password: "Gmail159370!@#"
                })
                console.log('====================================');
                console.log("admin", admin);
                console.log('====================================');

            }}>admin Login
            </button>
            <br/>
            <br/>
            <button onClick={async () => {
                const user = await login({
                    identifier: "taghassan54@gmail.com",
                    password: "Gmail159370!@#"
                })
                console.log('====================================');
                console.log("user", user);
                console.log('====================================');

            }}>user Login
            </button>
            <br/>
            <br/>
            <button onClick={async () => {
                const files = await find('upload/files')
                const file = await findOne('upload/files', 2)

                if (files) {
                    console.log(file)
                    console.log('====================================');
                    console.log(getMediaUrl(files[0].url));
                    console.log('====================================');
                }
            }}>files
            </button>
            <br/>

            <br/>

            <button onClick={async (e) => {


                e.preventDefault();

                try {

                    if (selectedFiles.length === 0) {
                        throw 'Please select at least one file.';
                    }

                    const data = {
                        uuid: '0320ec48-8a77-49cf-9cd7-02c21ac25031',
                        amount: 4590,
                        description: 'description'
                    };


                    // uploadSingleMedia(formData)

                    const token = getToken()
                    const response = await create('transactions', data)

                    if (response && response.data) {
                        // await uploadSingleMedia(undefined, {
                        //     field: 'receipt',
                        //     refId: response.data.id,
                        //     ref: 'api::transaction.transaction'
                        // })
                        await uploadMultipleMedia(undefined, {
                            field: 'receipt',
                            refId: response.data.id,
                            ref: 'api::transaction.transaction',
                            path: 'transactions',
                        })
                    }

                } catch (e) {
                    alert(e.toString())
                }

            }}>add transaction
            </button>

            <br/>
            <br/>
            <button onClick={async (e) => {

                const response = await updateFileInfo({fileId: 2});


            }}> update file
            </button>
            <br/>

            <br/>
            <button onClick={async () => {
                const response = await find("admin/api-tokens", undefined,undefined,true)

                console.log('====================================');
                console.log("response",response.data[0].id);
               const regenerate =await create('admin/api-tokens/1/regenerate',{},undefined,true)
                // console.log("response",await getUser());
              const permissions =await find('admin/content-api/permissions',undefined,undefined,true)
                console.log("regenerate",regenerate)
                console.log("permissions",permissions)
                console.log('====================================');
            }}>
                Click me
            </button>
        </div>
    );
}
