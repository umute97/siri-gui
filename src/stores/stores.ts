import { defineStore } from 'pinia';

export const useAddressesStore = defineStore({
    id: 'addresses',
    state: () => ({
        backendBaseIP: 'http://localhost',
        gatewayPort: '5555',
    }),
    getters: {
        getFullGatewayAddress(): string {
            return this.backendBaseIP + ':' + this.gatewayPort;
        },
    },
});