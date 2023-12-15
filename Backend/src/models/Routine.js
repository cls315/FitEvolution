const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("routine", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exerc: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    totalDuration: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.exerc && Array.isArray(this.exerc)) {
          return this.exerc.reduce((total, exerc) => {
            return total + (exerc.estimatedDuration || 0);
          }, 0);
        }
        return 0;
      },
      get duration() {
        const totalSeconds = this.totalDuration;
        return `${Math.floor(totalSeconds / 60)}m ${totalSeconds % 60}s`;
      },
    },
    enfoque: {
      type: DataTypes.STRING, // Puedes ajustar el tipo de datos según sea necesario
      allowNull: true, // O false, dependiendo de si el enfoque debe ser obligatorio o no
    },
    
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isBlobUrl(value) {
          // Verificar si el valor es nulo antes de intentar la validación
          if (value && !value.startsWith('blob:')) {
            throw new Error('La URL de la imagen debe ser un Blob URL.');
          }
        },
      },
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
