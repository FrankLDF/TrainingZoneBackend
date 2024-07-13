import { validateAttendance } from "../../schemas/attendanceSchema.js"
import attendanceModel from "../../models/mySql/attendance/attendanceModel.js"


// funcion controlador Para registrar asistencia
const attendanceRegister = async (req, res)=> {
    const dataAttendance = validateAttendance(req.body)
    if (!dataAttendance.success) {
        return res.status(400).json({ errors: dataAttendance.error.errors });
    }

    // Llamando al modelo para crear la asistencia
    const newAttendence = await attendanceModel.createAttendance(dataAttendance.data)
    res.status(201).json(newAttendence)
}

// funcion controlador para obtener todas las asistencias
const getAllAttendances = async (req, res) => { 
    try {
        const findAttendances = await attendanceModel.findAttendancesModel();
        res.status(200).json(findAttendances);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las asistencias" });
    }
}


// funcion controlador para obtener las asistencia de un cliente especifico
const getAttendance = async (req, res) => {
    const { id } = req.params

    // condicionales para validar el id
    if (isNaN(id)) res.status(406).json({ id: id, messahe: 'Error, el parametro no es un id valido' })
    if (id <= 0) res.status(406).json({ id: id, messahe: 'Error, el parametro no es un id valido' })
    
    // llamando el modelo que buscara la asistencia del usuario
    try {
        
        const findAttendance = await attendanceModel.findUserAttendance(id)
        res.status(200).json(findAttendance);
    }
     catch (error) {
        res.status(500).json({ message: "Error al obtener las asistencias" });
    }
}


// exportando las funciones controladores
export default {
    attendanceRegister,
    getAllAttendances,
    getAttendance
}