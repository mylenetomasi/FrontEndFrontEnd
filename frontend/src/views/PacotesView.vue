<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import ImagemApi from "../api/imagem.js";
import pacApi from "../api/pacotes.js";

const pacotes = ref([]);
const coverUrl = ref([""]);
const file = ref([]);
const currentPacote = reactive({
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

  currentPacote.imagens_attachment_keys = imagens.map(
    (imagem) => imagem.attachment_key
  );

  await pacApi.salvarPacote(currentPacote);
  Object.assign(currentPacote, {
    id: "",
    nome: "",
    descricao: "",
    status: "",
    preco: "",
    imagem_attachment_key: "",
  });
}

const excluir = async (pacotes) => {
  await pacApi.excluirPacote(pacotes.id);
  this.pacotes = await pacApi.buscarTodosOsPacotes();
};

const editar = (pacotes) => {
  Object.assign(currentPacote, pacotes);
};
onBeforeUnmount(() => {
  if (coverUrl.value) {
    URL.revokeObjectURL(coverUrl.value);
  }
});
onMounted(async () => {
  pacotes.value = await pacApi.buscarTodosOsPacotes();
});
</script>
<template>
  <main>
    <div class="container">
      <div class="title">
        <h1>pacotes</h1>
      </div>
      <div class="form-input">
        <form
          @submit.prevent="add"
          class="center_input"
          enctype="multipart/form-data"
        >
          <input
            id="input_tit"
            type="text"
            v-model="currentPacote.nome"
            placeholder="Nome"
          />
          <input
            id="input_tit"
            type="text"
            v-model="currentPacote.descricao"
            placeholder="Descrição"
          />
          <input
            id="input_tit"
            type="date"
            v-model="currentPacote.status"
            placeholder="Status"
          />
          <input
            id="input_tit"
            type="number"
            v-model="currentPacote.preco"
            placeholder="Preço"
          />
          <input id="input_tit" type="file" multiple @change="onFileChange" />
          <div class="cover">
            <img v-for="url in coverUrl" :key="url" :src="url" />
          </div>
          <div class="center"></div>
          <button @submit.prevent="add" type="submit">Salvar</button>
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
            <tr v-for="pacote in pacotes" :key="pacote.id">
              <td>{{ pacote.id }}</td>
              <td>{{ pacote.nome }}</td>
              <td>{{ pacote.descricao }}</td>
              <td>{{ pacote.status }}</td>
              <td>R${{ pacote.preco }}</td>
              <td>
                <button @click="editar(pacote)">editar</button>
                <button @click="excluir(pacote)">excluir</button>
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
