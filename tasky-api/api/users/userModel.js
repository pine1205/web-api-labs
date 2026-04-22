import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});

UserSchema.methods.comparePassword = async function (passw) { 
    return await bcrypt.compare(passw, this.password); 
};
//This uses bcrypt package to compare candidate password to the password stored in the database


UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function() {
  const saltRounds = 12; // You can adjust the number of salt rounds
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
    } catch (error) {
      throw new Error(error);
    }
  } 
});
//These updates to the User Schema define a pre-save hook that encrypts the password property before it is saved or updated.
//  Also, the comparePassword() instance method can be used to authenticate users using encrypted passwords.


export default mongoose.model('User', UserSchema);
