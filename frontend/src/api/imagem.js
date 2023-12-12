import axios from "axios";

class ImagemApi {
  async uploadImagem(file) {
    const formData = new FormData();
    formData.set("file", file);
    const response = await axios.post(
      "https://estetica-dev-zzme.2.us-1.fl0.io/api/media/images/",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  async getImagemUrl(attachmentKey) {
    try {
      const response = await axios.get(
        `https://estetica-dev-zzme.2.us-1.fl0.io/api/media/images/${attachmentKey}`
      );
      return response.data.url;
    } catch (error) {
      console.error("Erro ao obter a URL da imagem:", error);
      return null;
    }
  }
}

export default new ImagemApi();
