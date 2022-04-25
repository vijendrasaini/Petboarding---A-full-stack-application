import { Grid, Stack, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

export const Form = () => {

  const dummyData = {
    name: "",
    city: "",
    address: "",
    capacity: "",
    costPerDay: "",
    verified: "",
    rating: "",
    noOfCaredPets: "",
    acceptedPets: [],
    petSize: "",
    noOfWalksPerDay: "",
    outerAreaSize: "",
    emergencyTransportFacility: ""
  }
  const [formData, setFormData] = useState(dummyData)
  const handleInput = (e) => {
    const { value, name, id, type, checked, className } = e.target

    if (type == 'checkbox') {
      console.log({ type, checked, name, className })
      if (checked) {
        if (!formData.acceptedPets.includes(name))
          setFormData({ ...formData, [className]: [...formData[className], name] })
      }
      else {
        if (formData.acceptedPets.includes(name))
          setFormData({ ...formData, [className]: formData[className].filter(pet => pet != name) })
      }
    }
    else
      setFormData({ ...formData, [name]: value })
  }
  const baseUrl = `https://vijendra-mini-petboard-app.herokuapp.com`
  const postDataOnServer = async () => {
    const response1 = await fetch(`${baseUrl}/add`, {
      method: "POST",
      body: JSON.stringify({
        overview: {
          name: formData.name,
          city: formData.city,
          address: formData.address,
          capacity: formData.capacity,
          costPerDay: formData.costPerDay,
          verified: formData.verified,
          rating: formData.rating,
        },
        more: {
          noOfCaredPets: formData.noOfCaredPets,
          acceptedPets: formData.acceptedPets,
          petSize: formData.petSize,
          noOfWalksPerDay: formData.noOfCaredPets,
          outerAreaSize: formData.outerAreaSize,
          emergencyTransportFacility: formData.emergencyTransportFacility
        }
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    setFormData(dummyData)
    alert('You are done.')
  }
  return (
    <Stack
      justifyContent={"center"}
      alignContent={'center'}
      mt={1}
      sx={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px" }}
    >
      <Grid padding={3} sx={{ width: "80%", margin: "auto", boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px" }}>
        <Grid padding={3} sx={{ margin: "auto" }}>
          <Typography variant="h1" gutterBottom sx={{ textDecoration: "underline", fontSize: 30, fontWeight: "bold" }}>
            Overview
          </Typography>
          <Grid container spacing={3} >
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="name"
                name="name"
                label="Pet House Name"
                fullWidth
                variant="standard"
                onChange={handleInput}
                value={formData.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                autoComplete='address'
                fullWidth
                variant="standard"
                onChange={handleInput}
                value={formData.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                // autoComplete="shipping address-level2"
                variant="standard"
                onChange={handleInput}
                value={formData.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="capacity"
                name="capacity"
                label="Capacity"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleInput}
                value={formData.capacity}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="costPerDay"
                name="costPerDay"
                label="Cost Per Day"
                fullWidth
                type="number"
                variant="standard"
                onChange={handleInput}
                value={formData.costPerDay}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="rating"
                name="rating"
                label="Rating"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleInput}
                value={formData.rating}
                error={formData.rating < 0 || formData.rating > 5}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="standard" sx={{  width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">Is it verified ...?</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id='verified'
                  name='verified'
                  onChange={handleInput}
                  label="Age"
                  value={formData.emergencyTransportFacility}
                >
                  <MenuItem value={true} >Verified</MenuItem>
                  <MenuItem value={false}>Not Verified</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid padding={3} sx={{ margin: "auto" }}>
          <Typography variant="h1" gutterBottom sx={{ textDecoration: "underline", fontSize: 30, fontWeight: "bold" }}>
            Details
          </Typography>
          <Grid container spacing={3} >
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="noOfCaredPets"
                name="noOfCaredPets"
                label="No. of pets that can be cared in one go"
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                variant="standard"
                onChange={handleInput}
                fullWidth
                value={formData.noOfCaredPets}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="noOfWalksPerDay"
                name="noOfWalksPerDay"
                label="No. of walks provide to pet in one day"
                type='number'
                fullWidth
                variant="standard"
                onChange={handleInput}
                value={formData.noOfWalksPerDay}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">Pet Size</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id='petSize'
                  name='petSize'
                  label="Age"
                  onChange={handleInput}
                  value={formData.petSize}
                >
                  <MenuItem value={"01-05"}>01-05 kg</MenuItem>
                  <MenuItem value={"06-10"}>06-10 kg</MenuItem>
                  <MenuItem value={"11-15"}>11-15 kg</MenuItem>
                  <MenuItem value={"16-20"}>16-20 kg</MenuItem>
                  <MenuItem value={"21-25"}>21-25 kg</MenuItem>
                  <MenuItem value={"26-30"}>26-30 kg</MenuItem>
                  <MenuItem value={"31-35"}>31-35 kg</MenuItem>
                  <MenuItem value={"35"}>35+ kg</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">Outdoor Area Size</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  name='outerAreaSize'
                  id='outerAreaSize'
                  onChange={handleInput}
                  value={formData.outerAreaSize}
                >
                  <MenuItem value="Small">Small</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Large">Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">Emergency Transport Availability</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id='emergencyTransportFacility'
                  name='emergencyTransportFacility'
                  onChange={handleInput}
                  label="Age"
                  value={formData.emergencyTransportFacility}
                >
                  <MenuItem value={true}>Abailable</MenuItem>
                  <MenuItem value={false}>Not Available</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction={"row"} justifyContent='space-evenly' alignContent={"center"}>
                <Stack justifyContent='center' alignContent={"center"}>
                  <Typography variant='h6' sx={{ fontSize: 16 }}>Pet Type : </Typography>
                </Stack>
                <label htmlFor="dog">
                  Dog
                  <input type="checkbox" className='acceptedPets' name='dog' id='dog' onClick={handleInput} />
                </label>
                <label htmlFor="cat">
                  cat
                  <input type="checkbox" className='acceptedPets' name='cat' id='cat' onClick={handleInput} />
                </label>
                <label htmlFor="rabbit">
                  Rabbit
                  <input type="checkbox" className='acceptedPets' name='rabbit' id='rabbit' onClick={handleInput} />
                </label>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Stack
          mt={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" size='large' onClick={postDataOnServer}>Submit</Button>
        </Stack>
      </Grid>
    </Stack>
  );
}