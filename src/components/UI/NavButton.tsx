import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavButton.module.scss'

type NavButtonProps = {
	to: string
	style?: string
	icon: string
	onClick?: () => void
}

const NavButton = ({ to, style, icon, onClick }: NavButtonProps) => {
	return (
		<NavLink to={to} activeClassName={style} onClick={onClick}>
			<ion-icon name={icon} class={styles.navLink__icon}></ion-icon>
		</NavLink>
	)
}

export default NavButton
