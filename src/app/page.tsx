'use client';
import {useStrapi} from "@/strapi-hooks/useStrapi";
import {useStrapiAuth} from "@/strapi-hooks/composables/useStrapiAuth";
import React, {FormEvent, useState} from "react";
import axios, {AxiosHeaders} from "axios";
import {useStrapiToken} from "@/strapi-hooks/composables/useStrapiToken";
import {useStrapiMedia} from "@/strapi-hooks/composables/useStrapiMedia";

export default function Home() {
    const num = 55
    const {find,findOne,create} = useStrapi()
    const {register,login,adminLogin} = useStrapiAuth()

    const {uploadSingleMedia,
        uploadMultipleMedia,
        selectedFiles,
        setSelectedFiles,
    selectedFile,
        setSelectedFile
    }=useStrapiMedia()
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

        const  user =await login({
            identifier:"taghassan54@gmail.com",
            password:"Gmail159370!@#"
        })
        console.log('====================================');
        console.log("user",user);
        console.log('====================================');

        await create('transactions',{
            uuid:'0320ec48-8a77-49cf-9cd7-02c21ac25031',
            amount:4590,
            description:'description'
        })
             const transactions =await find('transactions',{populate:'*'})
             const transaction =await findOne('transactions',1,{populate:'*'})
        console.log('====================================');
        console.log("transactions",transactions);
        console.log('====================================');
        //
        // const response = await register({
        //     email: `taghassan${num}@gmail.com`,
        //     password: "Gmail159370!@#",
        //     username: `taghassan${num}`
        // },)

        const response = await login({
            identifier:`taghassan${num}@gmail.com`,
            password: "Gmail159370!@#",
        },)

        console.log('====================================');
        console.log(response);
        console.log('====================================');
    }

    const handleSingleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }
    const handleSingleUpload =async () => {
       await uploadSingleMedia()
    }

    return (
        <div style={{padding:50}}>

            <h1>File Upload</h1>
            <input type="file" multiple onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload</button>
<div style={{height:40}}></div>
            <h1>File Upload Single</h1>
            <input type="file"  onChange={handleSingleFileChange}/>
            <button onClick={handleSingleUpload}>Upload</button>

            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            {uploadError && <p style={{color: 'red'}}>Error: {uploadError}</p>}

            {/*<button onClick={handleClick}>*/}
            {/*    Click me*/}
            {/*</button>*/}
        </div>
    );
}
