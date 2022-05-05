import { useState,useEffect } from "react";
import { createContext } from "react";
import {addCollectionAndDocuments} from '../utils/firebase.utils'
import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from "../utils/firebase.utils";

export const CategoriesContext=createContext({
    categoriesMap:{}
});


export const CategoriesProvider=({children})=>{
    const[categoriesMap,setcategoriesMap]=useState({});
    
    useEffect(()=>{      
        const getCategoiesyMap=async ()=>{
            const categoryMap=await getCategoriesAndDocuments();
           
            setcategoriesMap(categoryMap)
        };
        getCategoiesyMap()
    },[])

    const value={categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>
        {children}
        </CategoriesContext.Provider>
    )
}