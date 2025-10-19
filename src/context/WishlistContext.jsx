import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "wishlistIds";
const getStored = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const setStored = (ids) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch { }
};

const WishlistContext = createContext({
    ids: [],
    count: 0,
    has: () => false,
    toggle: () => { },
    add: () => { },
    remove: () => { },
    clear: () => { },
});

export function WishlistProvider({ children }) {
    const [ids, setIds] = useState(() => getStored());

    useEffect(() => setStored(ids), [ids]);

    const api = useMemo(() => ({
        ids,
        count: ids.length,
        has: (id) => ids.some((x) => String(x) === String(id)),
        toggle: (id) => setIds((prev) => (
            prev.some((x) => String(x) === String(id))
                ? prev.filter((x) => String(x) !== String(id))
                : [...prev, id]
        )),
        add: (id) => setIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
        remove: (id) => setIds((prev) => prev.filter((x) => String(x) !== String(id))),
        clear: () => setIds([]),
    }), [ids]);

    return (
        <WishlistContext.Provider value={api}>{children}</WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
