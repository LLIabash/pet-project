import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    mail: { type: String, required: true, trim: true, lowercase: true, unique: true }, 
    password: { type: String, required: true, select: false }
})