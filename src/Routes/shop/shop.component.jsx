// import { Fragment, useContext } from "react"
// import { CategoriesContext } from "../../contexts/categories.context";
// import CategoryPreview from '../../Components/category-preview/category-preview.component';
// import ProductCard from '../../Components/product-card/product-card.components';
import {Routes,Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';
import { useEffect } from 'react';
import {getCategoriesAndDocuments} from '../../utils/firebase.utils';
import { fetchCategoriesStart } from '../../store/categories/categories.action';
// import {fetchCategoriesStartAsync} from '../../store/categories/categories.action'
const Shop = () => {
  const dispatch=useDispatch();
 
  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoriesArray = await getCategoriesAndDocuments('categories');
  //     dispatch(setCategories(categoriesArray));
  //   };

  //   getCategoriesMap();
  // }, []);
  useEffect(()=>{      
            // dispatch(fetchCategoriesStartAsync())
            dispatch(fetchCategoriesStart())
    },[])

  return(  
      <Routes>
        <Route index element={<CategoriesPreview/>}/> 
        <Route path=':category' element={<Category/>}/> 
      </Routes>
      )};
export default Shop