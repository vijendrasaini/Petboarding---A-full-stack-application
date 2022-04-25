import { AUTH, FETCH_DATA, LOADING } from "./action";

export const fetchData = payload => ({ type: FETCH_DATA, payload })
export const setAuth = payload => ({ type : AUTH, payload})

export const setData = (url,seach) => async function getData(dispatch) {
    if(!seach)
        dispatch(setLoding(true))
    const res = await fetch(url)
    const finalResult = await res.json()
    dispatch(fetchData(finalResult))
    if(!seach)
        dispatch(setLoding(false))
}
export const setLoding = payload => ({ type : LOADING, payload})

