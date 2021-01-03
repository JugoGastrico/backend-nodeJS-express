import { send } from 'process';
import models from '../models';
export default {
    add: async(req, res, next) => {
        try {
            const reg = await models.Articulo.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "Ocurrió un error"
            })
            next(e);
        }
    }, //agregar categoría
    query: async(req, res, next) => {
        try {
            const reg = await models.Articulo.findOne({ _id: req.query._id }).populate('categoria', { nombre: 1 });
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: "Ocurrió un error"
            })
            next(e);
        }
    }, // consultar un Articulo
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Articulo.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }] }, { createdAt: 0 }).populate('categoria', { nombre: 1 }).sort({ createdAt: -1 });
            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: "Ocurrió un error"
            })
            next(e);
        }
    }, //listar cat
    update: async(req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndUpdate({ _id: req.body._id }, { cateogria: req.body.categoria, codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion, precio_de_venta: req.body.precio_de_venta, stock: req.body.stock });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "Ocurrió un error"
            })
            next(e);
        }
    }, // actualizar datos cat
    remove: async(req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndDelete({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "Ocurrió un error"
            })
            next(e);
        }
    }, //eliminar el registro de la db cat
    activate: async(req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "Ocurrió un error"
            })
            next(e);
        }
    }, // activar una categoría que este desactivada
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "Ocurrió un error"
            })
            next(e);
        }
    }, //desactivar un Articulo activada
}