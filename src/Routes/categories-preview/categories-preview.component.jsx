import { Fragment, useContext } from "react"
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/categories.selector";
import CategoryPreview from '../../Components/category-preview/category-preview.component';
import ProductCard from '../../Components/product-card/product-card.components';
import Spinner from "../../Components/spinner/spinner.component";

const CategoriesPreview = () => {
    const categoriesMap=useSelector(selectCategoriesMap)
    const isLoading=useSelector(selectCategoriesIsLoading)
  return(
      <>
       {isLoading? (<Spinner/>):(
        Object.keys(categoriesMap).map((title)=>{
          const products=categoriesMap[title];
          return( 
            <CategoryPreview  key={title} title={title} products={products}/>
            )
       })
       )}
       
           
      </>);
        };
export default CategoriesPreview