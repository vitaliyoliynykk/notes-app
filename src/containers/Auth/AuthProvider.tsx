import React, { useState, useEffect } from 'react';

import app from '../../base.js';

export const AuthContext = React.createContext<firebase.User | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};
