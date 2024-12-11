import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/usuario`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        user: {}
    }),
    actions: {
        async register(user) {
            var dtoInput = {
                nome: user.nome,
                email: user.email,
                anoNascimento: user.anoNascimento,
                login: user.login,
                senha: user.senha
            }
            await fetchWrapper.post(`${baseUrl}/salvar`, dtoInput);
        },
        async getAll() {
            this.users = { loading: true };
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/consultar`);    
            } catch (error) {
                this.users = { error };
            }
        },
        async getByLogin(login) {
            this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/consultarPorLogin/${login}`);
            } catch (error) {
                this.user = { error };
            }
        },
        async getById(id) {
            this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/consultar/${id}`);
            } catch (error) {
                this.user = { error };
            }
        },
        async update(id, params) {
            var dtoInput = {
                id: params.id,
                nome: params.nome,
                email: params.email,
                anoNascimento: params.anoNascimento,
                login: params.login,
                senha: params.senha
            }
            await fetchWrapper.put(`${baseUrl}/alterar`, dtoInput);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.users.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.get(`${baseUrl}/excluir/${id}`);

            // remove user from list after deleted
            this.users = this.users.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});
