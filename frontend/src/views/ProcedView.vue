<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import ImagemApi from "../api/imagem.js";
import procApi from "../api/procedimento";

const procedimentos = ref([]);
const coverUrl = ref([""]);
const file = ref([]);
const currentProcedimento = reactive({
  nome: "",
  descricao: "",
  status: "",
  preco: null,
});

function onFileChange(e) {
  coverUrl.value = [];
  file.value.push(...e.target.files);
  coverUrl.value = file.value.map((file) => URL.createObjectURL(file));
}

async function add() {
  const imagens = await Promise.all(
    file.value.map((file) => ImagemApi.uploadImagem(file))
  );

  currentProcedimento.imagens_attachment_keys = imagens.map(
    (imagem) => imagem.attachment_key
  );

  await procApi.salvarProcedimento(currentProcedimento);
  Object.assign(currentProcedimento, {
    id: "",
    nome: "",
    descricao: "",
    status: "",
    preco: "",
    imagem: "",
  });
  procedimentos.value = await procApi.buscarTodosOsProcedimentos();
}

const excluir = async (procedimentos) => {
  if (confirm('Tem certeza que deseja deletar este procedimento?')) {
    await procApi.excluirProcedimento(procedimentos.id);
    procedimentos.value = await procApi.buscarTodosOsProcedimentos();
  }
};

const editar = (procedimentos) => {
  Object.assign(currentProcedimento, procedimentos);
};
onBeforeUnmount(() => {
  if (coverUrl.value) {
    URL.revokeObjectURL(coverUrl.value);
  }
});
onMounted(async () => {
  procedimentos.value = await procApi.buscarTodosOsProcedimentos();
});

</script>
<template>
  <main>
    <div class="container">
      <div class="title">
        <h1>Procedimentos</h1>
      </div>
      <div class="form-input">
        <form
          @submit.prevent="add"
          enctype="multipart/form-data"
          class="center_input"
        >
          <input
            id="input_tit"
            v-model="currentProcedimento.nome"
            type="text"
            placeholder="Nome"
          />
          <input
            id="input_tit"
            v-model="currentProcedimento.descricao"
            type="text"
            placeholder="Descrição"
          />
          <input
            id="input_quant"
            v-model="currentProcedimento.status"
            type="text"
            placeholder="Status"
          />
          <input
            id="input_pre"
            v-model="currentProcedimento.preco"
            type="number"
            placeholder="Preço"
          />
          <input id="input_tit" type="file" multiple @change="onFileChange" />
          <div class="cover">
            <img v-for="url in coverUrl" :key="url" :src="url" />
          </div>
          <div class="center">
            <button @submit.prevent="add" type="submit">Salvar</button>
          </div>
        </form>
      </div>
      <div class="list-livros">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Preço</th>
              <th>Manutenção</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="procedimento in procedimentos" :key="procedimento.id">
              <td>{{ procedimento.id }}</td>
              <td>{{ procedimento.nome }}</td>
              <td>{{ procedimento.descricao }}</td>
              <td>{{ procedimento.status }}</td>
              <td>{{ procedimento.preco }}</td>
              <td>
                <button @click="editar(procedimento)">editar</button>
                <button @click="excluir(procedimento)">excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<style scoped>
.cover,
.cover img {
  width: 100%;
}
</style>
