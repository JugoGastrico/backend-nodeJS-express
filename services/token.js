import jwt from 'jsonwebtoken';
import models from '../models/index';

//Actualizar token automáticamente:
async function checkToken(token) {
    let __id = null;
    try {
        const { _id } = await jwt.decode(token);
        __id = _id;
    } catch (e) {
        return false;
    }
    //Acá válido que el token siga siendo válido y además que el usuario tenga acceso, estado activo. 
    const user = await models.Usuario.findOne({ _id: __id, estado: 1 });
    if (user) {
        const token = jwt.sign({ _id: __id }, 'clavesecreta', { expiresIn: '1d' });
        return { token, rol: user.rol };
    } else {
        return false;
    }
}

export default {
    //Para generar el token con ese id que está correctamente autenticado
    encode: async(_id) => {
        const token = jwt.sign({ _id: _id }, 'clavesecreta', { expiresIn: '1d' });
        return token;
        //A= id
        //B = clave secreta para generar token
        //Cuánto demora el token.
    },
    //Esta funcion me va a decodificar el token
    //Para recibir y comprobar si es correcto
    decode: async(token) => {
        try {
            const { _id } = await jwt.verify(token, 'clavesecreta');
            const user = await models.Usuario.findOne({ _id, estado: 1 });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}