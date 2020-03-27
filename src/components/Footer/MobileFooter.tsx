import React, {FC} from 'react'
import styles from './Footer.module.css'

const MobileFooter:FC<{}> = () =>{
    const date = new Date()
    return (
        <footer className={styles.footerMob}>
            <h5>{date.getFullYear()} &copy; ООО Горизонт</h5>
        </footer>
    )
}

export default MobileFooter