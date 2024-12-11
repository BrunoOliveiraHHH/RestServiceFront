import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/armadura`;

export const useArmaduraStore = defineStore({
  id: "armadura",
  state: () => ({
    armaduras: {},
    armadura: {},
    retorno: {},
  }),
  actions: {
    async register(armadura) {
      this.retorno = false;
      try {
        this.retorno = await fetchWrapper.post(`${baseUrl}/salvar`, armadura);
      } catch (error) {
        this.retorno = { error };
      }
    },
    async getAll() {
      this.armaduras = { loading: true };
      try {
        this.armaduras = await fetchWrapper.get(`${baseUrl}/consulta`);
      } catch (error) {
        this.armaduras = null;
      }
    },
    async getById(id) {
      this.armadura = { loading: true };
      try {
        this.armadura = await fetchWrapper.get(`${baseUrl}/consulta/${id}`);
      } catch (error) {
        this.armadura = null;
      }
    },
    async update(id, params) {
      await fetchWrapper.put(`${baseUrl}/alterar/${id}`, params);
    },
    async delete(nome, user) {
      try{
      await fetchWrapper.get(`${baseUrl}/excluir/${nome},${user}`);
      this.armaduras = this.armaduras.filter((x) => x.nome !== nome);
      } catch (error) {
        this.armadura = { error };
      }
    },
  },
});
