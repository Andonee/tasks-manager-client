import React from 'react'
import styles from './Navbar.module.scss'
import NavButton from '../UI/NavButton'

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar__links}>
				<NavButton to='/' icon='exit-outline' />
			</div>
			<div className={styles.navbar__links}>
				<NavButton to='/' icon='exit-outline' />
			</div>
		</nav>
	)
}

export default Navbar
