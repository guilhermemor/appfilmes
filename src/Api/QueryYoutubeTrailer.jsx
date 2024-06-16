export const QueryYoutubeTrailer = async (name) => {
    const apiKey = '';
    const query = 'Trailer ' + name;
    const maxResults = 1; // Queremos apenas o primeiro resultado

    const searchYouTube = async () => {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                // Obter o ID do primeiro vídeo
                const videoId = data.items[0].id.videoId;

                // Construir a URL do vídeo
                const videoUrl = `https://www.youtube.com/embed/${videoId}?vq=hd1080&autoplay=1`;

                console.log('URL do primeiro vídeo:', videoUrl);
                return videoUrl;
            } else {
                console.log('Nenhum resultado encontrado.');
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar no YouTube:', error);
            return null;
        }
    };

    const final = await searchYouTube();
    return final;
};