// mongoose.connect('mongodb://127.0.0.1:27017/test')
import mongoose from  'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://tien:123456@51.79.173.117:27017/GuideConnect?authSource=admin', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('Connect Successfully!!!!');
    } catch (error) {                                       
        console.log('Connect Error:', error)
    }
}

module.exports = { connect };