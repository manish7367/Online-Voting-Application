import React from 'react'
import styles from './About.module.css';

const GridAbout = ({step,image}) => {
  return (
    <>
    <div className={styles['about-image']}>
      <img src={image} height={70} width={81}/>
    </div>
    <div className={styles["about-text"]}>
    <span>{step}</span>
    </div>
    </>
  )
}

export default GridAbout