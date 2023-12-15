const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "trainer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      forename: {
        type: DataTypes.STRING,
        allowNull: true,
        len: {
          args: [2, 50],
          msg: "La longitud del campo debe estar entre 2 y 50 caracteres.",
        },
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u,
            msg: "Solo se permiten letras en este campo.",
          },
        },
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: true,
        len: {
          args: [2, 50],
          msg: "La longitud del campo debe estar entre 2 y 50 caracteres.",
        },
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u,
            msg: "Solo se permiten letras en este campo.",
          },
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: {
            msg: "La URL de la imagen no es válida.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: {
            msg: "Ingresa una dirección de correo electrónico válida.",
          },
        },
      },
      phoneN: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/,
            msg: "Ingresa un número de teléfono válido.",
          },
        },
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: true,
        len: {
          args: [2, 50],
          msg: "La longitud del campo debe estar entre 2 y 50 caracteres.",
        },
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u,
            msg: "Solo se permiten letras en este campo.",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: "Por favor, introduce una fecha de nacimiento válida.",
          },
        },
      },
      dni: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Ingresa un número de DNI válido.",
          },
        },
      },
      gender: {
        type: DataTypes.ENUM("Masculino", "Femenino", "Otro"),
        allowNull: true,
      },
      focusTr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      puntuaciones: {
        type: DataTypes.ARRAY(DataTypes.FLOAT), // Utiliza FLOAT para permitir números decimales
        allowNull: true,
        defaultValue: [], // Puedes establecer un valor por defecto si es necesario
        validate: {
          isDecimalArray(value) {
            const valoresPermitidos = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

            value.forEach(num => {
              const cumpleValorPermitido = valoresPermitidos.includes(num);
              if (cumpleValorPermitido===false) throw new Error('valores permitidos: [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]');
            });
          },
        },
      },
      score: {
        type: DataTypes.VIRTUAL, // VIRTUAL significa que este campo no se almacenará en la base de datos
        get() {
          if (!this.puntuaciones || this.puntuaciones.length === 0) {
            return 0; // Si no hay puntuaciones, el puntaje es 0
          }

          // Suma los valores convertidos a números
          const sum = this.puntuaciones.reduce(
            (acc, score) => acc + score,
            0
          );

          // Calcula el promedio
          const promedio = sum / this.puntuaciones.length;

          return promedio;
        },
        set(value) {
          throw new Error(
            "No puedes establecer el valor directamente en 'score'. Actualiza 'puntuaciones' en su lugar."
          );
        },
      },
      subscribers: {
        type: DataTypes.ARRAY(DataTypes.UUID), // Array de IDs de clientes
        allowNull: true,
        defaultValue: [], // Valor predeterminado: array vacío
      },
      status: {
        type: DataTypes.ENUM("Active", "Suspended", "Confirmed"),
        allowNull: true,
        defaultValue: "Confirmed",
      },
      rutinaPredeterminada: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        defaultValue: [], // Valor predeterminado: array vacío
      },
      role: {
        type: DataTypes.ENUM("Trainer", "Admin"),
        allowNull: true,
        defaultValue: "Trainer",
      },
    },
    {
      timestamps: true, //* en el momento de creacion del usuario, podemos usar esa fecha que se genera para calcular el tiempo de periodo de prueba, y lo mismo con el tiempo de periodo de suscripcion, desde el momento de modificacion.
    }
  );
};
