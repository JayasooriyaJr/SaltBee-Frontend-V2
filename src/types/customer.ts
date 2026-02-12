export interface Customer {
    id: string; // or number, depending on backend
    name: string;
    email: string;
    phone?: string;
    picture?: string; // For Google Auth profile picture
    createdAt?: string;
}
