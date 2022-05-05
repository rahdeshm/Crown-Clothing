import './category.styles.scss'
import { useParams } from 'react-router-dom';
import { useState,useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/categories.selector'
import { useContext } from 'react';
import Spinner from '../../Components/spinner/spinner.component';
import ProductCard from '../../Components/product-card/product-card.components';
const Category=()=>{
    const {category}=useParams();
    
    const categoriesMap=useSelector(selectCategoriesMap);
    const isLoading=useSelector(selectCategoriesIsLoading)
    const[products,setProducts]=useState(categoriesMap[category]);
    
    useEffect(()=>{
      setProducts(categoriesMap[category])
    },[category,categoriesMap]);

    console.log(products)
    return(
      <Fragment>
      
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        {isLoading? 
          <Spinner/> :
          <div className='category-container'>
          {products &&
          products.map((product)=>(
          <ProductCard key={product.id} product={product}/>))
        }
        </div>}
          
        </Fragment>
   )}
export default Category