import { Route, Routes } from "react-router-dom";
import DashPage from "./pages/DashPage";
import ClientsPage from "./pages/ClientsPage";
import ExchangePage from "./pages/ExchangePage";
import TransfertPage from "./pages/TransfertPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ComptesPage from "./pages/ComptesPage";
import { AuthProvider } from "./context";

function App() {
	return (
		<div>
			{/* BG */}	
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/home' element={<DashPage />} />
					<Route path='/clients' element={<ClientsPage />} />
					<Route path='/comptes' element={<ComptesPage />} />
					<Route path='/exchange' element={<ExchangePage />} />
					<Route path='/transfert' element={<TransfertPage />} />				
				</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
