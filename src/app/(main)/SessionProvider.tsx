"use client";

import { Session, User } from "lucia";
import { createContext, PropsWithChildren, useContext } from "react";

interface SessionContext {
    user: User | null,
    session: Session | null;
}

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
    children,
    value
}: PropsWithChildren<{ value: SessionContext; }>) {
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}