import { validateMembership } from "../../schemas/membershipSchema.js"
import membershipsModel from "../../models/mySql/memberships/membershipsModel.js";

// funcion controlador para registrar membresias
const registerMembership = async (req, res) => {
    try {
        const data = validateMembership(req.body);
        // comprueba los datos que ha devueloto zod function
        if (!data.success) {
            res.json({messag:"error en los datos", datos: req.body})
        }
    
        // llamar el modelo que hace es registro en la BD
        const newMembershipData = await membershipsModel.registerMembership(data.data)
        res.status(201).json(newMembershipData)
    } catch (error) {
        res.json({error: error.message})
        
    }
}

// funcion controlador para obtener inormacion de la membresia de un suario
const getUserMembership = async (req, res) => {
    const { id } = req.params
    if (!id || isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }

  const result = await membershipsModel.getMembershipById(parseInt(id, 10));

  if (result.success) {
    res.status(200).json(result.membership);
  } else {
    res.status(404).json({ success: false, message: result.message });
  }
};




export default {
    registerMembership,
    getUserMembership
}