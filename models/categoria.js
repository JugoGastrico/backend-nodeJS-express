import mongoose,{Schema, schema} from 'mongoose';

const categoriaSchema = new Schema({
    nombre:{type: String, maxlength: 50, unique: true, required:true},
    descipcion:{type: String, maxlength: 255},
    estado:{type: Number, default: 1},
    createdAt:{type: Date, default:Date.now}
});

//Le digo a Mongoose que lo convierta a modelo
const Categoria = mongoose.model('categoria', categoriaSchema);
export default Categoria;