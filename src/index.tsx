import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
	ProfilCustomize,
	Project,
	Projects,
	SignIn,
	SignOut,
} from './components/pages'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App>
				<Route exact path='/' component={SignIn} />
				<Route exact path='/signout' component={SignOut} />
				<Route exact path='/:user/projects' component={Projects} />
				<Route exact path='/:user/projects/:projectId' component={Project} />
				<Route
					exact
					path='/:user/projects/:projectId/profile'
					component={ProfilCustomize}
				/>
			</App>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
