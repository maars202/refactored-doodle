import React, {useState, useEffect} from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
import Web3 from 'web3'
import { ethers } from 'ethers'
import axios from 'axios'

// NFT_ADDRESS, NFT_ABI
import { NFT_ADDRESS, NFT_ABI} from '../blockchainconfig'




async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)

    // loading the contracts:
    const tokenContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS)
    console.log("tokenContract: ", tokenContract)
    this.setState({ tokenContract })

    // const data = await tokenContract.methods.revealCurrentTokens().call()
    const data = await tokenContract.methods.fetchListingItems().call()

    console.log("revealCurrentTokens data: ", data)
    const items = await this.itempromisemapping(data)
    console.log("items collated: ", items)
    /* create a filtered array of items that have been sold */


  }


const HomePage = (props) => {
    

    // const data = await loadBlockchainData();
    const [refreshno, setrefreshno] = useState(0)

  useEffect( () => {

  })

    return (
        <div style={styles.biggerContainer}>
            <div style={styles.container}>
            <div style={styles.content}>
                <h1>H.O.M.E</h1>
                <h5>Happiness, Ownership
                Memories, Everything</h5>
                <Link to={"/"}>
                <div style={{backgroundColor:"white", height:"80px", width:"100%", borderRadius: "20px", color: "black", fontSize:"40px", justifyContent: "center", padding:"4px"}}>
                <p style={{ fontFamily: "DM Sans",
                // fontStyle: normal,
                fontWeight: "bold",
                fontSize: "20px",
                lineHeight: "26px", marginLeft:"10px", justifyContent:"center"}}>See all listings <ArrowForwardIcon/></p>
                </div>
                </Link>
            </div>
            </div>
        </div>

    )
}



const styles={
    container: {
backgroundImage: "url(" + "/homebackground.png" + ")",
      backgroundSize: 'cover',
            //   overflow: 'hidden',
              width:  "100%",
            height: "900px",

    },
    content:{
        // marginVertical: "1000px",
        padding:"80px",
        
        // marginTop: "200px",
        // backgroundColor: "#F5F5DC",
        fontSize:"50px",
        color: "white",
        // display:"flex", 
        // justifyContent: "center", 
        // // marginTop: "0px", 
        // flexDirection: "column"
    }

}
export default HomePage



  
// const styles = {
//     container: {
//         color: "blue"
//     },
//     blog_container:{
//         },
//     post:{  
//         },
//     header_view: {
//             },
//     item:{
//         },

// };

