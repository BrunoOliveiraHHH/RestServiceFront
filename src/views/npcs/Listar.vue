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
                <th style="width: 20%;">ID</th>
                <th style="width: 20%">Nome</th>
                <th style="width: 20%">Idade</th>
                <th style="width: 20%">Raca</th>
                <th style="width: 20%;">Classe</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background-color: darkgray; color: black;" v-for="npc in npcs">
                <td>{{ npc.id }}</td>
                <td>{{ npc.nome }}</td>
                <td>{{ npc.idade }}</td>
                <td>{{ npc.raca }}</td>
                <td>{{ npc.classe }}</td>
            </tr>
        </tbody>
    </table>
</template>
