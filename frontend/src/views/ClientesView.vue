<script>
import { ref, onMounted } from "vue";
import clieApi from "../api/clientes";

export default {
  setup() {
    const form = ref({
      nome: "",
      endereco: "",
      cpf: "",
      telefone: "",
      email: "",
    });

    const clientes = ref([]);

    const load = async () => {
      try {
        const [clientesResponse] = await Promise.all([
          clieApi.buscarTodosOsClientes(),
        ]);

        clientes.value = clientesResponse;
      } catch (error) {
        console.error(error);
      }
    };

    const add = async () => {
      await clieApi.salvarClientes(form.value);

      Object.assign(form.value, {
        id: "",
        nome: "",
        endereco: "",
        cpf: "",
        telefone: "",
        email: "",
      });
      load();
    };

    const excluir = async (clientes) => {
      if (confirm('Tem certeza que deseja deletar este procedimento?')) {
        await clieApi.excluirClientes(clientes.id);
        this.clientes = await clieApi.buscarTodosOsClientes();
      }
    };

    const editar = (cliente) => {
      Object.assign(form.value, cliente);
    };

    onMounted(() => {
      load();
    });

    return {
      form,
      clientes,
      add,
      excluir,
      editar,
    };
  },
};
</script>
<template>
  <main>
    <div class="container">
      <div class="title">
        <h1>Clientes</h1>
      </div>
      <div class="form-input">
        <form @submit.prevent="add" class="center_input">
          <input
            id="input_tit"
            v-model="form.nome"
            type="text"
            placeholder="Nome"
          />
          <input
            id="input_tit"
            v-model="form.cpf"
            type="text"
            placeholder="CPF"
          />
          <input
            id="input_tit"
            v-model="form.endereco"
            type="text"
            placeholder="Endereço"
          />
          <input
            id="input_quant"
            v-model="form.telefone"
            type="tel"
            placeholder="Telefone"
          />
          <input
            id="input_pre"
            v-model="form.email"
            type="email"
            placeholder="Email"
          />
          <div class="center">
            <button @click="add">Salvar</button>
          </div>
        </form>
      </div>
      <div class="list-livros">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Manutenção</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id">
              <td>{{ cliente.id }}</td>
              <td>{{ cliente.nome }}</td>
              <td>{{ cliente.cpf }}</td>
              <td>{{ cliente.endereco }}</td>
              <td>{{ cliente.telefone }}</td>
              <td>{{ cliente.email }}</td>
              <td>
                <button @click="editar(cliente)">editar</button>
                <button @click="excluir(cliente)">excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<style></style>
