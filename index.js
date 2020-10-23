var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));

var login = [{ "Nombre": "Ignacio", "contraseña": "Ignacio" }, 
	     { "Nombre": "José González", "contraseña": "JoseG" },
	     { "Nombre": "José Brizio", "contraseña": "JoseB" }];

var historial =[{
  "id": 1,
  "fecha": "1/10/2020",
  "litros1": 5000,
  "litros2": 4900,
  "litros3": 4900,
  "usuario": "José González"},
{ "id":2,
  "fecha": "2/10/2020",
  "litros1": 5020,
  "litros2": 4930,
  "litros3": 4950, 
  "usuario": "José González"},
{ "id":3,
   "fecha": "3/10/2020",
  "litros1": 5100,
  "litros2": 4980,
  "litros3": 5150,
  "usuario": "José González" },
{ "id":4,
   "fecha": "4/10/2020",
  "litros1": 5120,
  "litros2": 4930,
  "litros3": 5050,
  "usuario": "José González" },
{ "id":5,
   "fecha": "5/10/2020",
  "litros1": 5200,
  "litros2": 5080,
  "litros3": 5150,
  "usuario": "José González" }
/*,//Descomentar para probar agregar
{ "id":6,
   "fecha": "22/10/2020",
  "litros1": 5200,
  "litros2": 5080,
  "litros3": 5150,
  "usuario": "José González" }*/];

app.get("/historial",function(req,res){
   setTimeout(function(){res.send(historial); 
        return;},2000);});

app.get("/historial/:id",function(req,res){
  console.log(req.params.id);
    if(req.params.id>0){
      var registro={};
       historial.forEach(item=>{
    
        if(item.id==req.params.id){
          registro= item;
        }
      });
      res.send(registro);
      return;}
    else{
       res.send({'type': 'error'});
       return; 
    }
  
});


/*app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        bool val= false;       
        if(req.body.Nombre!=undefined && req.body.contraseña!=undefined){
            for(var i =0;i<login.length;i++){
		   if(req.body.Nombre===login[i].Nombre"&&req.body.contraseña===login[i].contraseña)
		{val=true;
                console.log("Acceso Correcto al sistema")
                res.send({'OK'});    
        if (!val)
	{console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});}
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
        },2000);});
*/
app.post("/historial",function(req,res){
  console.log(req.body);
    setTimeout(function() {
            var data = {
				"id":historial.length +1,
				"fecha":req.body.fecha,
				"usuario":req.body.usuario,
				"litros1":req.body.litros1,
				"litros2":req.body.litros2,
				"litros3":req.body.litros3};
		historial.push(data);
                res.send(data);    
          return;},2000); }
);

app.put("/historial/:id",function(req,res){
  console.log(req.params.id);
    setTimeout(function(){
        console.log(req.body);
        if((req.body.fecha!= undefined&&req.body.fecha!= "")) 
			{
			for(var i =0;i<historial.length;i++){
			   if(req.params.id== historial[i].id){
            console.log("Actualiza");						historial[i].fecha=req.body.fecha;
						historial[i].litros1=req.body.litros1;
						historial[i].litros2=req.body.litros2;
						historial[i].litros3=req.body.litros3;
						historial[i].usuario=req.body.usuario;
							res.send(req.body);    
							return; }}}
        res.send({'type': 'error'});
    },2000);
    
});

app.delete("/historial/:fecha",function(req,res){
  console.log(req.params.fecha);
    setTimeout(function(){
       console.log(req.params.fecha);
        if(req.params.fecha!= undefined){
			for(var i =0;i<historial.length;i++){
					if(req.params.fecha== historial[i].fecha){
						historial.splice(i,1);
        	var data = {"type":"ok"};
							res.send(data);    
							return;	}}}
        res.send({'type': 'error'});
    },2000);});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});
