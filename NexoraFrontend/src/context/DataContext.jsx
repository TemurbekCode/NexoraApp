import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { dataService } from "../services/dataService";

const DataContext = createContext(null);
const initial = { status: "loading", orders: [], products: [], customers: [] };

function reducer(state, a) {
    switch (a.type) {
        case "loading": return { ...state, status: "loading" };
        case "failed": return { ...state, status: "error" };
        case "loaded": return { status: "ready", orders: a.data.orders, products: a.data.products, customers: a.data.customers };
        case "orderStatus":
            return { ...state, orders: state.orders.map((o) => (o.id === a.id ? { ...o, status: a.status } : o)) };
        case "saveProduct": {
            const exists = state.products.some((p) => p.id === a.product.id);
            return { ...state, products: exists ? state.products.map((p) => (p.id === a.product.id ? a.product : p)) : [...state.products, a.product] };
        }
        case "deleteProduct": return { ...state, products: state.products.filter((p) => p.id !== a.id) };
        default: return state;
    }
}

export function DataProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initial);

    const run = useCallback(async (task) => {
        dispatch({ type: "loading" });
        try { dispatch({ type: "loaded", data: await task() }); } catch { dispatch({ type: "failed" }); }
    }, []);

    useEffect(() => { run(dataService.load); }, [run]);
    useEffect(() => { if (state.status === "ready") dataService.save(state); }, [state]);

    const value = useMemo(() => ({
        ...state,
        productsById: new Map(state.products.map((p) => [p.id, p])),
        customersById: new Map(state.customers.map((c) => [c.id, c])),
        setOrderStatus: (id, status) => dispatch({ type: "orderStatus", id, status }),
        saveProduct: (product) => dispatch({ type: "saveProduct", product }),
        deleteProduct: (id) => dispatch({ type: "deleteProduct", id }),
        retry: () => run(dataService.load),
        resetDemo: () => run(dataService.reset),
    }), [state, run]);

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used inside <DataProvider>");
    return ctx;
}