import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type OrderType = 'dine-in' | 'takeaway' | null;

interface OrderContextType {
    tableNumber: string | null;
    setTableNumber: (table: string | null) => void;
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
    isCheckoutLocked: boolean;
    setIsCheckoutLocked: (locked: boolean) => void;
    resetOrder: () => void;
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

    const resetOrder = () => {
        setTableNumber(null);
        setOrderType(null);
        setIsCheckoutLocked(false);
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
