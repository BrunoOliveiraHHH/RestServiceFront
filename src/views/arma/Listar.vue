<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore, useArmaStore } from "@/stores";
const armaStore = useArmaStore();
armaStore.getAll();
const { armas } = storeToRefs(armaStore);
const user = JSON.parse(localStorage.getItem("user"));
const alertStore = useAlertStore();

async function onDelete(id, usuario) {
    await armaStore.delete(id, usuario);
    alertStore.success('Arma deletada com sucesso');
    window.location.reload();
}
</script>

<template>
    <h1>Lista de Armas</h1>
    <router-link to="/armas/add" class="btn btn-sm btn-success mb-2">Inserir Arma</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 5%;">ID</th>
                <th style="width: 10%">Nome</th>
                <th style="width: 10%">Custo</th>
                <th style="width: 10%">Dano</th>
                <th style="width: 10%;">Peso</th>
                <th style="width: 10%;">Propriedades</th>
                <th style="width: 10%;">Observações</th>
                <th style="width: 15%;">Ações</th>
            </tr>
        </thead>
        <tbody v-if="armas != null">
            <tr class="line-color" v-for="arma in armas">
                <td>{{ arma.id }}</td>
                <td>{{ arma.nome }}</td>
                <td>{{ arma.custoMoeda }}</td>
                <td>{{ arma.dadoTipoDano }}</td>
                <td>{{ arma.peso }}</td>
                <td>{{ arma.propriedades }}</td>
                <td>{{ arma.observacao }}</td>
                <td style="white-space: nowrap">
                    <router-link :to="`/armas/edit/${arma.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                    <button @click="onDelete(arma.id, user.login)" class="btn btn-sm btn-danger btn-delete-user"
                        :disabled="arma.isDeleting">
                        <span v-if="arma.isDeleting" class="spinner-border spinner-border-sm"></span>
                        <span v-else>Delete</span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
