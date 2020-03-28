import express from 'express';
import mongoose from 'mongoose';
import routemap from "./models/routemap";
import bodyParser from "body-parser";

const app = express();
const mongoDb =  "eastdb";
const mongoPath= "mongodb://localhost";

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  }) 
);

mongoose.connect(`mongodb://localhost/${mongoDb}`,{useNewUrlParser: true})
  .then(() => console.log(`conected to ${mongoDb}`))
  .catch(err => console.log(err));


app.set('port', process.env.PORT || 3100);

const server = app.listen(app.get('port'),()=>{
  console.log('EAST serve on port',app.get('port'));
});

app.post("/postroutemap", (req, res) => {
  mongoose
    .connect(`${mongoPath}/${mongoDb}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(`conected to ${mongoDb}`))
    .catch((err) => console.log(err));

  var db = mongoose.connection;
  console.log(req.body);
  var route = new routemap({
    direction: 1,
    date: new Date()
  });
  db.once("open", () => {
    route.save((err, routes) => {
      if (err) return console.error(err);
      res.json({ message: "ruta este Registrado Correctamente" });
    });
  });
});

