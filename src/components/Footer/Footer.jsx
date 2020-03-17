import React from 'react'
import styles from './Footer.module.css'

const Footer = (props) =>{
    const date = new Date();
    return (
        <footer className={styles.footer}>
            <h5>{date.getFullYear()} &copy; ООО Горизонт</h5>
        </footer>
    )
}

export default Footer