<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArmaStore } from '../../stores/arma.store';
import { useAlertStore } from '@/stores';
import { router } from '@/router';

const armaStore = useArmaStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Adicionar Arma';
let arma = null;
if (id) {
    // edit mode
    title = 'Editar Arma';
    ({ arma } = storeToRefs(armaStore));
    armaStore.getById(id);
}

const schema = Yup.object().shape({
    nome: Yup.string().required('Campo Nome Obrigatório'),
    custo: Yup.string().required('Campo Custo Obrigatório'),
    moeda: Yup.string().required('Campo Moeda Obrigatório'),
    dadoDano: Yup.string().required('Campo Dado de Dano Obrigatório'),
    tipoDano: Yup.string().required('Campo Tipo de Dano Obrigatório'),
    peso: Yup.string().required('Campo Peso Obrigatório'),
    propriedades: Yup.string().required('Campo Propriedades da Arma Obrigatório')
});

async function onSubmit(values) {
    try {
        let message;
        const user = JSON.parse(localStorage.getItem("user"));

        let dto = {
            id: arma ? arma.id : null,
            nome: values.nome,
            custoMoeda: values.custo + ' ' + values.moeda,
            dadoTipoDano: values.dadoDano + ' ' + values.tipoDano,
            peso: values.peso,
            propriedades: values.propriedades,
            observacao: values.observacao,
            usuario: user.login
        }

        if (arma) {
            await armaStore.update(arma.dto.id, dto)
            message = 'Arma alterado com sucesso!';
        } else {
            await armaStore.register(dto);
            message = 'Arma adicionado com sucesso!';
        }
        await router.push('/armas');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{ title }}</h1>
    <template v-if="!(arma?.loading || arma?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="arma" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Nome</label>
                    <Field name="nome" type="text" class="form-control" :class="{ 'is-invalid': errors.nome }" />
                    <div class="invalid-feedback">{{ errors.nome }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Custo</label>
                    <Field name="custo" type="text" class="form-control" :class="{ 'is-invalid': errors.custo }" />
                    <div class="invalid-feedback">{{ errors.custo }}</div>
                </div>
                <div class="form-group col">
                    <label>Moeda</label>
                    <Field name="moeda" type="text" class="form-control" :class="{ 'is-invalid': errors.moeda }" />
                    <div class="invalid-feedback">{{ errors.moeda }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Dado de Dano</label>
                    <Field name="dadoDano" type="text" class="form-control" :class="{ 'is-invalid': errors.dadoDano }" />
                    <div class="invalid-feedback">{{ errors.dadoDano }}</div>
                </div>
                <div class="form-group col">
                    <label>Tipo de Dano</label>
                    <Field name="tipoDano" type="text" class="form-control" :class="{ 'is-invalid': errors.tipoDano }" />
                    <div class="invalid-feedback">{{ errors.tipoDano }}</div>
                </div>
                <div class="form-group col">
                    <label>Peso</label>
                    <Field name="peso" type="text" class="form-control" :class="{ 'is-invalid': errors.peso }" />
                    <div class="invalid-feedback">{{ errors.peso }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Propriedades</label>
                    <Field name="propriedades" type="text" class="form-control" :class="{ 'is-invalid': errors.propriedades }" />
                    <div class="invalid-feedback">{{ errors.propriedades }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Observações Adicionais</label>
                    <Field name="observacao" type="text" class="form-control" :class="{ 'is-invalid': errors.observacao }" />
                    <div class="invalid-feedback">{{ errors.observacao }}</div>
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
    <template v-if="arma?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="arma?.error">
        <div class="text-center m-5">
            <div class="text-danger">Erro ao carregar arma: {{ arma.error }}</div>
        </div>
    </template>
</template>