import {takeLatest,call,put,all} from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';
import { fetchCategoriesSuccess,fetchCategoriesFailed } from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';
console.log('categories saga called')
// export const fetchCategoriesStartAsync = () => {
//     return async (dispatch) => {
//       dispatch(fetchCategoriesStart());
//       try {
//         const categoriesArray = await getCategoriesAndDocuments('categories');
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//       } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//       }
//     };
//   };

  export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));
      } catch (error) {
        put(fetchCategoriesFailed(error));
      }
  };

  export function* onFetchCategories(){
      yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync)
  }

  export function* categoriesSaga(){
      yield all([call(onFetchCategories)]);
  }