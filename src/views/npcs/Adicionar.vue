<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useNpcStore } from '../../stores/npc.store';
import { useAlertStore } from '@/stores';
import { router } from '@/router';

const npcStore = useNpcStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Adicionar NPC';
let npc = null;
if (id) {
    // edit mode
    title = 'Editar Npc';
    ({ npc } = storeToRefs(npcStore));
    npcStore.getById(id);
}

const schema = Yup.object().shape({
    nome: Yup.string().required('Campo Nome Obrigatório'),
    idade: Yup.string().required('Campo Idade Obrigatório'),
    raca: Yup.string().required('Campo Raça Obrigatório'),
    classe: Yup.string().required('Campo Classe Obrigatório')
});

async function onSubmit(values) {
    try {
        let message;
        if (npc) {
            await npcStore.update(npc.value.id, values)
            message = 'Npc alterado com sucesso!';
        } else {
            await npcStore.register(values);
            message = 'Npc adicionado com sucesso!';
        }
        await router.push('/npcs');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{ title }}</h1>
    <template v-if="!(npc?.loading || npc?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="npc" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Nome</label>
                    <Field name="nome" type="text" class="form-control" :class="{ 'is-invalid': errors.nome }" />
                    <div class="invalid-feedback">{{ errors.nome }}</div>
                </div>
                <div class="form-group col">
                    <label>Idade</label>
                    <Field name="idade" type="text" class="form-control" :class="{ 'is-invalid': errors.idade }" />
                    <div class="invalid-feedback">{{ errors.idade }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Raça</label>
                    <Field name="raca" type="text" class="form-control" :class="{ 'is-invalid': errors.raca }" />
                    <div class="invalid-feedback">{{ errors.raca }}</div>
                </div>
                <div class="form-group col">
                    <label>Classe</label>
                    <Field name="classe" type="text" class="form-control" :class="{ 'is-invalid': errors.classe }" />
                    <div class="invalid-feedback">{{ errors.classe }}</div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Salvar
                </button>
                <router-link to="/npcs" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="npc?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="npc?.error">
        <div class="text-center m-5">
            <div class="text-danger">Erro ao carregar Npc: {{ npc.error }}</div>
        </div>
    </template>
</template>
