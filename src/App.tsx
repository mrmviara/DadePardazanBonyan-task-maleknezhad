import { Routes, Route } from 'react-router-dom';

import { AppLayout } from './components/layouts';
import { Home } from './pages';

function App() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<Home />}/>
			</Route>
		</Routes>
	)
}

export default App
