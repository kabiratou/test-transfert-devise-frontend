import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/home",
	},
	{ name: "Clients", icon: ShoppingBag, color: "#8B5CF6", href: "/clients" },
	{ name: "Comptes", icon: Users, color: "#EC4899", href: "/comptes" },
	{ name: "Taux de Change", icon: DollarSign, color: "#10B981", href: "/exchange" },
	{ name: "Transferts", icon: ShoppingCart, color: "#F59E0B", href: "/transfert" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { logout } = useAuth();

	useEffect(() => {
		if (!auth.isAuthenticated) {
		  toast.error("Veuillez vous connecter d'abord", {
			position: "top-center",
		  });
		  navigate("/");
		}
	  }, [auth, navigate]);

	  const user = auth.user || {};

console.log("user connecte: ",user);
	 // Filtrer les items en fonction du rôle ou du nom de l'utilisateur
	 const filteredItems = user?.nom === "Client"
	 ? SIDEBAR_ITEMS
	 : SIDEBAR_ITEMS.filter((item) =>
		 ["Transferts", "Taux de Change", "Comptes"].includes(item.name)
	   );
 

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{filteredItems.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>

				<button onClick={() => logout()} className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded transition duration-200 w-54 sm:w-50 mb-4'>Déconnexion</button>

			</div>
		</motion.div>
	);
};
export default Sidebar;
