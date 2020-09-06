import React, { useState, useEffect } from 'react';

import app from '../../base.js';
import { User } from 'firebase';

export const AuthContext = React.createContext<firebase.User | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    console.log('provider', currentUser);

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};
