import React from 'react';
import './header.scss'; 
import logo from '@/assets/icons/logo.svg';
import profile from '@/assets/icons/profile.svg';
import tickets from '@/assets/icons/tickets.svg';

const Header: React.FC = () => {
    return (
        <header className="header_navigation">
            <div className='header_navigation_content'>
                <div className="header_left">
                    <a href="/">
                        <img src={logo} alt="Cinema Logo" className="header_icon" />
                    </a>
                </div>
                <nav className="header_center">
                    <a href="/profile" className="header">
                        <img src={profile} alt="Profile" className="header_icon" />
                        Профиль
                    </a>
                    <a href="/orders" className="header">
                        <img src={tickets} alt="Tickets" className="header_icon" />
                        Билеты
                    </a>
                </nav>                
            </div>
            
        </header>
    );
}

export default Header;