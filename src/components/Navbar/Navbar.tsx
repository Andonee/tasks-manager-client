import React from 'react'
import styles from './Navbar.module.scss'
import NavButton from '../UI/NavButton'

const Navbar = () => {
	const onLogoutHandler = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
	}
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar__links}>
				<NavButton to='/' icon='exit-outline' />
			</div>
			<div className={styles.navbar__links}>
				<NavButton to='/' icon='exit-outline' onClick={onLogoutHandler} />
			</div>
		</nav>
	)
}

export default Navbar
