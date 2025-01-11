import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MusicList = () => {
  const [top5, setTop5] = useState([]);
  const [otherSongs, setOtherSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/musics?page=${page}`);
        setTop5(data.top5);
        setOtherSongs(data.otherSongs);
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [page]);

  return (
    <div>
      <h1>Top 5 Músicas Mais Tocadas</h1>
      <div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <h2>Top 5</h2>
            <ul>
              {top5.map((music, index) => (
                <li key={music.id}>
                  <a href={`https://www.youtube.com/watch?v=${music.youtube_id}`} target="_blank" rel="noopener noreferrer">
                    {index + 1}. {music.titulo} ({music.visualizacoes} visualizações)
                  </a>
                </li>
              ))}
            </ul>

            <h2>Outras Músicas</h2>
            <ul>
              {otherSongs.map((music) => (
                <li key={music.id}>
                  <a href={`https://www.youtube.com/watch?v=${music.youtube_id}`} target="_blank" rel="noopener noreferrer">
                    {music.titulo} ({music.visualizacoes} visualizações)
                  </a>
                </li>
              ))}
            </ul>

            <div>
              <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                Anterior
              </button>
              <button onClick={() => setPage((prev) => prev + 1)}>Próxima</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MusicList;
