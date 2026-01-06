import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from './context/StoreContext';
import ProductCard from './components/ProductCard';
import type { Product } from './types';

const AppContent = () => {
    const { state, dispatch } = useStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://fakestoreapi.com/products');
                setProducts(res.data);
                const uniqueCats = ['All', ...new Set((res.data as Product[]).map((p) => p.category))];
                setCategories(uniqueCats as string[]);
            } catch (err) {
                setError('Failed to fetch data from API.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = category === 'All' || p.category === category;
        return matchSearch && matchCategory;
    });

    const isDark = state.theme === 'dark';
    const cartCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className={`min-h-screen transition-colors duration-300 font-sans ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

            {/* Navbar */}
            <nav className={`
        fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md
        ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-slate-200'}
      `}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🛍️</span>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            ShopVibe
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
                            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                            title="Toggle Theme"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>

                        <button
                            className="relative p-2"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <span className="text-xl">🛒</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-current">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

                {/* Filters */}
                <div className={`
          p-6 rounded-2xl shadow-sm mb-10 border
          ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}
        `}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1 opacity-70">Search Product</label>
                            <input
                                type="text"
                                placeholder="Type to search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`
                  w-full px-4 py-2.5 rounded-lg text-sm border focus:ring-2 focus:ring-indigo-500 outline-none transition-all
                  ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300'}
                `}
                            />
                        </div>
                        <div className="md:w-64">
                            <label className="block text-sm font-medium mb-1 opacity-70">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={`
                  w-full px-4 py-2.5 rounded-lg text-sm border focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer
                  ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300'}
                `}
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20 text-red-500">
                        {error}
                    </div>
                )}

                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="text-center py-20 opacity-60">
                        No products found for this search/category.
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>

            {/* Cart Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    {/* Sidebar */}
                    <aside className={`
            relative w-full max-w-md h-full shadow-2xl p-6 flex flex-col z-[70] transform transition-transform duration-300
            ${isDark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800'}
          `}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Your Cart</h2>
                            <button onClick={() => setIsSidebarOpen(false)} className="text-2xl hover:opacity-70">&times;</button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {state.cartItems.length === 0 ? (
                                <div className="text-center py-10 opacity-50">Your cart is empty.</div>
                            ) : (
                                state.cartItems.map((item) => (
                                    <div key={item.id} className={`flex gap-4 p-4 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-slate-100 bg-slate-50'}`}>
                                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white rounded-md p-1" />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-emerald-500 font-bold">${item.price} x {item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                                                    className="text-red-500 text-xs hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between text-xl font-bold mb-4">
                                <span>Total:</span>
                                <span>
                                    ${state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
                                </span>
                            </div>
                            <button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/30"
                                onClick={() => alert('Checkout feature coming soon!')}
                            >
                                Checkout
                            </button>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default AppContent;
