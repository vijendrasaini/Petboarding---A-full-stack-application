import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData, setData } from '../Redux/actionCreators';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useRef } from 'react';


export const Home = () => {
    const [ searchText, setSearchText] = useState("")
    let id = useRef(null)
    const dispatch = useDispatch()
    const baseUrl = `https://vijendra-mini-petboard-app.herokuapp.com`
    const { dataArr: { petHouses, totalPages }, loding } = useSelector(store => store)
    useEffect(() => {
        let url = baseUrl + `/pethouses`
        dispatch(setData(url))
    }, [])

    const handleFilter = (e) => {
        const url = baseUrl + `/pethouses?filter=${e.target.value}`
        dispatch(setData(url))
    }
    function handleSort({ target: { value } }) {
        const url = baseUrl + `/pethouses?sortKey=${value[0]}&sortOrder=${value[1]}`
        dispatch(setData(url))
    }
    function handleSearch(searchText){
        const url = baseUrl + `/pethouses?search=${searchText}`
        dispatch(setData(url))
    }
    function debounce(e){
        console.log("seaching")
        id = setTimeout(()=>{
            if(id)
                clearTimeout(id)
            handleSearch(e.target.value)
        },400)
    }
    return !loding ? (
        <>
            <Stack
                justifyContent={'space-between'}
                alignItems="center"
                direction='row'
                sx={{ width: "80%" }}
                margin={"auto"}
            >
                <h1>Available Pet Boards</h1>
                <Stack
                    spacing={2}
                    alignItems="center"
                    direction='row'
                >
                   
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Google Maps"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={debounce}
                        />
                        <IconButton onChange={debounce} sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <FormControl sx={{ m: 1, minWidth: 230 }} size="small">
                        <InputLabel id="demo-select-small">Sort By </InputLabel>
                        <Select
                            onChange={handleSort}
                            labelId="demo-select-small"
                            id='demo-select-small'
                        >
                            <MenuItem value={["rating", 1]}>Rating : Low to High</MenuItem>
                            <MenuItem value={["rating", -1]}>Rating : High to Low</MenuItem>
                            <MenuItem value={["costPerDay", 1]}>Cost Per Day : Low to High</MenuItem>
                            <MenuItem value={["costPerDay", -1]}>Cost Per Day : High to Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                        <InputLabel id="demo-select-small">Filter</InputLabel>
                        <Select onChange={handleFilter}
                            labelId="demo-select-small"
                            id='demo-select-small'
                        >
                            <MenuItem value={true}>verified</MenuItem>
                            <MenuItem value={false}>Not Verified</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>
            </Stack>
            <TableContainer sx={{ width: "80%", margin: "auto" }} aria-label="simple table" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: "rgb(137, 137, 137)", fontSize: 17 }}>
                            <TableCell >S.N.</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >City</TableCell>
                            <TableCell >Address</TableCell>
                            <TableCell >Capacity</TableCell>
                            <TableCell >Cost/day</TableCell>
                            <TableCell >Verified</TableCell>
                            <TableCell >Rating</TableCell>
                            <TableCell >More</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {petHouses?.map((petHouse, index) => <TableRow key={petHouse._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{petHouse?.overview.name}</TableCell>
                            <TableCell>{petHouse?.overview.city}</TableCell>
                            <TableCell>{petHouse?.overview.address}</TableCell>
                            <TableCell>{petHouse?.overview.capacity}</TableCell>
                            <TableCell>{petHouse?.overview.costPerDay}</TableCell>
                            <TableCell>{petHouse?.overview.verified ? "Verified" : "Not Verified"}</TableCell>
                            <TableCell>{petHouse?.overview.rating}</TableCell>
                            <TableCell><Link to={`/listing/${petHouse?.id}`} style={{ fontWeight: "bold" }}>Know More</Link></TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                direction="row"
                mt={2}
            >
                {/* <Pagination count={totalPages} color="primary" />
                <Pagination count={10} shape="rounded" /> */}
                {/* <Pagination count={totalPages} variant="outlined" shape="rounded" color='primary' /> */}
                {/* <TablePagination
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </Stack>
        </>
    ) : <CircularProgress />
}