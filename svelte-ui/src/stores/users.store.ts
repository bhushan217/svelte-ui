import { writable, get } from 'svelte/store';

export interface User {
  name: string;
  _token?: string;
  email: string;
  roles?: string[];
  permissions?:string[];
}
export interface AuthState extends User {
  isAuthenticated: boolean;
  isActive: boolean;
}

const INITIAL_STATE: AuthState = {
  name: 'Guest',
  email: 'gurst@temp.user',
  isAuthenticated: false,
  isActive: false
}

export const authStore = ((initialState) => {
  const { subscribe, set, update } = writable(initialState);
  return {
    subscribe,
    set,
    get,
    update,
    reset: () => set(initialState)
  };
})(INITIAL_STATE);