import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavButton.module.scss'

type NavButtonProps = {
	to: string
	style?: string
	icon: string
}

const NavButton = ({ to, style, icon }: NavButtonProps) => {
	return (
		<NavLink to={to} activeClassName={style}>
			<ion-icon name={icon} class={styles.navLink__icon}></ion-icon>
		</NavLink>
	)
}

export default NavButton
