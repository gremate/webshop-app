import type { AppState, User } from '../types';
import React, { createContext, useContext, useReducer } from 'react';

interface AppProviderProps {
    children: React.ReactNode;
}

type ActionType = { type: 'set_user'; payload: User } | { type: 'set_loading'; payload: boolean };

const AppContext = createContext<AppState | null>(null);
const AppDispatchContext = createContext<React.Dispatch<ActionType> | null>(null);
const initialState: AppState = { user: { name: 'Test', isAdmin: false }, isLoading: false };

function reducer(state: AppState, action: ActionType): AppState {
    switch (action.type) {
        case 'set_user':
            return { ...state, user: action.payload };
        case 'set_loading':
            return { ...state, isLoading: action.payload };
        default: {
            const exhaustiveCheck: never = action;

            throw new Error(`Unknown action: ${exhaustiveCheck}`);
        }
    }
}

export function AppProvider({ children }: AppProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
        </AppContext.Provider>
    );
}

export function useAppState() {
    const appState = useContext(AppContext);

    if (!appState) {
        throw new Error('AppContext is missing');
    }

    return appState;
}

export function useAppDispatch() {
    const dispatch = useContext(AppDispatchContext);

    if (!dispatch) {
        throw new Error('AppContext is missing');
    }

    return dispatch;
}
