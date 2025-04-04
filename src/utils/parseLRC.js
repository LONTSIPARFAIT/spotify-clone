// Fonction pour convertir un timestamp [mm:ss.xx] en secondes
const parseTime = (timeStr) => {
    const [minutes, seconds] = timeStr.replace(/[\[\]]/g, "").split(":");
    return parseInt(minutes) * 60 + parseFloat(seconds);
  };
  
  // Fonction pour parser un fichier .lrc
  const parseLRC = (lrcContent) => {
    const lines = lrcContent.split("\n");
    const lyrics = [];
  
    lines.forEach((line) => {
      const match = line.match(/\[(\d{2}:\d{2}\.\d{2})\](.*)/);
      if (match) {
        const time = parseTime(match[1]);
        const text = match[2].trim();
        if (text) {
          lyrics.push({ time, text });
        }
      }
    });
  
    return lyrics;
  };
  
  // Fonction pour charger un fichier .lrc
  const loadLRC = async (filePath) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("Erreur lors du chargement du fichier .lrc");
      const lrcContent = await response.text();
      return parseLRC(lrcContent);
    } catch (error) {
      console.error("Erreur lors du chargement des paroles :", error);
      return [];
    }
  };
  
  export default loadLRC;