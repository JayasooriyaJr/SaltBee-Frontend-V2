import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';

export type OrderType = 'dine-in' | 'takeaway' | null;

export type OrderStatus = 'preparing' | 'ready' | 'served';

export type PaymentStatus = 'paid' | 'pending';

export interface ActiveOrder {
    id: string;
    items: CartItem[];
    status: OrderStatus;
    totalAmount: number;
    timestamp: number;
    orderType: OrderType;
    tableNumber?: string;
    paymentStatus: PaymentStatus;
}

interface OrderContextType {
    tableNumber: string | null;
    setTableNumber: (table: string | null) => void;
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
    isCheckoutLocked: boolean;
    setIsCheckoutLocked: (locked: boolean) => void;
    resetOrder: () => void;
    activeOrders: ActiveOrder[];
    addActiveOrder: (items: CartItem[], total: number, paymentStatus: PaymentStatus) => void;
    sessionToken: string | null;
    setSessionToken: (token: string | null) => void;
    customerId: string | null;
    setCustomerId: (id: string | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tableNumber, setTableNumber] = useState<string | null>(() => {
        const saved = localStorage.getItem('saltbee-table-number');
        return saved || null;
    });

    const [orderType, setOrderType] = useState<OrderType>(() => {
        const saved = localStorage.getItem('saltbee-order-type');
        return (saved as OrderType) || null;
    });

    const [isCheckoutLocked, setIsCheckoutLocked] = useState<boolean>(() => {
        const saved = localStorage.getItem('saltbee-checkout-locked');
        return saved === 'true';
    });

    const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>(() => {
        const saved = localStorage.getItem('saltbee-active-orders');
        return saved ? JSON.parse(saved) : [];
    });

    const [sessionToken, setSessionToken] = useState<string | null>(() => {
        return localStorage.getItem('saltbee-session-token') || null;
    });

    const [customerId, setCustomerId] = useState<string | null>(() => {
        return localStorage.getItem('saltbee-customer-id') || null;
    });

    // Persist to localStorage
    useEffect(() => {
        if (tableNumber) {
            localStorage.setItem('saltbee-table-number', tableNumber);
        } else {
            localStorage.removeItem('saltbee-table-number');
        }
    }, [tableNumber]);

    useEffect(() => {
        if (orderType) {
            localStorage.setItem('saltbee-order-type', orderType);
        } else {
            localStorage.removeItem('saltbee-order-type');
        }
    }, [orderType]);

    useEffect(() => {
        localStorage.setItem('saltbee-checkout-locked', String(isCheckoutLocked));
    }, [isCheckoutLocked]);

    useEffect(() => {
        localStorage.setItem('saltbee-active-orders', JSON.stringify(activeOrders));
    }, [activeOrders]);

    useEffect(() => {
        if (sessionToken) {
            localStorage.setItem('saltbee-session-token', sessionToken);
        } else {
            localStorage.removeItem('saltbee-session-token');
        }
    }, [sessionToken]);

    useEffect(() => {
        if (customerId) {
            localStorage.setItem('saltbee-customer-id', customerId);
        } else {
            localStorage.removeItem('saltbee-customer-id');
        }
    }, [customerId]);

    const addActiveOrder = (items: CartItem[], total: number, paymentStatus: PaymentStatus) => {
        const newOrder: ActiveOrder = {
            id: Math.random().toString(36).substring(2, 9),
            items,
            status: 'preparing',
            totalAmount: total,
            timestamp: Date.now(),
            orderType,
            tableNumber: tableNumber || undefined,
            paymentStatus
        };
        setActiveOrders(prev => [newOrder, ...prev]);
    };

    const resetOrder = () => {
        setTableNumber(null);
        setOrderType(null);
        setIsCheckoutLocked(false);
        setSessionToken(null);
        setCustomerId(null);
    };

    return (
        <OrderContext.Provider
            value={{
                tableNumber,
                setTableNumber,
                orderType,
                setOrderType,
                isCheckoutLocked,
                setIsCheckoutLocked,
                resetOrder,
                activeOrders,
                addActiveOrder,
                sessionToken,
                setSessionToken,
                customerId,
                setCustomerId,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};
