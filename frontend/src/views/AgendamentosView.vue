<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import agenApi from "../api/agendamentos";

export default {
  setup() {
    const form = ref({
      nome: "",
      data_hora: null,
      confirmacao: "",
      cliente: null,
      procedimento: null,
    });

    const agendamentos = ref([]);
    const procedimentos = ref([]);
    const clientes = ref([]);

    const load = async () => {
      try {
        const [agendamentosResponse, clientesResponse, procedimentosResponse] =
          await Promise.all([
            agenApi.buscarTodosOsAgendamentos(),
            axios.get("https://estetica-dev-zzme.2.us-1.fl0.io/api/cliente/"),
            axios.get(
              "https://estetica-dev-zzme.2.us-1.fl0.io/api/procedimento/"
            ),
          ]);

        agendamentos.value = agendamentosResponse;
        clientes.value = clientesResponse.data;
        procedimentos.value = procedimentosResponse.data;
      } catch (error) {
        console.error(error);
      }
    };

    const add = async () => {
      try {
        const selectedCliente = clientes.value.find(
          (cliente) => cliente.nome === form.value.cliente
        );
        const selectedProcedimento = procedimentos.value.find(
          (procedimento) => procedimento.nome === form.value.procedimento
        );

        if (selectedCliente && selectedProcedimento) {
          form.value.cliente = selectedCliente.id;
          form.value.procedimento = selectedProcedimento.id;

          await agenApi.salvarAgendamento(form.value);

          Object.assign(form.value, {
            id: "",
            nome: "",
            data_hora: null,
            confirmacao: "",
            cliente: null,
            procedimento: null,
          });
          load(); // Reload data after adding
        } else {
          console.error("Selected cliente or procedimento not found.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getClienteName = (clienteId) => {
      const cliente = clientes.value.find((c) => c.id === clienteId);
      return cliente ? cliente.nome : "Cliente não encontrado";
    };

    const excluir = async (agendamento) => {
      if (confirm("Tem certeza que deseja deletar este agendamento?")) {
        await agenApi.excluirAgendamento(agendamento.id);
        this.agendamentos = await agenApi.buscarTodosOsAgendamentos();
      }
    };

    const editar = (agendamento) => {
      Object.assign(form.value, agendamento);
    };

    onMounted(() => {
      load();
    });

    return {
      form,
      agendamentos,
      procedimentos,
      clientes,
      add,
      getClienteName,
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
        <h1>Agendamentos</h1>
      </div>
      <div class="form-input">
        <form @submit.prevent="add" class="center_input">
          <input
            id="input_tit"
            type="text"
            v-model="form.nome"
            placeholder="Nome"
          />
          <select v-model="form.cliente">
            <option value="">Escolha um cliente</option>
            <option
              v-for="cliente of clientes"
              :key="cliente.id"
              :value="cliente.nome"
            >
              {{ cliente.nome }}
            </option>
          </select>
          <select v-model="form.procedimento">
            <option value="">Escolha um Procedimento</option>
            <option
              v-for="procedimento of procedimentos"
              :key="procedimento.id"
              :value="procedimento.nome"
            >
              {{ procedimento.nome }}
            </option>
          </select>
          <input
            id="input_tit"
            type="date"
            v-model="form.data_hora"
            placeholder="Data e hora"
          />
          <input
            id="input_tit"
            type="text"
            v-model="form.confirmacao"
            placeholder="Confirmação"
          />

          <div class="center"></div>
          <button @click="add">Salvar</button>
        </form>
      </div>
      <div class="list-livros">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cliente</th>
              <th>Procedimento</th>
              <th>Data e Hora</th>
              <th>Confirmação</th>
              <th>Manutenção</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agendamento in agendamentos" :key="agendamento.id">
              <td>{{ agendamento.id }}</td>
              <td>{{ agendamento.nome }}</td>
              <td>{{ getClienteName(agendamento.cliente) }}</td>
              <td>{{ agendamento.procedimento }}</td>
              <td>{{ agendamento.data_hora }}</td>
              <td>{{ agendamento.confirmacao }}</td>
              <td>
                <button @click="editar(agendamento)">editar</button>
                <button @click="excluir(agendamento)">excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<style></style>
