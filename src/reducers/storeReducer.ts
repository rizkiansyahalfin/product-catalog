import type { Action, State, CartItem } from '../types';

export const initialState: State = {
    theme: 'light',
    cartItems: [],
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            };
        case 'ADD_TO_CART': {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
            let newCartItems: CartItem[];

            if (existingItem) {
                newCartItems = state.cartItems.map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
            }

            return { ...state, cartItems: newCartItems };
        }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };
        case 'CLEAR_CART':
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};
