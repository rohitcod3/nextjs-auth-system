import mongoose from "mongoose"
let isConnected = false;
export async function connect(){
    if (isConnected) {
        console.log("Already connected to the database");
        return;
    }

    try{
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    
    connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    })
    
    isConnected = true;
    console.log("Connected to the database");

    connection.on('error', (err) => {
        console.log('MongoDB connection error. Please make sure MongoDB is running' +  err);
        process.exit();
    })
    }catch(error){
        console.log('Something went wrong!');
        console.log(error);
    }
}