import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const { data } = await axios.get('/api/admin/suggestions');
        setSongs(data);
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      await axios.post(`/api/admin/suggestions/${id}/approve`, { status });
      setSongs((prev) => prev.filter((song) => song.id !== id));
    } catch (error) {
      console.error('Erro ao aprovar/reprovar sugestão:', error);
    }
  };

  return (
    <div>
      <h1>Painel de Administração</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              {song.titulo}
              <button onClick={() => handleApproval(song.id, 'approved')}>Aprovar</button>
              <button onClick={() => handleApproval(song.id, 'rejected')}>Reprovar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
