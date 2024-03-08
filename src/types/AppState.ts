import type { User } from '.';

export interface AppState {
    user: User;
    isLoading: boolean;
}
