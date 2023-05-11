import React from 'react'
import { NavLink, Routes, Router, Route, Switch } from 'react-router-dom'
import "../Pages/Home.css"
import { Button } from "reactstrap";
import Order from './Order';



const Home = () => {

  return (

    <div class="main-container">
      <div className='motto-container'>
        <p>KOD ACIKTIRIR</p>
        <p>PIZZA, DOYURUR</p>
      </div>
      <div class="button-side">
        <NavLink to="/order"><Button>Acıktım</Button></NavLink>
      </div>
      <div className='photo-page'>
      </div>
    </div>

  )
}

export default Home