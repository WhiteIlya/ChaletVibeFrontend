import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    voted: boolean;
    name: string | null;
    isAdmin: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const [voted, setVoted] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [name, setName] = useState<string | null>(null); 


    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        fetchVotedStatus();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const fetchVotedStatus = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setVoted(data.voted);
        setIsAdmin(data.is_admin);
        setName(data.first_name)
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchVotedStatus();
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, voted, name, login, logout, isAdmin}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
