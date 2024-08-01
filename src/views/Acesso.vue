<template>
    <div style="display: flex" class="box-login">
      <h1>Login</h1>
      <form action="/">
        <div class="form-group">
          <label for="login">Login:</label>
          <input type="text" class="form-control" id="login" v-model="login" />
        </div>
        <div class="form-group">
          <label for="senha">Senha:</label>
          <input type="password" class="form-control" id="Senha" v-model="senha"/>
        </div>
        <br />
        <div class="justify-content-center" style="display: flex;">
          <button type="submit" class="btn btn-default" style="border: 1px solid #000; width: 100%;" @click="authetication($data)">
            Entrar
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap";
    import axios from "axios";
    import { useBase64 } from '@vueuse/core'
  export default {
    data(){
        return{
            login: '',
            senha: '',
        }
    }
    
  };
  </script>

<script setup lang="ts">
const authetication = async (input: any) => {
    const loginbase64 = btoa(input.login);
    const passBase64 = btoa(input.senha)
    let autenticado = false;

    let body ={
        login: loginbase64,
        senha: passBase64
    }

    await axios.post('http://localhost:8080/authentication/autenticar',body).then(response => (autenticado = response.data));

    if (autenticado) {
        alert('Usuario Autenticado')
    } else {
        alert('Login ou Senha incorreto, favor tentar novamente!');
    }
}
</script>
  
  <style lang="css">
  .box-login {
    max-width: 400px;
    margin: 20px auto;
    padding: 1rem;
    border: 1px solid #000;
    align-items: center;
    flex-direction: column;
  }
  
  .btn:hover{
      color: #FFF;
      background-color: #000;
  }
  </style>
  