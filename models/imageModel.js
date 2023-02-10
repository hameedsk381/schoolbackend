import mongoose from 'mongoose';
const imageSchema = mongoose.Schema({
    regId:{
        type:String,
        required:true
    },
    image: {
        data:Buffer,
        contentType:String,
       default:{
        data:"",
        contentType:""
       }
        
      },
})
const Image = mongoose.model('Image',imageSchema);
export default Image;