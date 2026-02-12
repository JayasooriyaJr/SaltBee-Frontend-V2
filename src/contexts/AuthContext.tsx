import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, LoginRequest } from '@/services/api';
import { toast } from 'sonner';

interface User {
    id: string; // or number based on backend
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    login: (data: LoginRequest, sessionToken?: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(() => {
        return localStorage.getItem('saltbee-auth-token');
    });

    const isAuthenticated = !!accessToken;

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('saltbee-auth-token', accessToken);
            // Optionally fetch user details here if not contained in login response
            // api.get('/customer/me').then(res => setUser(res.data)).catch(() => logout());
        } else {
            localStorage.removeItem('saltbee-auth-token');
            setUser(null);
        }
    }, [accessToken]);

    const login = async (data: LoginRequest, sessionToken?: string) => {
        try {
            const response = await api.login(data, sessionToken);
            const { accessToken, sessionLinked, user: userData } = response.data; // Assuming backend returns user object too, otherwise we decode token or fetch me

            setAccessToken(accessToken);
            // setUser(userData); // Update if backend returns user details

            if (sessionLinked) {
                toast.success("Table session linked to your account!");
            }

            toast.success("Successfully logged in!");
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null);
        toast.info("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
