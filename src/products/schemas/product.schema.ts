import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true }, 
    photo: { type: String },
    count: {type : Number, required: true, min: 1, max: 1000 }
})