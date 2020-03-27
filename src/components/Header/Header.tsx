import React, {FC} from 'react'
import styles from './Header.module.css'
import Navbar from "../NavigationBar/Navbar"
import zavod from '../../assets/icons/zavod.svg'

const Header:FC<{}> = () => {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <div className={styles.flame_wrapper}>
                        <div className={`${styles.flame} ${styles.red}`}></div>
                        <div className={`${styles.flame} ${styles.orange}`}></div>
                        <div className={`${styles.flame} ${styles.gold}`}></div>
                        <div className={`${styles.flame} ${styles.white}`}></div>
                        <div className={`${styles.base} ${styles.blue}`}></div>
                    </div>

                    <div className={styles.zav}>
                        <img src={zavod} alt=""/>
                    </div>

                </div>
                <div className={styles.nameContainer}>
                    <div className={styles.ooo}>OOO</div>
                    <div className={styles.name}>Горизонт</div>
                </div>
            </header>
            <Navbar/>
        </div>

    )
}

export default Header