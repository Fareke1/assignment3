const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://zhanikplanet1:narutoplanet@cluster0.zyfk98y.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri,{
    useNewUrlParser: true,
     useUnifiedTopology: true 
});

async function connectToMongoDB(){
    try{
        await client.connect();
        console.log("Connected to MongoDB");
        return client;
    }
    catch(error){
        console.error("Failed to Connect to MongoDB:",error);
        throw error;
    }
}

async function getBlogs(){
    try{
      const database=client.db("blog-api");
      const collection = database.collection("blogs");
      const blogs = await collection.find().toArray();
      return blogs;
    }
    catch(error){
        console.error('Error in retrieving blogs from db')
    }
}

async function postBlogs(name,age,email){
    console.log(`${name}${age}${email}`)
    try{
        if(!name || !age || !email){
            throw new Error('Missing required parametres')
        }
        const database=client.db('blog-api');
        const collection=database.collection("blogs");

        const result= await collection.insertOne({name,age,email});
        console.log(result)
        if(result.acknowledged){
            console.log('You successfully created blog')
        }
        else{
            throw Error("No document inserted")
        }
    }
    catch(error){
        console.error("Error creating blog",error);
        throw error;
    }
}

async function putBlogs(name,age,email){
    try{
        if(!name || !age || !email)
            throw new Error("Missing required parametres");

            const database=client.db("blog-api");
            const collection=database.collection("blogs");

            const result=await collection.updateOne({name},{$set:{email,age}})
        if(result && result.modifiedCount>0)
            return {name,age,email};
        else
        throw new Error("None of the document have update");
    }
    catch(error){
        console.error('Error updating blogs:',error)
        throw error;
    }
}

async  function deleteBlogs(name){
    try{
        if(!name)
            throw new Error("Missing required parametres");
        const database=client.db("blog-api");
        const collection=database.collection("blogs");

        const result = await collection.deleteOne({name});

        return result.deletedCount > 0;
    }
    catch(error){
        console.error("Error during deleting blogs:",error);
        throw error;
    }
}





module.exports = {connectToMongoDB,getBlogs,postBlogs,putBlogs,deleteBlogs};