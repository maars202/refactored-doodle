import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home2,
  About,
  Contact,
  Blog,
  Posts,
  Post,
} from "./components";

// all imports from components2:
import Navbar from "./components2/NavigationBar"
import Home from "./pages/Home"
import Listings from "./pages/Listings"
import SingleHouse from "./pages/SingleHouse"
import BiggerListings from "./pages/listingsMain"


// redux support:
import { store } from './app/Store';
import { Provider } from 'react-redux';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>
  <Router>
    {/* <Navigation /> */}
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/listings" element={<BiggerListings />}>
        <Route path="" element={<Listings />} />
        <Route path=":tokenid" element={<SingleHouse />} />
    </Route>

    {/* <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":tokenid" element={<CardFlip />} />
      </Route> */}


    <Route path="/app" element={<App />} />
      <Route path="/home2" element={<Home2 />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
    </Routes>
    <Footer />
  </Router>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

