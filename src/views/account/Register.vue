<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const schema = Yup.object().shape({
    nome: Yup.string()
        .required('Nome é campo obrigatório'),
    email: Yup.string()
        .required('Email é campo obrigatório'),
    login: Yup.string()
        .required('Login é campo obrigatório'),
    senha: Yup.string()
        .required('Senha é campo obrigatório'),
    anoNascimento: Yup.string().required('Ano de Nascimento é campo obrigatório')
});

async function onSubmit(values) {
    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    try {
        await usersStore.register(values);
        await router.push('/account/login');
        alertStore.success('Registro realizado com sucesso!');
    } catch (error) { 
        alertStore.error(error);
    }
}
</script>

<template>
    <div class="card m-3">
        <h4 class="card-header">Registro de Usuário</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Nome</label>
                    <Field name="nome" type="text" class="form-control" :class="{ 'is-invalid': errors.nome }" />
                    <div class="invalid-feedback">{{ errors.nome }}</div>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="form-group">
                    <label>Ano de Nascimento</label>
                    <Field name="anoNascimento" type="text" class="form-control" :class="{ 'is-invalid': errors.anoNascimento }" />
                    <div class="invalid-feedback">{{ errors.anoNascimento }}</div>
                </div>
                <div class="form-group">
                    <label>Login</label>
                    <Field name="login" type="text" class="form-control" :class="{ 'is-invalid': errors.login }" />
                    <div class="invalid-feedback">{{ errors.login }}</div>
                </div>
                <div class="form-group">
                    <label>Senha</label>
                    <Field name="senha" type="password" class="form-control" :class="{ 'is-invalid': errors.senha }" />
                    <div class="invalid-feedback">{{ errors.senha }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Registrar
                    </button>
                    <router-link to="login" class="btn btn-link">Cancelar</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>
