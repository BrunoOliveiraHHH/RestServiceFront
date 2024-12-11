<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

function logout(){
    const user = JSON.parse(localStorage.getItem("user"));
    authStore.logout(user.login,user.senha);
};


</script>

<template>
    <nav v-show="authStore.user" style="background-color: white;">
        <ul class="nav nav-tabs">
            <li class="">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="">
                <router-link to="/npcs" class="nav-link">Npc</router-link>
            </li>
            <li class="">
                <router-link to="/armas" class="nav-link">Armas</router-link>
            </li>
            <li class="">
                <router-link to="/armaduras" class="nav-link">Armaduras</router-link>
            </li>
            <button @click="logout()" class="btn btn-link nav-link">Logout</button>
        </ul>
    </nav>
</template>