import mongoose from 'mongoose';

 export const ConnectDB = async () => {
    await mongoose.connect ('mongodb+srv://devmarcell:Dayane1997@cluster0.th49tce.mongodb.net/')
    console.log ('DB conected');
}