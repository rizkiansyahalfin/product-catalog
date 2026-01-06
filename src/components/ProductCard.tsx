import React from 'react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const { dispatch } = useStore();
    // We can get theme from store if needed, but here we can just use tailwind dark mode classes which rely on the class on 'html' or 'body' or parent. 
    // However, our AppContent passes `className={isDark ...}` to the wrapper, so child components inherit text color. 
    // But ProductCard explicitly sets bg colors. We should check state for theme to be totally synced.
    // Actually, AppContent sets 'dark' on a wrapper div, but ProductCard uses conditional classes based on `isDark` if we pass it or read it.

    // Let's grab state to match the design in Step 116 completely.
    const { state } = useStore();
    const isDark = state.theme === 'dark';

    return (
        <div className={`
      rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      flex flex-col h-full border
      ${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}
    `}>
            <div className="p-6 bg-white flex justify-center items-center h-48">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full object-contain max-w-full"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs uppercase tracking-wider font-semibold opacity-60 mb-2">
                    {product.category}
                </div>

                <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2" title={product.title}>
                    {product.title}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-xl font-bold text-emerald-500">
                        ${product.price.toFixed(2)}
                    </span>

                    <button
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                        className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-colors
              ${isDark
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
            `}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
