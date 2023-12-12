import axios from "axios";

class pacApi {
  async buscarTodosOsPacotes() {
    const response = await axios.get(
      "https://estetica-dev-zzme.2.us-1.fl0.io/api/pacote/"
    );
    return response.data;
  }

  async salvarPacote(pacote) {
    let response;
    if (pacote.id) {
      response = await axios.put(
        `https://estetica-dev-zzme.2.us-1.fl0.io/api/pacote/${pacote.id}/`,
        pacote
      );
    } else {
      response = await axios.post(
        "https://estetica-dev-zzme.2.us-1.fl0.io/api/pacote/",
        pacote
      );
    }
    return response.data;
  }

  async excluirPacote(id) {
    const response = await axios.delete(
      `https://estetica-dev-zzme.2.us-1.fl0.io/api/pacote/${id}/`
    );
    return response.data;
  }
}

export default new pacApi();
