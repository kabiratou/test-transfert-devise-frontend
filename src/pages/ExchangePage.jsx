import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getTauxChange } from "../services/echangeService";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify'; // Importation de react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importation du CSS de toastify
import Sidebar from "../components/common/Sidebar";



const ExchangePage = ({ fromCurrency = "USD", toCurrency = "CAD" }) => {
	const [rate, setRate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchExchangeRate = async () => {
		  setLoading(true);
		  setError(null);
		  try {
			const response = await getTauxChange(fromCurrency, toCurrency);
			if (response.success) {
				console.log("rate:", response.data)
			  setRate(response.data[`${fromCurrency}${toCurrency}`]);
			} else {
			  setError(response.message);
			}
		  } catch (err) {
			setError("Une erreur est survenue lors du chargement du taux de change.");
		  }
		  setLoading(false);
		};
	
		fetchExchangeRate();
	  }, [fromCurrency, toCurrency]);

	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>			
				<ToastContainer style={{ zIndex: 9999 }}/>
				<div className='fixed inset-0 z-0'>
					<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
					<div className='absolute inset-0 backdrop-blur-sm' />
				</div>
				<Sidebar />
			<div className='flex-1 overflow-auto relative z-10'>
				<Header title='Taux de change' />
				<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
					{/* STATS */}
					<motion.div
						className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
					>
						<StatCard name='USD (Dollar A mericain)' icon={Zap}  color='#6366F1' />
						<StatCard name='CAD (Dollar Canadien)' icon={ShoppingBag}  color='#EC4899' />
					</motion.div>

					{/* CHARTS */}
					

					{/* Taux de Change */}
					<div className='bg-gray-800 p-6 rounded-lg shadow-lg text-center'>
						<h3 className='text-xl font-semibold mb-4'>
							Taux de Change {fromCurrency} → {toCurrency}
						</h3>
							<p className='text-red-400'>1.35</p>
					</div>
					<br />
					<div className='bg-gray-800 p-6 rounded-lg shadow-lg text-center'>
						<h3 className='text-xl font-semibold mb-4'>
							Taux de Change {toCurrency} → {fromCurrency}
						</h3>
							<p className='text-red-400'>0.74</p>
					</div>

				{/*	<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<SalesOverviewChart />
						<CategoryDistributionChart />
						<SalesChannelChart />
					</div> */}
				</main>
			</div>
		</div>
	);
};
export default ExchangePage;
