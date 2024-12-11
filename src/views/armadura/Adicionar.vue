<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArmaduraStore } from '../../stores/armadura.store';
import { useAlertStore } from '@/stores';
import { router } from '@/router';

const armaduraStore = useArmaduraStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Adicionar Armadura';
let armadura = null;
if (id) {
    // edit mode
    title = 'Editar Armadura';
    ({ armadura } = storeToRefs(armaduraStore));
    armaduraStore.getById(id);
}

const schema = Yup.object().shape({
    nome: Yup.string().required('Campo Nome Obrigatório'),
    custo: Yup.string().required('Campo Custo Obrigatório'),
    moeda: Yup.string().required('Campo Moeda Obrigatório'),
    classeDeArmadura: Yup.string().required('Campo Classe de Armadura Obrigatório'),
    forca: Yup.string().required('Campo Tipo de Dano Obrigatório'),
    furtividade: Yup.string().required('Campo Furtividade Obrigatório'),
    peso: Yup.string().required('Campo Peso Obrigatório'),
    propriedades: Yup.string().required('Campo Propriedades da Armnadura Obrigatório')
});

async function onSubmit(values) {
    try {
        let message;
        const user = JSON.parse(localStorage.getItem("user"));

        let dto = {
            id: armadura ? armadura.id : null,
            nome: values.nome,
            custoMoeda: values.custo + ' ' + values.moeda,
            classeDeArmadura: values.classeDeArmadura,
            forca: values.forca,
            furtividade: values.furtividade,
            peso: values.peso,
            propriedades: values.propriedades,
            observacao: values.observacao,
            usuario: user.login
        }

        if (armadura) {
            await armaduraStore.update(armadura.dto.id, dto)
            message = 'Armadura alterado com sucesso!';
        } else {
            await armaduraStore.register(dto);
            message = 'Armadura adicionado com sucesso!';
        }
        await router.push('/armaduras');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{ title }}</h1>
    <template v-if="!(armadura?.loading || armadura?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="armadura" v-slot="{ errors, isSubmitting }">
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
                    <label>Classe de Armadura</label>
                    <Field name="classeDeArmadura" type="text" class="form-control" :class="{ 'is-invalid': errors.classeDeArmadura }" />
                    <div class="invalid-feedback">{{ errors.classeDeArmadura }}</div>
                </div>
                <div class="form-group col">
                    <label>Força</label>
                    <Field name="forca" type="text" class="form-control" :class="{ 'is-invalid': errors.forca }" />
                    <div class="invalid-feedback">{{ errors.forca }}</div>
                </div>
                <div class="form-group col">
                    <label>Furtividade</label>
                    <Field name="furtividade" type="text" class="form-control" :class="{ 'is-invalid': errors.furtividade }" />
                    <div class="invalid-feedback">{{ errors.furtividade }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Peso</label>
                    <Field name="peso" type="text" class="form-control" :class="{ 'is-invalid': errors.peso }" />
                    <div class="invalid-feedback">{{ errors.peso }}</div>
                </div>
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
                <router-link to="/armaduras" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="armadura?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="armadura?.error">sys
        <div class="text-center m-5">
            <div class="text-danger">Erro ao carregar armaduras: {{ armaduras.error }}</div>
        </div>
    </template>
</template>