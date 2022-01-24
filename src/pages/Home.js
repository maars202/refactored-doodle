
import React, { Component } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'
import axios from 'axios'
import Navbar from "../components2/NavigationBar"


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

// reduxsupport:
import { setMarketNfts, setMyNfts } from '../features/marketItemsSlice';
import { useDispatch, connect } from 'react-redux';

// NFT_ADDRESS, NFT_ABI
import { NFT_ADDRESS, NFT_ABI} from '../blockchainconfig'

class Home extends Component {
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
    const dataitems = await Promise.all(data.slice(0, data.length - 2).map(async (i) => {
      // tokenURI is a inherited method of ERC721URIStorage contract: that gives content in nft like string
      const tokenUri = await this.state.tokenContract.methods.tokenURI(i.tokenId).call()
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

    this.props.setMarketNfts(items)
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
                <Link to={"/listings"}>
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




const mapStateToProps = (state) => {
  return {
    marketNfts: state.marketNfts,
    mynfts: state.mynfts,
  }

}


const mapDispatchToProps = (dispatch) => {
  return {
    setMarketNfts: (action) => dispatch(setMarketNfts(action)),
    setMyNfts: (action) => dispatch(setMyNfts(action))
  }

}

// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home)





