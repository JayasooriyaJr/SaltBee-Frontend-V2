import axios from 'axios';
import { Customer } from '@/types/customer';

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

// Separate namespace for session-related API calls
export const sessionApi = {
    startSession: async (tableId: string | number, data: SessionStartRequest) => {
        return client.post(`/customer/tables/${tableId}/start-session`, data, {
            headers: {
                'X-Tenant-Id': import.meta.env.VITE_TENANT_ID || '1',
                'X-Tenant-Identifier': import.meta.env.VITE_TENANT_IDENTIFIER || 'salt-bee-restaurant'
            }
        });
    },

    addItem: async (tableId: string | number, sessionToken: string, itemDto: any) => {
        return client.post(`/customer/tables/${tableId}/orders/items`, itemDto, {
            headers: {
                'X-Table-Session-Token': sessionToken,
                'X-Tenant-Id': import.meta.env.VITE_TENANT_ID || '1'
            }
        });
    },

    getCurrentOrder: async (tableId: string | number, sessionToken: string) => {
        return client.get(`/customer/tables/${tableId}/orders/current`, {
            headers: {
                'X-Table-Session-Token': sessionToken,
                'X-Tenant-Id': import.meta.env.VITE_TENANT_ID || '1'
            }
        });
    },

    requestBill: async (tableId: string | number, sessionToken: string) => {
        return client.post(`/customer/tables/${tableId}/request-bill`, {}, {
            headers: {
                'X-Table-Session-Token': sessionToken,
                'X-Tenant-Id': import.meta.env.VITE_TENANT_ID || '1'
            }
        });
    }
};

export const api = {
    // Re-export session start for backward compatibility if needed, but prefer sessionApi
    startSession: sessionApi.startSession,

    login: async (data: LoginRequest, sessionToken?: string) => {
        const headers: Record<string, string> = {};
        if (sessionToken) {
            headers['X-Table-Session-Token'] = sessionToken;
        }
        return client.post('/customer/login', data, { headers });
    },

    // New methods for AuthContext
    loginCustomer: async (email: string, password: string, sessionToken?: string) => {
        const headers: Record<string, string> = {};
        if (sessionToken) {
            headers['X-Table-Session-Token'] = sessionToken;
        }
        // Using the same endpoint as 'login', just different signature wrapper
        return client.post('/customer/login', { email, password }, { headers });
    },

    signupCustomer: async (name: string, email: string, password: string) => {
        return client.post('/customer/signup', { name, email, password });
    },

    logoutCustomer: async () => {
        return client.post('/customer/logout');
    },

    getCurrentCustomer: async () => {
        // The response.data should directly be the Customer object based on user snippet
        // But axios returns { data: ... }
        const response = await client.get<Customer>('/auth/customer/me');
        return response.data;
    },

    loginWithGoogle: async (googleIdToken: string, sessionToken?: string) => {
        const headers: Record<string, string> = {};
        if (sessionToken) {
            headers['X-Table-Session-Token'] = sessionToken;
        }
        return client.post('/customer/google-login', { token: googleIdToken }, { headers });
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

// For compatibility with user's snippet which uses 'apiClient'
export default api;
