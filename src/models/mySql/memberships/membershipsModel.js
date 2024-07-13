import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// funcion de modelo que registra membresias
const registerMembership = async (dataMembership) => {
  try {
    const newMembership = await prisma.membresias.create({
      data: {
        ...dataMembership,
      },
    });
    return newMembership;
  } catch (error) {
    return { error, message: "error al registrar la membresia" };
  }
};

// funcion de modelo que obtiene la info de la membresia de un usuario
const getMembershipById = async (id) => {
  try {
    const membership = await prisma.membresias.findUnique({
      where: { id_membresia: id },
      include: {
        estadomembresias: true,
        tipomembresias: true,
        usuarios: true,
      },
    });

    if (!membership) {
      return { success: false, message: "Membresía no encontrada" };
    }

    return { success: true, membership };
  } catch (error) {
    console.error("Error al obtener la membresía:", error);
    return { success: false, message: "Error al obtener la membresía" };
  }
};

export default {
    registerMembership,
    getMembershipById
};
