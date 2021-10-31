import React from 'react'
import logo from './logo.svg'
import './App.css'

type AppProps = {
	children: React.ReactNode
}

function App({ children }: AppProps) {
	return <div className='App'>{children}</div>
}

export default App
