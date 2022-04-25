// import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import ThunkMiddleware from 'redux-thunk'


export const store = createStore(
    reducer,
    applyMiddleware(ThunkMiddleware)
)

