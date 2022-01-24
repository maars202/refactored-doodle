import React, {useState, useEffect} from 'react'

// masonry for images components:
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
// import Masonry from '@mui/lab/Masonry';
// Masonry, 
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { styled } from '@mui/material/styles';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';

import { Link } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

// redux support:
import {selectMarketnfts} from "../features/marketItemsSlice"
import { useSelector } from 'react-redux';

const Label = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // color: theme.palette.text.secondary,
    color: "black",
    fontWeight:"bold",
    // border: '1px solid black',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: "70px",
    width: "33.33%"
  }));

  

const Card = (props) => {
    const marketdata = useSelector(selectMarketnfts)
    console.log("items collected from store: ", marketdata)
    
    const [refreshno, setrefreshno] = useState(0)
    const [filter, setFilter] = useState(0)

    const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          title: 'Fern',
        },
        {
          img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
          title: 'Snacks',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          title: 'Mushrooms',
        },
        {
          img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
          title: 'Tower',
        },
        {
          img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
          title: 'Sea star',
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          title: 'Honey',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
        },
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
        },
        {
          img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
          title: 'Tree',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
        },
        {
          img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
          title: 'Camping Car',
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          title: 'Hats',
        },
        {
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          title: 'Tomato basil',
        },
        {
          img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
          title: 'Mountain',
        },
        {
          img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
          title: 'Bike',
        },
      ];
  useEffect( () => {

  })

    return (
        <div style={styles.container}>
            <div style={styles.smallerContainer} >
                <div style={styles.firstRow}>
                    <div>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search type, ... "
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    </div>
                    <div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Filter</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={filter}
                        onChange={setFilter}
                        label="Filter"
                        placeholder='Filter'
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>2 Bedrooms</MenuItem>
                        <MenuItem value={20}>3 Bedrooms</MenuItem>
                        <MenuItem value={30}>4 Bedrooms</MenuItem>
                        </Select>
                    </FormControl>

                    </div>
                    <div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Ether</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={filter}
                        onChange={setFilter}
                        label="Filter"
                        placeholder='Ether'
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>100 to 200 Ether</MenuItem>
                        <MenuItem value={20}>200 to 300 Ether</MenuItem>
                        <MenuItem value={30}>300 to 400 Ether</MenuItem>
                        </Select>
                    </FormControl>

                    </div>
                    <div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Sort By</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={filter}
                        onChange={setFilter}
                        label="Filter"
                        placeholder='Ether'
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Price</MenuItem>
                        <MenuItem value={20}>Area</MenuItem>
                        <MenuItem value={30}>Bedrooms</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                </div>

                <div style={styles.listings}>
                    
                </div>
                <Box sx={{ minHeight: 829 }}>

        <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
        >
      <Masonry columns={3} spacing={1}>
        {marketdata.map((item, index) => (

            // dk how to make it fixed box size for each listing -- styling problem???
            <Link to={"/listings/"+item.tokenId}>
          <Stack key={index} style={{margin:"10px", width:"50", height: "50"}}>
            {/* <Label>{index + 1}</Label> */}
            <img
            //   src={`${item.img}?w=162&auto=format`}
            //   srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
            src={item.img}
              alt={item.name}
              loading="lazy"
              style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
            />
            {/* <Label>{index + 1}</Label> */}
            <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-around"}}>
            <Label>{item.showers} <BathtubIcon/></Label>
            <Label>{item.bedrooms} <BedIcon/></Label>
            <Label>{item.area} <h2>sqft</h2></Label>
            </div>
          </Stack>
          </Link>
        ))}
      </Masonry>
      </ResponsiveMasonry>
    </Box>
            </div>
        </div>

    )
}

export default Card



  
const styles = {
    container: {
        // color: "blue"
    },
    smallerContainer:{
        display:"flex", 
        justifyContent: "center", 
        marginTop: "0px", 
        flexDirection: "column",
        // backgroundColor:"pink",
        padding: "100px"
        },
    firstRow:{  
        display:"flex", 
        // justifyContent: "center", 
        // marginTop: "0px", 
        flexDirection: "row",
        justifyContent: "space-between",
        },
    header_view: {
            },
    item:{
        },

};

