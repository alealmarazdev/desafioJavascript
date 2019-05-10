/* 
	$(document).ready(function()
	{
		$("#loadAdopt").click(function(evento)
		{
			evento.preventDefault();
			$("#destino").load("adopt.html");
		});
	})
 */


/* 


function getData(){
    $.ajax({
        url: "https://jquerycrud-ed8dc.firebaseio.com/dogs.json",
        type: "GET",
        success: function(response){
            console.log(response);
        }
    });
}

var postObject = {
  'name': 'Gogdo',
  'breed': 'Black Cat'
}

function postData(){
    $.post( "https://jquerycrud-ed8dc.firebaseio.com/dogs.json", JSON.stringify(postObject), function( data ) {
  console.log( data);
}, "json");
}

function updateData(){
    $.ajax({
       url: 'https://jquerycrud-ed8dc.firebaseio.com/dogs/-LeJgLYcUIR1OwHL49pW.json',
       type: 'PUT',
       data: JSON.stringify(postObject),
       success: function(response) {
         console.log(response)
       }
    });
}

function deleteData(){
    $.ajax({
       url: 'https://jquerycrud-ed8dc.firebaseio.com/dogs/-LeJgLYcUIR1OwHL49pW.json',
       type: 'DELETE',
       success: function(response) {
         console.log(response)
       }
    });
}
 */
/* 
$("#submit-button").click(()=>{
  let url = $("#pet-url").val();
  let name = $("#pet-name").val();
  let description = $("#pet-description").val();
  let petObject = {url,name,description};
  console.log(petObject, "objeto");
  addPet(petObject)
  
})
 */
const loadCont =()=>{
$(".content-wrapper").load("views/principal.html")
}
loadCont()

$("#principal").click(()=>{
  $(".content-wrapper").load("views/principal.html")
  getData()
})

$("#loadAdopt").click(()=>{
  $(".content-wrapper").load("views/adopt.html", ()=>{
    addAdoptEvent()
    
  })
  
})


$("#loadReg").click(()=>{
  $(".content-wrapper").load("views/registroadopt.html")
})

// const saluda;
// function despide() {
//   console.log('adios')
// }

// saluda();
// despide();

// saluda = () => {
//   console.log('hola')
// };




const addAdoptEvent = () => {
  $("#adoptform").submit((event)=>{
    console.log("validaction");
   event.preventDefault();
   event.stopPropagation();
  let url = $("#pet-url").val();
  let name = $("#pet-name").val();
  let description = $("#pet-description").val();
  let petObject = {url,name,description};
  console.log(petObject, "objeto");
  addPet(petObject)   
  $("#pet-url").val("");
  $("#pet-name").val("");
  $("#pet-description").val("");
 })
}
/*  */

/*método post*/
const addPet = (petObject)=>{
  $.post( "https://jquerycrud-ed8dc.firebaseio.com/ale.json", /*URL*/
    JSON.stringify(petObject), /*Objeto a postear*/
    function( data ) { /*callback*/
      console.log( data, "data");
      $('#myModal').modal('show')
      getData()
  }, "json");
}

/*método get*/
function getData(){
  $.ajax({
      url: "https://jquerycrud-ed8dc.firebaseio.com/ale.json",
      type: "GET",
      success: function(response){
        console.log("hol",response);
          printData(response)
//           $(`.modalbtn`).click(()=>{
//    console.log("pruebdel");
  
// })
      }
  });
}

/*Método Update*/
function updateData(updatedObject){
    $.ajax({
       url: `https://jquerycrud-ed8dc.firebaseio.com/ale/${key}.json`,
       type: 'PUT',
       data: JSON.stringify(updatedObject),
       success: function(response) {
         console.log(response)
       }
    });
}

/*Método delete*/
function deleteData(key){
  $.ajax({
     url: `https://jquerycrud-ed8dc.firebaseio.com/ale/${key}.json`,
     type: 'DELETE',
     success: function(response) {
     console.log(response);
     getData()
     }
  });
}



function printData(dataToPrint) {
  $(".data-wrapper").html("")
  $(".data-nowrapper").html("")

  let withOwner = []
  let noOwner=[] 
  $.each(dataToPrint,(key,value)=>{
    console.log(`key ${key}, value ${value}, name ${value.name}, url: ${value.url}, 
    description: ${value.description}`)
    if( value.owner){
      console.log(value.owner, value.owner.oname);
      withOwner.push({...value, key})
      console.log(`key ${key}, value ${value}, name ${value.name}, url: ${value.url}, 
    description: ${value.description} ey aqui debe ir el owner ${value.owner.oname}`)
    } else{
      
      noOwner.push({...value, key})
    }
  })
  noOwner.forEach((value)=>{
// borramos todo data wrapper para comenzar con in div limpio
    $(".data-nowrapper").append(
        `<div class="col col-sm-6 col-md-4 mb-4">
        <div class="card">
          <img src="${value.url}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title text-center my-0">${value.name}</h5>
            <p class="card-text">${value.description}</p>
            <!-- Button trigger modal -->
            <button type="button" class="btn modalbtn"  id="${value.key}">
              ¡Adoptar!
            </button>
          </div>
        </div>
      </div>`
      )

  })
  withOwner.forEach((value)=>{
    // borramos todo data wrapper para comenzar con in div limpio
        $(".data-wrapper").append(
            `<div class="col col-sm-6 col-md-4 mb-4">
            <div class="card">
              <img src="${value.url}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title text-center my-0">${value.name}</h5>
                <p class="card-text">He sido adoptado por ${value.owner.oname}</p>
                <p class="card-text">Ahora tengo una casita en ${value.owner.oadress}</p>
                <p class="card-text">E incliso un telefono ${value.owner.otel}</p>                
                <p class="card-text">${value.description} </p>
              
                <button type="button" class="btn modalbtn"  id="erase-button-${value.key}">
              </div>
            </div>
          </div>`
          )
    
      })

// 

  $(`.modalbtn`).click((event)=>{
    console.log($(event.target).attr("id"));
    console.log("pruebdel");
    $("#idPet").val($(event.target).attr("id"))
    $("#exampleModal").modal("show")
  //   $("#erase-button").click(()=>{ 
  // deleteData($(event.target).attr("id"))})
  addAdopterEvent()
 })
}

getData()


const addAdopterEvent=()=> { $("#validationForm").submit((event)=>{
  console.log("validaction2");
  event.preventDefault();
  event.stopPropagation();
 let oname = $("#owner-name").val();
 let oadress = $("#owner-adress").val();
 let otel = $("#owner-tel").val();
 let idpet = $("#idPet").val()
 let ownerObject = {oname,oadress,otel};
 console.log(ownerObject, "objeto owner");
 addOwner(idpet, ownerObject)   
 $("#owner-name").val("");
 $("#owner-adress").val("");
 $("#owner-tel").val("");
})
}

/*método put*/
function addOwner( key, ownerObject){
  $.ajax({
     url: `https://jquerycrud-ed8dc.firebaseio.com/ale/${key}.json`,
     type: 'PATCH',
     data: JSON.stringify({owner: ownerObject}),
     success: function(response) {
       console.log(response)
       getData()
       $('#exampleModal').modal('hide')
       
     }
  });
}
