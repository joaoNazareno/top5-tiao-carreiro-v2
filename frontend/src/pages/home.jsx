import React, { useState, useEffect } from "react";
import api from "../services/api"; // Importa a instância configurada do Axios
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const [url, setUrl] = useState("");
  const [musics, setMusics] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const navigate = useNavigate();

  // Verificar autenticação
  const isAuthenticated = !!localStorage.getItem("token");

  // Buscar músicas aprovadas ao carregar
  useEffect(() => {
    const fetchMusics = async () => {
      try {
        const response = await api.get("/musics"); // Usa o api.js para fazer a requisição
        setMusics(response.data.data); // Considerando resposta paginada
      } catch (error) {
        console.error("Erro ao buscar músicas:", error);
      }
    };

    fetchMusics();
  }, []);

  // Submeter nova música
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login"); // Redireciona para a página de login se não estiver autenticado
      return;
    }

    try {
      // Definindo o status como 'pending' para a música sugerida
      const musicData = {
        title: "kkkkkkkk",
        artist: "Tião Carreiro",
        link: url,
        status: "pending",
      };

      await api.post("/musics", musicData); // Envia a sugestão para a API
      setMessage("Música sugerida com sucesso! Aguarde aprovação.");
      setMessageType("success");
      setUrl(""); // Limpa o campo de URL após o envio
    } catch (error) {
      setMessage("Erro ao sugerir música. Tente novamente.");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Sugerir Nova Música</h3>

          {message && (
            <div
              className={`mb-4 px-4 py-2 rounded ${
                messageType === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-2">
              <input
                type="url"
                name="url"
                placeholder="Cole aqui o link da música"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
              >
                Enviar Link
              </button>
            </div>
          </form>
        </div>

        <h3 className="text-2xl font-bold mb-4">Músicas Aprovadas</h3>

        {musics.length === 0 ? (
          <div className="text-center text-gray-600">
            <div className="text-4xl mb-2">🎵</div>
            <p className="text-lg font-semibold">Nenhuma música cadastrada ainda</p>
            <p className="text-sm">Seja o primeiro a sugerir uma música usando o formulário acima!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {musics.map((music, index) => (
              <li key={music.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${music.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                >
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-blue-500 mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold">{music.title}</h4>
                      <p className="text-sm text-gray-600">{music.views} visualizações</p>
                    </div>
                    <img
                      src={music.thumb}
                      alt={`Thumbnail ${music.title}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
