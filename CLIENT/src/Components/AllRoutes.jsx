import { Routes,Route } from "react-router-dom"
import { Account } from "./Account"
import { Detail } from "./Detail"
import {Form} from "./Form"
import { Home } from './Home'
import { Navbar } from "./Navbar"

export const AllRoutes = ()=>{
    return(
        <>
            <Navbar/>
            <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/listing/:id' element={<Detail/>}/>
               <Route path='/listing/create' element={<Form/>}/>
               <Route path='/signin' element={<Account/>}/>
            </Routes>
        </>
    )
}