export class TechniquesProvider {
  static fetchTechniques = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:3001/personnages",
        options
      );
      const json = await response.json();

      let techniques = new Set();

      for (let personnage of json) {
        for (let technique of personnage.techniques) {
          techniques.add(technique);
        }
        if (personnage.evolutions != null) {
          for (let evolution of personnage.evolutions) {
            for (let technique of evolution.techniques) {
              techniques.add(technique);
            }
          }
        }
      }

      return Array.from(techniques);
    } catch (err) {
      console.log("Error getting documents", err);
    }
  };

  static getPersonnageTechniques = async (technique) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:3001/personnages`,
        options
      );
      const json = await response.json();

      let personnageTechniques = new Set();

      console.log(technique.toUpperCase().replace(/%20/g, ' '));

      technique = technique.toUpperCase().replace(/%20/g, ' ');

      for (let personnage of json) {
        for (let personnageTechnique of personnage.techniques) {
          if (personnageTechnique.toUpperCase() == technique) {
            personnageTechniques.add(personnage);
          }
        }
        if (personnage.evolutions != null) {
          for (let evolution of personnage.evolutions) {
            for (let evolutionTechnique of evolution.techniques) {
              if (evolutionTechnique.toUpperCase() === technique) {
                personnageTechniques.add(personnage);
              }
            }
          }
        }
      }
      return Array.from(personnageTechniques);
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }

}
