import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cartItems"; // [{id, qty}]
const readStore = () => {
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
};
const writeStore = (items) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { } };

const CartContext = createContext({
    items: [], // {id, qty}
    count: 0,
    add: () => { },
    remove: () => { },
    increment: () => { },
    decrement: () => { },
    clear: () => { },
});

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => readStore());
    useEffect(() => writeStore(items), [items]);

    const api = useMemo(() => ({
        items,
        count: items.reduce((sum, it) => sum + (it.qty || 0), 0),
        add: (id, qty = 1) => setItems((prev) => {
            const i = prev.findIndex((p) => String(p.id) === String(id));
            if (i >= 0) {
                const next = [...prev];
                next[i] = { ...next[i], qty: (next[i].qty || 0) + qty };
                return next;
            }
            return [...prev, { id, qty }];
        }),
        remove: (id) => setItems((prev) => prev.filter((p) => String(p.id) !== String(id))),
        increment: (id) => setItems((prev) => prev.map((p) => String(p.id) === String(id) ? { ...p, qty: (p.qty || 0) + 1 } : p)),
        decrement: (id) => setItems((prev) => prev.map((p) => {
            if (String(p.id) !== String(id)) return p;
            const q = Math.max(0, (p.qty || 0) - 1);
            return q === 0 ? null : { ...p, qty: q };
        }).filter(Boolean)),
        clear: () => setItems([]),
    }), [items]);

    return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() { return useContext(CartContext); }
