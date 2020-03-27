import React, {FC} from 'react'
import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom"

const Navbar:FC<{}> = () => {
    return (
                <nav className={styles.container}>
                    <div className={styles.menuItem}><NavLink to='/news' activeClassName={styles.activeLink}>Новости</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/projects' activeClassName={styles.activeLink}>Проекты</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/gallery' activeClassName={styles.activeLink}>Галерея</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/job' activeClassName={styles.activeLink}>Работа</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/contacts' activeClassName={styles.activeLink}>Контакты</NavLink></div>
                    <div className={styles.menuItem}><NavLink to='/about' activeClassName={styles.activeLink}>О компании</NavLink></div>
                </nav>
    )
}

export default Navbar

