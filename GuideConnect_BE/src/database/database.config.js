// mongoose.connect('mongodb://127.0.0.1:27017/test')
import mongoose from  'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/GuideConnect', {
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