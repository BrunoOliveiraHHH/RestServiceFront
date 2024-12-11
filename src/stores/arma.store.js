import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/arma`;

export const useArmaStore = defineStore({
  id: "arma",
  state: () => ({
    armas: {},
    arma: {},
    retorno: {},
  }),
  actions: {
    async register(arma) {
      this.retorno = false;
      try {
        this.retorno = await fetchWrapper.post(`${baseUrl}/salvar`, arma);
      } catch (error) {
        this.retorno = { error };
      }
    },
    async getAll() {
      this.armas = { loading: true };
      try {
        this.armas = await fetchWrapper.get(`${baseUrl}/consulta`);
      } catch (error) {
        this.armas = null;
      }
    },
    async getById(id) {
      this.arma = { loading: true };
      try {
        this.arma = await fetchWrapper.get(`${baseUrl}/consulta/${id}`);
      } catch (error) {
        this.arma = null;
      }
    },
    async update(id, params) {
      await fetchWrapper.put(`${baseUrl}/alterar/${id}`, params);
    },
    async delete(nome, user) {
      try{
      await fetchWrapper.get(`${baseUrl}/excluir/${nome},${user}`);
      this.armas = this.armas.filter((x) => x.nome !== nome);
      } catch (error) {
        this.arma = { error };
      }
    },
  },
});
