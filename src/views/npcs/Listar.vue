<script setup>
import { storeToRefs } from 'pinia';

import { useNpcStore } from '../../stores/npc.store';

const npcStore = useNpcStore();
npcStore.getAll();

const { npcs } = storeToRefs(npcStore);

console.log(npcs);
</script>

<template>
    <h1>Lista de Npc</h1>
    <router-link to="/npcs/add" class="btn btn-sm btn-success mb-2">Inserir NPC</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 5%;">ID</th>
                <th style="width: 20%">Nome</th>
                <th style="width: 20%">Idade</th>
                <th style="width: 20%">Raça</th>
                <th style="width: 20%;">Classe</th>
                <th style="width: 15%;">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background-color: darkgray; color: black;" v-for="npc in npcs">
                <td>{{ npc.id }}</td>
                <td>{{ npc.nome }}</td>
                <td>{{ npc.idade }}</td>
                <td>{{ npc.raca }}</td>
                <td>{{ npc.classe }}</td>
                <td style="white-space: nowrap">
                    <router-link :to="`/npcs/edit/${npc.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                    <button @click="npcStore.delete(npc.id)" class="btn btn-sm btn-danger btn-delete-user"
                        :disabled="npc.isDeleting">
                        <span v-if="npc.isDeleting" class="spinner-border spinner-border-sm"></span>
                        <span v-else>Delete</span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
