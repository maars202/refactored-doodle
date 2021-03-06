import logo from './logo.svg'
import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { ethers } from 'ethers'
import axios from 'axios'
import Navbar from "./components2/NavigationBar"


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

// NFT_ADDRESS, NFT_ABI
import { NFT_ADDRESS, NFT_ABI} from './blockchainconfig'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }



  // struct MarketItem {
  //   string name;
  //   uint256 tokenId;
  //   address payable seller;
  //   address payable owner;
  //   uint256 price;
  //   bool sold;
  //   uint256 amountLeft;
  //   uint startDate;
  //   uint256 deposit;
  //   uint256 bedrooms;
  //   uint256 showers;
  //   uint256 area;
  // }

  async itempromisemapping(data){
    console.log("reached item promising")
    // const data2 = [1,2,3]
    const dataitems = await Promise.all(data.slice(0, data.length - 2).map(async (i) => {
      // console.log("this.state.tokenContract: ", this.state.tokenContract)

      // tokenURI is a inherited method of ERC721URIStorage contract: that gives content in nft like string
      const tokenUri = await this.state.tokenContract.methods.tokenURI(i.tokenId).call()
      // console.log("rendering tokenid: ", i.tokenId, typeof(i.tokenId))
      // console.log("i: ", i)
      // const meta = await axios.get(tokenUri)
      // console.log("meta",meta)
      // let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        img:tokenUri,
        name: i.name,
        tokenId: parseInt(i.tokenId),
        seller: i.seller,
        owner: i.owner,
        price: parseInt(i.price),
        sold: i.sold,
        amountLeft: parseInt(i.amountLeft),
        startDate: i.startDate,
        deposit: parseInt(i.deposit),
        bedrooms: parseInt(i.bedrooms),
        showers: parseInt(i.showers),
        area: parseInt(i.area)

        // name: meta.data.name, 
        // description: meta.data.name, 
        // price,
        // tokenId: Number(i.tokenId),
        // seller: i.seller,
        // owner: i.owner,
        // sold: i.sold,
        // image: meta.data.image,
      }
      return item
    }))

    return dataitems
  }



  async loadBlockchainData() {
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

  constructor(props) {
    super(props)
    this.state = { account: '' }
    this.itempromisemapping = this.itempromisemapping.bind(this);
  }
  render() {
  return (
    // <div className="container">
    //     <h1>Hello, World!</h1>
    //     <p>Your account: {this.state.account}</p>
    //   </div>
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
  );
  }
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


export default App;
