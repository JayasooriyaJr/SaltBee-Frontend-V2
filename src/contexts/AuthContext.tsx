import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, LoginRequest } from '@/services/api';
import { Customer } from '@/types/customer';
import { toast } from 'sonner';

interface AuthContextType {
    user: Customer | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, sessionToken?: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    googleLogin: (googleIdToken: string, sessionToken?: string) => Promise<boolean>;
    logout: () => Promise<void>;
    hasUsedGoogleAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Customer | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('saltbee-auth-token');
            if (!token) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            const customer = await api.getCurrentCustomer();
            if (customer) {
                setUser(customer);
            } else {
                setUser(null);
                localStorage.removeItem('saltbee-auth-token');
            }
        } catch (error: any) {
            // If 401, token is invalid
            console.error('Auth check error:', error);
            setUser(null);
            localStorage.removeItem('saltbee-auth-token');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, sessionToken?: string): Promise<boolean> => {
        try {
            const response = await api.loginCustomer(email, password, sessionToken);
            const { accessToken, sessionLinked } = response.data;

            if (accessToken) {
                localStorage.setItem('saltbee-auth-token', accessToken);

                // Fetch full profile immediately
                const customer = await api.getCurrentCustomer();
                setUser(customer);

                if (sessionLinked) {
                    toast.success("Table session linked to your account!");
                } else {
                    toast.success("Successfully logged in!");
                }
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const signup = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            const response = await api.signupCustomer(name, email, password);
            const { accessToken } = response.data;

            if (accessToken) {
                localStorage.setItem('saltbee-auth-token', accessToken);
                const customer = await api.getCurrentCustomer();
                setUser(customer);
                toast.success("Account created successfully!");
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const googleLogin = async (googleIdToken: string, sessionToken?: string): Promise<boolean> => {
        try {
            const response = await api.loginWithGoogle(googleIdToken, sessionToken);
            const { accessToken, sessionLinked } = response.data;

            if (accessToken) {
                localStorage.setItem('saltbee-auth-token', accessToken);
                const customer = await api.getCurrentCustomer();
                setUser(customer);

                if (typeof window !== 'undefined') {
                    localStorage.setItem('hasUsedGoogleAuth', 'true');
                }

                if (sessionLinked) {
                    toast.success("Table session linked to your account!");
                } else {
                    toast.success("Successfully logged in with Google!");
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error('Google login failed:', error);
            return false;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await api.logoutCustomer();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            // Case 1: Customer Logout (Keep Session)
            // We do NOT clear session tokens from OrderContext here.
            // Only clear AUTH state.
            localStorage.removeItem('saltbee-auth-token');
            setUser(null);
            toast.info("Logged out successfully");
        }
    };

    const hasUsedGoogleAuth = (): boolean => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('hasUsedGoogleAuth') === 'true';
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            signup,
            googleLogin,
            logout,
            hasUsedGoogleAuth
        }}>
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
