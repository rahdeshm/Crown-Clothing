import {createSelector} from 'reselect';

const selectCategoryReducer=(state)=> state.categories
//createSelector create a memoized version of selector
export const selectCategories=createSelector(
 [selectCategoryReducer],
 (categoriesSlice)=>categoriesSlice.categories
);

//memoizd selectors
export const selectCategoriesMap =createSelector(
  [selectCategories],
  (categories)=>{
    console.log('selector fired')
    return categories.reduce((accum, category) => {
    const { title, items } = category;
    accum[title.toLowerCase()] = items;
    return accum
}, {})
}
); 

export const selectCategoriesIsLoading=createSelector(
  [selectCategoryReducer],
  (categoriesSlice)=>categoriesSlice.isLoading
)



//pull the data in some most basic form in from api and 
// perform the transation on that data in which form we want to receive in our selector form