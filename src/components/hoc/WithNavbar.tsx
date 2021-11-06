import React from 'react'
import Navbar from '../Navbar/Navbar'
import styles from './WithNavbar.module.scss'

const WithNavbar = <P extends object>(
	ChildComponent: React.ComponentType<P>
) => {
	const NewComponent = (props: any) => {
		return (
			<div className={styles.withNavbar}>
				<Navbar />
				<ChildComponent {...props} />
			</div>
		)
	}

	return NewComponent
}

export default WithNavbar
