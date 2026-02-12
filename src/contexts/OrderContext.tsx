import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';
import { sessionApi } from '@/services/api';
import { toast } from 'sonner';

export type OrderType = 'dine-in' | 'takeaway' | null;

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'SERVED' | 'COMPLETED' | 'CANCELLED';

export type PaymentStatus = 'paid' | 'pending';

// Structure matching backend response for getCurrentOrder
export interface ServerOrder {
    orderId: number;
    tableId: number;
    items: any[];
    totalAmount: number;
    finalAmount: number;
    status: OrderStatus;
    taxAmount?: number;
    serviceChargeAmount?: number;
}

export interface ActiveOrder {
    id: string; // client-side ID or server ID depending on usage
    items: CartItem[];
    status: string; // relaxed type to accommodate backend status strings
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

    // New Session Methods
    serverOrder: ServerOrder | null;
    addToOrder: (items: CartItem[]) => Promise<boolean>;
    requestBill: () => Promise<void>;
    refreshOrder: () => Promise<void>;
    isLoading: boolean;
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

    // New State for Server Order
    const [serverOrder, setServerOrder] = useState<ServerOrder | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
            // Auto-fetch active order when session token exists
            refreshOrder();
        } else {
            localStorage.removeItem('saltbee-session-token');
            setServerOrder(null);
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
        setServerOrder(null);
    };

    // --- New Session Methods ---

    const refreshOrder = async () => {
        if (!tableNumber || !sessionToken) return;
        try {
            const response = await sessionApi.getCurrentOrder(tableNumber, sessionToken);
            setServerOrder(response.data as ServerOrder);
        } catch (error) {
            console.error("Failed to fetch current order:", error);
            // Optional: Handle invalid token by clearing session? 
            // For now, just log to avoid auto-logout loops on transient errors
        }
    };

    const addToOrder = async (items: CartItem[]): Promise<boolean> => {
        if (!tableNumber || !sessionToken) {
            toast.error("No active session found.");
            return false;
        }

        setIsLoading(true);
        try {
            // Iterate and add items one by one
            for (const item of items) {
                const payload = {
                    menuItemId: item.id,
                    quantity: item.quantity,
                    specialInstructions: "", // Future: Add note support in Cart
                    modifiers: [] // Future: Add modifier support in Cart
                };
                await sessionApi.addItem(tableNumber, sessionToken, payload);
            }

            await refreshOrder();
            toast.success("Order updated successfully!");
            return true;
        } catch (error) {
            console.error("Failed to add items to order:", error);
            toast.error("Failed to submit order. Please try again.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const requestBill = async () => {
        if (!tableNumber || !sessionToken) return;

        try {
            await sessionApi.requestBill(tableNumber, sessionToken);
            toast.success("Bill requested. A staff member will be with you shortly.");
        } catch (error) {
            console.error("Failed to request bill:", error);
            toast.error("Failed to request bill.");
        }
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
                // New Exports
                serverOrder,
                addToOrder,
                requestBill,
                refreshOrder,
                isLoading
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
