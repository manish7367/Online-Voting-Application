import React from 'react'
import GridAbout from './GridAbout'
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles['about-section']}>
      <h1 className={styles['about-heading']}>Follow these easy steps</h1>
      <div className={styles['grid-container-about']}>
        <GridAbout step="Register yourself by filing the required informations" image="step1.png"/>
        <GridAbout step="SignIn as User" image="step2.png" />
        <GridAbout step="Go to vote option on dashboard" image="step3.png" />
        <GridAbout step="Give Security Key" image="step4.png" />
        <GridAbout step="Vote your candidate and submit" image="step5.png" />
      </div>
    </div>
  )
}

export default About