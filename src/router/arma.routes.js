import { Listar, Layout, Adicionar } from "@/views/arma";

export default {
  path: "/armas",
  component: Layout,
  children: [
    { path: "", component: Listar },
    { path: "add", component: Adicionar },
    { path: 'edit/:id', component: Adicionar }
  ],
};
