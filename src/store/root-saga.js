 import { all, call } from 'redux-saga/effects'
 import { categoriesSaga } from './categories/category.saga';
 import { usersSagas } from './user/user.saga';
 export function* rootSaga() {
     yield all([call(categoriesSaga), call(usersSagas)])
 }