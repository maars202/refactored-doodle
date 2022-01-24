import React, {useState, useEffect} from 'react'
import { useParams } from "react-router";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {selectMarketnfts} from "../features/marketItemsSlice"
import { useSelector } from 'react-redux';

import Web3 from 'web3'
import { ethers } from 'ethers'
import axios from 'axios'
import { NFT_ADDRESS, NFT_ABI
} from '../blockchainconfig'

async function itempromisemapping(data, tokenContract){
    console.log("reached item promising")
    const dataitems = await Promise.all(data.map(async (i) => {
      // tokenURI is a inherited method of ERC721URIStorage contract: that gives content in nft like string
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call()
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        img:tokenUri,
        name: i.name,
        tokenId: parseInt(i.tokenId),
        seller: i.seller,
        owner: i.owner,
        price: price,
        sold: i.sold,
        amountLeft: parseInt(i.amountLeft),
        startDate: i.startDate,
        deposit: parseInt(i.deposit),
        bedrooms: parseInt(i.bedrooms),
        showers: parseInt(i.showers),
        area: parseInt(i.area)
      }
      return item
    }))

    return dataitems
  }


  async function loadmarketitems(id) {

    const web3 = new Web3(window.web3.currentProvider);

    // const marketContract = new web3.eth.Contract(NFT_MARKET_ABI, NFT_MARKET_ADDRESS)
    const tokenContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS)


    const data = await tokenContract.methods.fetchListingItems().call()

    // getting specific info for only one id:
    const itemmatch = data.filter(i => i.tokenId === id)
    console.log("data fetched ", id,": ", itemmatch)
    const itemmatchdata = await itempromisemapping(itemmatch, tokenContract)
    console.log("items collated: ", itemmatchdata)
    /* create a filtered array of items that have been sold */

    
    return itemmatchdata[0]
}


const Card = (props) => {
    const bedrooms = ["One", "Two", "Three", "Four", "Five"]
    const [refreshno, setrefreshno] = useState(0)
    const initial_dummy_data = {
        amountLeft: 86,
        area: 2508,
        bedrooms: 4,
        deposit: 37,
        img: "https://gateway.pinata.cloud/ipfs/QmXb4EEZ77zmXAbLo522EojCQRdP86Dc6j79SFxjo5yX6K?preview=1",
        name: "Helios Residences",
        owner: "0x0000000000000000000000000000000000000000",
        price: 123,
        seller: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        showers: 2,
        sold: false,
        startDate: "0",
        tokenId: 1}
    const [currentHouse, setCurrentHouse] = useState(null)
    let { tokenid } = useParams();
    console.log(typeof(tokenid))
    const marketdata = useSelector(selectMarketnfts)
    console.log("items collected from store: ", marketdata)
    console.log("items collected from store: ", marketdata)
    
    
  useEffect( async () => {
    // let { tokenid } = useParams();
    // const itemmatch = marketdata.filter(i => i.tokenId === parseInt(tokenid))
    // console.log("current item: ", itemmatch)
    //  setCurrentHouse(itemmatch)
    // console.log("items collected from store: ", marketdata)
    // const itemmatch = marketdata.filter(i => i.tokenId === tokenid)
    // console.log("current item: ", itemmatch)
    // setCurrentHouse(itemmatch)

    // Fetch post using the postSlug
    const itemmatchdata = await loadmarketitems(tokenid)
    setCurrentHouse(itemmatchdata)
    console.log("this is data to be printed: ", JSON.stringify(itemmatchdata))

  }, [tokenid])

    return (
        <div>

           {currentHouse != null ? 
           <div style={styles.mainContainer}>
               <div style={styles.title}>
                <h1>{currentHouse.name}</h1>
                <div style={{display:"flex", flexDirection:"row"}}> 
                    <img src="/image 3.png" style={{height:"50px", margin: "10px"}}></img>
                    <h1> {currentHouse.price * 10000000000000000000}</h1>
                </div>
               </div>
               <div style={styles.infoImg}e>
                <img src={currentHouse.img} style={{width:"50%"}}/>
                <div style={styles.info}>
                    {/* <h1>Hellooooo {currentHouse.name}</h1> */}
                    <div style={styles.vrModule}>
                        <div >
                            <img style={{maxWidth:"300px", maxHeight:"300px"}} src={currentHouse.img}/>
                        </div>
                        <div style={styles.vrMiniItems}> 
                        <h2 style={{color:"lightgrey"}}>{currentHouse.area} sqft</h2>
                        
                        
                        <div style={{display: "flex", 
                        flexDirection: "row", 
                        width:"40%", backgroundColor:"white", marginLeft: "240px", textAlign: "center", 
                        borderRadius: "10px", padding: "0px", justifyContent: "center", border: "2px solid black"}}>
                         <p>Price History</p>
                         <StackedLineChartIcon />
                        </div>
                        <div style={{padding:"0px", width:"60%", 
                        // backgroundColor:"orange"
                        }}>
                            <Button style={{marginLeft: "10px",width:"400px"}} variant="contained"> Real-Time Rendering VR Tours <ArrowForwardIcon/></Button>
                        </div>

                        </div>

                    </div>
                    <div style={styles.miniImages}>
                        <img src={currentHouse.img} style={styles.miniActualImage}/>
                        <img src={currentHouse.img} style={styles.miniActualImage}/>
                        <img src={currentHouse.img} style={styles.miniActualImage}/>
                        <img src={currentHouse.img} style={styles.miniActualImage}/>
                        <img src={currentHouse.img} style={styles.miniActualImage}/>

                        
                    </div>
                    <div style={{border:"1px solid black", borderRadius:"10px", marginTop: "10px", padding: "20px"}}> 
                        <div style={{padding: "0px", borderBottom:"1px solid lightgrey"}}><h2>Description</h2></div>
                        
                    <p>A {currentHouse.name} Semi Detached for Sale!</p>
                        <ul>
                        <li>{bedrooms[currentHouse.bedrooms]} bedrooms</li>
                        <li>Spacious Kitchen</li>
                        <li>Private Garden</li>
                        <li>5 mins walk from Hillview MRT Station</li>

                        </ul>


Kindly call 8303#### for further enquiry
</div>
                </div>
            
               </div>
               <div>
                {/* <h1>Hellooooo {currentHouse.name}</h1> */}
               </div>

                
                
           </div> : 
           <div>
               <h1>No such property</h1>
               </div>
           }
            
        </div>

    )
}

export default Card



  
const styles = {
    mainContainer: {
        // color: "blue",
        display: "flex",
        // backgroundColor: "pink",
        flexDirection: "column",
        margin: "60px"
    },
    title:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
        
        },
        infoImg:{  
            display: "flex",
        flexDirection: "row",
        },
    info: {
        display: "flex",
        flexDirection: "column",
        // padding:"10px"
        margin:"10px"
            },
            miniImages:{
                display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
        },
        miniActualImage:{
            maxWidth:"100px", maxHeight:"100px", marginLeft: "10px"
        },
        vrModule: {
            display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        textAlign: "right"

        },
        vrMiniItems:{
            display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly"
        }

};

