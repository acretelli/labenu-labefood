import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from '../../context/AppContext';
import { ProfileUpdate } from "../ProfileUpdate/ProfileUpdate";
import { Menu } from "../Menu/Menu";
  
export const ProfilePage = () => {

    return (
        <div className="container">
            <h2>Perfil</h2>
            <ProfileUpdate />
            <Menu />
        </div>
    )
}