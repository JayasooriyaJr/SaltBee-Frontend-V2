import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Placeholder URL

export const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add Auth Token
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('saltbee-auth-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface SessionStartRequest {
    guestName?: string;
    guestPhone?: string;
}

export interface LoginRequest {
    email: string;
    password?: string;
}

export const api = {
    startSession: async (tableId: string | number, data: SessionStartRequest) => {
        return client.post(`/tables/${tableId}/start-session`, data);
    },

    login: async (data: LoginRequest, sessionToken?: string) => {
        const headers: Record<string, string> = {};
        if (sessionToken) {
            headers['X-Table-Session-Token'] = sessionToken;
        }
        return client.post('/customer/login', data, { headers });
    },

    getMenuItems: async () => {
        return client.get<MenuItem[]>('/menu/items');
    },

    createOrder: async (orderData: OrderPayload) => {
        return client.post('/orders', orderData);
    }
};

export interface MenuItem {
    id: string;
    name: string;
    korean: string;
    description: string;
    price: number;
    image: string;
    category: string;
    spicy?: boolean;
    popular?: boolean;
    vegetarian?: boolean;
}

export interface OrderPayload {
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    totalPrice: number;
    tableNumber?: string | null;
    orderType: 'dine-in' | 'takeaway' | null;
    paymentMethod: 'card' | 'cash' | 'online';
    paymentStatus: 'pending' | 'paid';
    customerDetails?: {
        name: string;
        address?: string;
        pickupTime?: string;
    };
}
