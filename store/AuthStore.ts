import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

type User = {
    _id: string;
    fullname: string;
    email: string;
    // add other fields as needed
};

type Data = {
    email: string;
    password: string;
}

type AuthStore = {
    authUser: User | null;
    token: string | null;
    isLoading: boolean;
    login: (Data : Data) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<void>;
    signup : (Data : Data) => Promise<void>;
};

const API = axios.create({
    baseURL: __DEV__ ? 'https://chat-app-bevh.onrender.com/api' : 'https://your-prod-url.com/api',
    withCredentials: true,
});

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    token: null,
    isLoading: false,

    signup: async (data)=>{
        set({isLoading: true});
        try {
            console.log(data)
            const res = await API.post("/auth/signup", data);
            const { user, token } = res.data;
            await SecureStore.setItemAsync('authToken', token);
            set({authUser: res.data});
            
        } catch (error :any) {
            console.error('Signup failed:', error.response?.data?.message || error.message);
        }finally{
            set({isLoading: false});
        }
    },

    login: async (Data) => {
        set({ isLoading: true });
        try {
            const res = await API.post('/auth/login', Data);
            const { token, _id, fullname, email } = res.data;
            console.log(fullname, email, token)
            // Ensure token is a string before storing it
            await SecureStore.setItemAsync('authToken', String(token));
            const user = {
                _id,
                fullname,
                email,
            }
            set({ authUser: user, token });
        } catch (err: any) {
            console.error('Login failed:', err.response?.data?.message || err.message);
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        try {
            await SecureStore.deleteItemAsync('authToken');
            set({ authUser: null, token: null });
        } catch (err) {
            console.error('Logout failed:', err);
        }
    },

    getUser: async () => {
        try {
            const token = await SecureStore.getItemAsync('authToken');
            if (!token) return;

            const res = await API.get('/auth/get-user', {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ authUser: res.data.user });
            set({ token });
        } catch (err) {
            console.error('Auth check failed');
            set({ authUser: null, token: null });
        }
    },
}));
