import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  
  description:  String ,
  deadline: Date,
  done: Boolean,
  created_at: Date,
  updated_at: Date,
  
title: { type: String, required: true },
priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}
//ref: User - it is a reference to another collection (User model in users collection)
//this ObjectId belongs to a document in User collection


});



const dateValidator = (date) => {
  return date > new Date();
}
TaskSchema.path("deadline").validate(dateValidator);


export default mongoose.model('Task', TaskSchema);
