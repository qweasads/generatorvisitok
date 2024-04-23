import './App.scss'
import { LoginForm } from './login-form/LoginForm'
import { useAuth } from './providers/useAuth'
import Visitka from './components/Visitka.tsx'

function App() {
	const { user, logoutUser } = useAuth()

	return (
		<>
			{user ? (
				<div>
					{/* <h1>Ты в системе!</h1> */}
					<Visitka />
					<button className='logoutButton' onClick={() => logoutUser()}>Выйти</button>
				</div>
			) : (
				<LoginForm />
			)}
		</>
	)
}

export default App;