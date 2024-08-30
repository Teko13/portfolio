import React from 'react';
import {AiOutlineHome} from "react-icons/ai";
import {AiOutlineUser} from "react-icons/ai";
import "../nav/nav.css";
import {GrPersonalComputer} from "react-icons/gr";
import {AiFillCode} from "react-icons/ai"
import {FiAtSign} from "react-icons/fi"
import {SiArtifacthub} from "react-icons/si"
const Nav_temp = () => {
    return (
        <div>
            <ul className="nav-list">
                <li className='nav-btn'><a href="#header"><AiOutlineHome /></a></li>
                <li className='nav-btn'><a href="#about"><AiOutlineUser /></a></li>
                <li className='nav-btn'><a href="#portfolio"><AiFillCode /></a></li>
                <li className='nav-btn'><a href="#footer"><FiAtSign /></a></li>
            </ul>

        </div>
    );
};

export default Nav_temp;