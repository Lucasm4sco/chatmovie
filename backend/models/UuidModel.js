import { Schema, model } from "mongoose";
import {v4 as uuidv4} from 'uuid';

const UuidModel = new Schema({
    _id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencia o modelo User
        required: true
      },
    uuid: {
        type: String,
        default: uuidv4,
        index: { unique: true }
    }
})

const Uuid = model('uuid', UuidModel);

export default Uuid