import { Listar, Layout, Adicionar } from "@/views/armadura";

export default {
  path: "/armaduras",
  component: Layout,
  children: [
    { path: "", component: Listar },
    { path: "add", component: Adicionar },
    { path: 'edit/:id', component: Adicionar }
  ],
};
