import { defineStore } from 'pinia';

interface Header {
    operator: string,
    project: string,
    name: string,
}

export const useAddressesStore = defineStore({
    id: 'addresses',
    state: () => ({
        backendBaseIP: '192.168.13.16',
        gatewayPort: '5555',
    }),
    getters: {
        getFullGatewayAddress(): string {
            return this.backendBaseIP + ':' + this.gatewayPort;
        },
    },
});

export const useHeaderStore = defineStore({
    id: 'header',
    state: () => ({
        operator: '',
        project: '',
        name: '',
    }),
    getters: {
        getFormattedHeader(): string {
            return `${this.operator} measuring: ${this.name} of ${this.project}`;
        },
        getHeader(): Header {
            return {
                operator: this.operator,
                project: this.project,
                name: this.name,
            };
        }
    },
    actions: {
        setHeader(operator: string, project: string, name: string): void {
            this.operator = operator;
            this.project = project;
            this.name = name;
        },
    },
});
