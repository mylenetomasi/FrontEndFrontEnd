import axios from "axios";

class clieApi {
  async buscarTodosOsClientes() {
    const response = await axios.get(
      "https://estetica-dev-zzme.2.us-1.fl0.io/api/cliente/"
    );
    return response.data;
  }

  async salvarClientes(cliente) {
    let response;
    if (cliente.id) {
      response = await axios.put(
        `https://estetica-dev-zzme.2.us-1.fl0.io/api/cliente/${cliente.id}/`,
        cliente
      );
    } else {
      response = await axios.post(
        "https://estetica-dev-zzme.2.us-1.fl0.io/api/cliente/",
        cliente
      );
    }
    return response.data;
  }

  async excluirClientes(id) {
    const response = await axios.delete(
      `https://estetica-dev-zzme.2.us-1.fl0.io/api/cliente/${id}/`
    );
    return response.data;
  }
}

export default new clieApi();
