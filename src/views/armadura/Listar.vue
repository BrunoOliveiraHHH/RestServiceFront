<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore, useArmaduraStore } from "@/stores";

const armaduraStore = useArmaduraStore();
armaduraStore.getAll();
const { armaduras } = storeToRefs(armaduraStore);
const user = JSON.parse(localStorage.getItem("user"));
const alertStore = useAlertStore();

async function onDelete(id, usuario) {
    await armaduraStore.delete(id, usuario);
    alertStore.success('Arma deletada com sucesso');
    window.location.reload();
}

</script>

<template>
    <h1>Lista de Armaduras</h1>
    <router-link to="/armaduras/add" class="btn btn-sm btn-success mb-2">Inserir Armadura</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 5%;">ID</th>
                <th style="width: 10%">Nome</th>
                <th style="width: 10%">Custo</th>
                <th style="width: 10%">Classe de Armadura</th>
                <th style="width: 10%">Força</th>
                <th style="width: 10%">Furtividade</th>
                <th style="width: 10%;">Peso</th>
                <th style="width: 10%;">Propriedades</th>
                <th style="width: 10%;">Observações</th>
                <th style="width: 15%;">Ações</th>
            </tr>
        </thead>
        <tbody v-if="armaduras != null">
            <tr style="background-color: darkgray; color: black;" v-for="armadura in armaduras">
                <td>{{ armadura.id }}</td>
                <td>{{ armadura.nome }}</td>
                <td>{{ armadura.custoMoeda }}</td>
                <td>{{ armadura.classeDeArmadura }}</td>
                <td>{{ armadura.forca }}</td>
                <td>{{ armadura.furtividade }}</td>
                <td>{{ armadura.peso }}</td>
                <td>{{ armadura.propriedades }}</td>
                <td>{{ armadura.observacao }}</td>
                <td style="white-space: nowrap">
                    <router-link :to="`/armaduras/edit/${armadura.id}`"
                        class="btn btn-sm btn-primary mr-1">Edit</router-link>
                    <button @click="onDelete(armadura.id, user.login)" class="btn btn-sm btn-danger btn-delete-user"
                        :disabled="armadura.isDeleting">
                        <span v-if="armadura.isDeleting" class="spinner-border spinner-border-sm"></span>
                        <span v-else>Delete</span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
