<script>
import { ref, onMounted } from "vue";
import clieApi from "../../api/clientes";

export default {
  setup() {
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

    onMounted(() => {
      load();
    });

    return {
      clientes,

    };
  },
};
</script>
<template>
  <table v-if="clientes != ''">
    <thead>
      <tr>
        <th><a>ID</a></th>
        <th><a>Nome</a></th>
        <th><a>cpf</a></th>
        <th><a>Endereço</a></th>
        <th><a>Telefone</a></th>
        <th><a>Email</a></th>
      </tr>
    </thead>
    <tbody v-if="clientes != ''">
      <tr v-for="cliente in clientes" :key="cliente.id">
        <td>{{ cliente.id }}</td>
        <td>{{ cliente.nome }}</td>
        <td>{{ cliente.cpf }}</td>
        <td>{{ cliente.endereco }}</td>
        <td>{{ cliente.telefone }}</td>
        <td>{{ cliente.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
