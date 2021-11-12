import React from 'react'
import styles from './Navbar.module.scss'
import NavButton from '../UI/NavButton'
import avatar from '../../assets/images/tasks-avatar.png'

const Navbar = () => {
	const onLogoutHandler = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
	}
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar__links}>
				<NavButton to='/' type='img' src={avatar} alt='user avatar' />
				<NavButton
					to='/projects/1/sfsdf'
					type='icon'
					icon='exit-outline'
					stylee='activeLink'
				/>
			</div>
			<div className={styles.navbar__links}>
				<NavButton
					to='/'
					type='icon'
					icon='exit-outline'
					onClick={onLogoutHandler}
				/>
			</div>
		</nav>
	)
}

export default Navbar
