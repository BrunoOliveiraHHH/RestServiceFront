<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <h1>Olá {{user.firstName}}!</h1>
        <p>Bem vindo ao DM Helper para D&D5E</p>
        <p>O seu ADM(Ajudante de Mestre)</p>
    </div>
</template>
