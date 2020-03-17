import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
   /* const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    )
    const scrollWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    )*/
    return (
                <nav className={styles.container}>
                    <div className={styles.menuItem}><NavLink to='/news' activeClassName={styles.activeLink}>Новости</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/projects' activeClassName={styles.activeLink}>Проекты</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/gallery' activeClassName={styles.activeLink}>Галерея</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/job' activeClassName={styles.activeLink}>Работа</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/contacts' activeClassName={styles.activeLink}>Контакты</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/about' activeClassName={styles.activeLink}>О компании</NavLink></div>
                </nav>
    );
}

export default Navbar;

