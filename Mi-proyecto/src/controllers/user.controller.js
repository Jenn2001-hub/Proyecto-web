const userService = require('../services/user.service');

exports.createUser = async (req, res)=>{
    try{
        const {nombre, ElementInternals, password, rol_id, admnistrador_id}= req.body;
        const newUser = await userService.createUser(nombre, ElementInternals, password, rol_id, admnistrador_id);
        res.status(201).json({ message: ' usuario creado son exto', user: newUser});
    } catch (err){
        res.status(500).json({ message:err.message});

    }
};

