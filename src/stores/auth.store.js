import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { router } from "@/router";
import { useAlertStore } from "@/stores";

const baseUrl = `${import.meta.env.VITE_API_URL}/authentication`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      try {
        var dtoInput = {
          login: username,
          senha: password,
        };
        const user = await fetchWrapper.post(`${baseUrl}/autenticar`, dtoInput);
        const alertStore = useAlertStore();
        // update pinia state
        this.user = user;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        if (user) {
          // redirect to previous url or default to home page
          router.push(this.returnUrl || "/");
        } else {
          const alertStore = useAlertStore();
          alertStore.error(
            "Login ou Senha incorreta, favor verificar e tentar novamente!"
          );
        }
      } catch (error) {
        
        useAlertStore.error(error);
      }
    },
    async logout(username, password) {
      try {
        var dtoInput = {
          login: username,
          senha: password,
        };
        const user = await fetchWrapper.post(
          `${baseUrl}/encerra-sessao`,
          dtoInput
        );
        const alertStore = useAlertStore();
        if (user) {
          this.user = null;
          localStorage.removeItem("user");
          router.push("/account/login");
        } else {
          alertStore.error("Erro ao desconectar, favor tentar novamente!");
        }
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async sessaoAtiva(username, password) {
      try {
        var dtoInput = {
          login: username,
          senha: password,
        };
        const user = await fetchWrapper.post(`${baseUrl}/autenticar`, dtoInput);
        const alertStore = useAlertStore();
        // update pinia state
        this.user = user;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        if (user) {
          // redirect to previous url or default to home page
          router.push(this.returnUrl || "/");
        } else {
          alertStore.error(
            "Erro ao manter sessão, favor fazer o login novamente."
          );
        }
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
  },
});
