import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavButton.module.scss'

type NavButtonProps = {
	to: string
	stylee?: string
	type: 'icon' | 'img'
	icon?: string
	src?: string
	alt?: string
	onClick?: () => void
}

const NavButton = ({
	to,
	stylee,
	type,
	icon,
	src,
	alt,
	onClick,
}: NavButtonProps) => {
	return (
		<NavLink
			className={styles.navlink}
			to={to}
			activeClassName={stylee}
			onClick={onClick}
		>
			{type === 'img' && <img src={src} alt={alt} />}
			{type === 'icon' && (
				<ion-icon name={icon} class={styles.navlink__icon}></ion-icon>
			)}
		</NavLink>
	)
}

export default NavButton
