import uniqueValidator from 'mongoose-unique-validator'
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		minlength: 3
	},
	passwordHash: {type: String},
})

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

userSchema.plugin(uniqueValidator)

const UserEntity = mongoose.model("UserEntity", userSchema)

export default UserEntity
