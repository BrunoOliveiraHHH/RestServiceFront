import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/npc`;

export const useNpcStore = defineStore({
  id: "npc",
  state: () => ({
    npcs: {},
    npc: {},
    retorno: {},
  }),
  actions: {
    async register(npc) {
      this.retorno = false;
      try {
        this.retorno = await fetchWrapper.post(`${baseUrl}/salvar`, npc);
      } catch (error) {
        this.retorno = { error };
      }
    },
    async getAll() {
      this.npcs = { loading: true };
      try {
        this.npcs = await fetchWrapper.get(`${baseUrl}/consulta`);
      } catch (error) {
        this.npcs = { error };
      }
    },
    async getById(id) {
      this.npc = { loading: true };
      try {
        this.npc = await fetchWrapper.get(`${baseUrl}/consulta/${id}`);
      } catch (error) {
        this.npc = { error };
      }
    },
    async update(id, params) {
      await fetchWrapper.put(`${baseUrl}/alterar/${id}`, params);
    },
    async delete(id) {
      await fetchWrapper.get(`${baseUrl}/excluir/${id}`);
      this.npcs = this.npcs.filter((x) => x.id !== id);
    },
  },
});
