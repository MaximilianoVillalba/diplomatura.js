import basededatos from './basededatos';

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {String} nombreAlumno el id del alumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  let materiasAlum = [];
  let materiasAprob = [];

  let alumno = basededatos.alumnos.find(alumn => alumn.nombre === nombreAlumno);
  if (alumno) {
    basededatos.calificaciones.forEach(
      elemen => {
        if (elemen.alumno == alumno.id && elemen.nota >= 4) {
          materiasAlum.push(elemen);
        }
      }
    )

    for (let i = 0; i < materiasAlum.length; i++) {
      basededatos.materias.forEach(
        materia => {
          if (materia.id == materiasAlum[i].materia) {
            materiasAprob.push(materia);
          }
        }
      )
    }
  } else {
    return undefined;
  }
  return materiasAprob;
};

/**
 * Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  let arregloMaterias = [];
  let arregloUni = [];
  let arregloProfesFinal = [];
  let arregloAlum = [];
  let arregloAlumFinal = [];

  let uni = basededatos.universidades.find(universidad => universidad.nombre === nombreUniversidad);
  if (uni) {
    arregloUni.push(uni);
    basededatos.materias.forEach(
      materia => {
        if (materia.universidad === uni.id) {
          arregloMaterias.push(materia);
        }
      }
    )

    basededatos.profesores.forEach(
      profe => {
        for (let i = 0; i < arregloMaterias.length; i++) {
          let arregloProfePorMateria = arregloMaterias[i].profesores;
          for (let j = 0; j < arregloProfePorMateria.length; j++) {
            if (profe.id == arregloProfePorMateria[j] && !(arregloProfesFinal.includes(profe))) {
              arregloProfesFinal.push(profe);
            }
          }
        }
      }
    )

    for (let k = 0; k < arregloMaterias.length; k++) {
      basededatos.calificaciones.forEach(
        cali => {
          if (arregloMaterias[k].id === cali.materia) {
            basededatos.alumnos.find(
              alumno => {
                if(alumno.id === cali.alumno && !(arregloAlumFinal.includes(alumno))){
                  arregloAlumFinal.push(alumno);
                }
              }
            )
          }
        }
      )
    }
    arregloUni.materias = arregloMaterias;
    arregloUni.profesores = arregloProfesFinal;
    arregloUni.alumnos = arregloAlumFinal;
  } else {
    return undefined;
  }
  return arregloUni;
};

// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
// export const promedioDeEdad = () => {
//   return [];
// };

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
// export const alumnosConPromedioMayorA = (promedio) => {
//   return [];
// };

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
// export const materiasSinAlumnosAnotados = () => {
//   return [];
// };

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
// export const promedioDeEdadByUniversidadId = (universidadId) => {
//   return [];
// };
