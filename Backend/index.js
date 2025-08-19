import ConnectToDatabase from "./Database/database";

ConnectToDatabase()
.then (() => {
    console.log("Connection to the database is established");
})
.catch((err)=> {
    console.log("There was an error while connecting to the database", err);
})

