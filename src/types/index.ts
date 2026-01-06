export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItem extends Product {
    quantity: number;
}

export interface State {
    theme: 'light' | 'dark';
    cartItems: CartItem[];
}

export type Action =
    | { type: 'TOGGLE_THEME' }
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: number } // id
    | { type: 'CLEAR_CART' };
