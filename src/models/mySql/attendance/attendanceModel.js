import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// funcion del modelo que registra las asistencias
const createAttendance = async (attendanceData) => {
  try {
    const newAttendance = await prisma.asistencia.create({
      data: {
        id_usuario: attendanceData.id_usuario,
        fecha: new Date(attendanceData.fecha),
        hora_entrada: new Date(attendanceData.hora_entrada),
        hora_salida: new Date(attendanceData.hora_salida),
      },
    });
    console.log("Asistencia creada:", newAttendance);
    return newAttendance;
  } catch (error) {
    console.error("Error creando asistencia:", error);
    throw error;
  }
};

// funcion del modelo que busca las asistencias
const findAttendancesModel = async () => {
   try {
     // Obtener todas las asistencias con la información del usuario
     const attendances = await prisma.asistencia.findMany({
       include: {
         usuarios: {
           select: {
             nombre: true,
             apellido: true,
           },
         },
       },
       orderBy: {
         fecha: "asc",
       },
     });

     // Agrupar las asistencias por fecha
     const groupedAttendances = attendances.reduce((acc, attendance) => {
       const date = attendance.fecha.toISOString().split("T")[0]; // Agrupar por fecha
       if (!acc[date]) {
         acc[date] = [];
       }
       acc[date].push({
         id_asistencia: attendance.id_asistencia,
         nombre: attendance.usuarios.nombre,
         apellido: attendance.usuarios.apellido,
         hora_entrada: attendance.hora_entrada,
         hora_salida: attendance.hora_salida,
       });
       return acc;
     }, {});

     return groupedAttendances;
   } catch (error) {
     console.error(
       "Error al obtener las asistencias agrupadas por fecha:",
       error
     );
     throw error;
   }
  // try {
  //   const attendances = await prisma.asistencia.groupBy({
  //     by: ["fecha"],
  //     _count: {
  //       id_asistencia: true, // O cualquier otro campo para contar
  //     },
  //   });

  //   return attendances;
  // } catch (error) {
  //   console.error(
  //     "Error al obtener las asistencias agrupadas por fecha:",
  //     error
  //   );
  //   throw error;
  // }
};

// funcion del modelo que busca las asistencias de un usuario
const findUserAttendance = async (userId) => {
  try {
    const attendances = await prisma.asistencia.groupBy({
      by: ["fecha"],
      where: {
        id_usuario: parseInt(userId),
      },
      _count: {
        id_asistencia: true, // Cuenta el número de asistencias por fecha
      },
    });
    return attendances;
  } catch (error) {
    console.error(
      "Error al obtener las asistencias agrupadas por fecha:",
      error
    );
    throw error;
  }
};

export default {
  createAttendance,
  findAttendancesModel,
  findUserAttendance
};
