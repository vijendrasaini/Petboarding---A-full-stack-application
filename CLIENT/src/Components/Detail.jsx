import { Grid, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './detail.css'


export const Detail = () => {

    const { id } = useParams()
    const [petHouse, setPetHouse] = useState({})
    const baseUrl = `https://vijendra-mini-petboard-app.herokuapp.com`

    const getData = async ()=>{
        const res = await fetch(`${baseUrl}/${id}`)
        const finalResult = await res.json()
        console.log({finalResult})
        setPetHouse(finalResult)
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <>
            <Stack 
                direction={"row"}
                sx={{ width: "60%", margin: "auto", textAlign: 'unset' }}
                justifyContent='space-between'
                
            >
            <Grid  xs={12} sm={12}>
                <h1>About <span id="houseName">{petHouse?.overview?.name}</span> Pets Services</h1>
                <ul className="detailList" style={{
                    listStyle: "none"
                }}>
                    <li>Number of pets that will be watched at one time : <span>{"8"}</span> </li>
                    <li>
                        <h2>Accepted Pat Types</h2>
                        <ol style={{
                            listStyle: "none"
                        }}>
                            {Array.isArray(petHouse?.more?.acceptedPets)?petHouse?.more?.acceptedPets.map(pet=><li><span>{pet}</span></li>) : petHouse?.more?.acceptedPets}
                        </ol>
                    </li>
                    <li>Accepted Pet size : <span>{`${petHouse?.more?.petSize?.split(' ')[0]} ${petHouse?.more?.petSize?.split(' ')[1]} kg`}</span></li>
                    <li>The number of walks provided per day : <span>{petHouse?.more?.noOfWalksPerDay}</span></li>
                    <li>My outdoor area size : <span>{`${petHouse?.more?.outerAreaSize} mtr*mtr`}</span></li>
                    <li>Emergency transport : <span>{petHouse?.more?.emergencyTransportFacility ? "Available" : "Not Available"}</span></li>
                </ul>
            </Grid>
            <Grid xs={12} sm={12} sx={{}}>
                <table className='detailTable'>
                    <h2>Other Information</h2>
                    <tr>
                        <td>The place your pet will sleep at night</td>
                        <td>Wherever they want</td>
                    </tr>
                    <tr>
                        <td>The number of potty breaks provided per day.</td>
                        <td>Full access outside</td>
                    </tr>
                    <tr>
                        <td>The type of home pet will stay in</td>
                        <td>House</td>
                    </tr>
                </table>
            </Grid>
            </Stack>
            {/* <div style=>
            </div> */}
        </>
    )
}


