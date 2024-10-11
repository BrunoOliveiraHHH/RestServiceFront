import { Listar, Layout, Adicionar } from "@/views/npcs";

export default {
  path: "/npcs",
  component: Layout,
  children: [
    { path: "", component: Listar },
    { path: "add", component: Adicionar },
  ],
};
