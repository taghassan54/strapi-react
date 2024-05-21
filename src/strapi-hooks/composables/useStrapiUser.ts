import type {StrapiUser} from '../types'

import React, {MutableRefObject, useState} from "react";
import {StrapiAdminUser} from "../types";

export const useStrapiUser = <T = StrapiUser>() => {
    let user: MutableRefObject<StrapiUser|StrapiAdminUser|null> = {current:null}

    const getUser=()=>{
        return user.current
    }
    const  setCurrentUser=(newUser: MutableRefObject<StrapiUser>)=>{
       user = newUser
    }
    return {user,getUser,setCurrentUser}
}
