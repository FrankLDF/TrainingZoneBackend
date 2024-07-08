import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertNewUser = async (dataUser) => {
    
    try {
        
        const newUser = await prisma.usuarios.create({
            data: {
                ...dataUser
            },
        });

        return { message: "Usuario creado con éxito", user: newUser };

    } catch (error) {

        // Manejar el error de email duplicado
        if (error.code === 'P2002' && error.meta.target.includes('email')) {
            return { message: "El email ya está en uso", email: dataUser.email }
            
        }
        // Manejar el error de usuario duplicado
        else if (error.code === 'P2002' && error.meta.target.includes('usuario')) {
            return { message: "El usuario ya está en uso", user: dataUser.usuario }
        
        } else {
            return { message: "Error al crear usuario" }
            
        }
        
    

    
    }
};
