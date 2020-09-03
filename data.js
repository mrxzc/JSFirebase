
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDroCJ4plQcAYV79tjSYw904g1ipfOg4AE",
    authDomain: "dosis-beab7.firebaseapp.com",
    databaseURL: "https://dosis-beab7.firebaseio.com",
    projectId: "dosis-beab7",
    storageBucket: "dosis-beab7.appspot.com",
    messagingSenderId: "908632411313",
    appId: "1:908632411313:web:454be0db97e8ee2700e690",
    measurementId: "G-3S999YGSRM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var date = new Date();
  var time = date.getTime();
  var counter = time;

  var form = document.getElementById("formInput");
  var sectionOne = document.getElementById("sectionOne");
  var sectionTwo = document.getElementById("sectionTwo");

  var button1 = document.getElementById("button1");
  var button2 = document.getElementById("button2");
  var button3 = document.getElementById("button3");

  var idDummy = null;
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var desc = document.getElementById("desc").value;

  var alertx = document.getElementById("alertx");
  var alertw = document.getElementById("alert-wrapper");
 
  var ExModal = document.getElementById("myModal");
  var modalBody = document.getElementById("modalBody");
  var modalFooter = document.getElementById("modalFooter")
 
  


readData({case:"ADD",syntax:"child_added"});

  button1.addEventListener("click",(e)=>{
      e.preventDefault();
      title = document.getElementById("title").value;
      author = document.getElementById("author").value;
      desc = document.getElementById("desc").value;
      createData(title,author,desc);
  })

  button2.addEventListener("click",(e)=>{
  
    e.preventDefault();
    casex = {type:"DATA_CHANGED",msg:"Are you sure want to update the data?"}
    params = {
      id:idDummy,
      title : document.getElementById("title").value,
      author : document.getElementById("author").value,
      desc : document.getElementById("desc").value
    }
    modalPop(casex,params);
 
})

  button3.addEventListener("click",(e)=>{
    button1.style.display="inline-block"; 
    button2.style.display="none"; 
    button3.style.display="none"; 
    e.preventDefault();
    form.reset();
})



  function createData(title,author,desc){
      counter+=1;
      var data={
          id:counter,
          title:title,
          author:author,
          desc:desc
      }

      let db_create = firebase.database().ref("Data/"+counter);
      db_create.set(data);
      form.reset();
      readData({case:"ADD",syntax:"child_added"});
      alertPop("Data Added Successfully")
  }

  function readData(getType){
    sectionTwo.innerHTML = ``;
    switch (getType.case) {
      case "ADD":
    
        var data = firebase.database().ref('Data/');
        data.on(getType.syntax,function(res){
            var dataVal = res.val();
  
            sectionTwo.innerHTML += `
            <div class="card mb-3">
            <div class="card-header">
                  ${dataVal.title}
              </div>
              <div class="card-body">
                 <h5>Author : ${dataVal.author}</h5>
                 <h6 style="margin:15px 0px 2px">Description</h6>
                 <p style="text-align:justify;">${dataVal.desc}</p>
                 <button type="submit" style="color:white;" class="btn btn-warning" onclick="updateRes(${dataVal.id},'${dataVal.title}','${dataVal.author}','${dataVal.desc}')">Update Data</button>
                 <button type="submit" style="color:white;" class="btn btn-danger" onclick="deleteRes(${dataVal.id})">Delete Data</button>
              </div>
            </div>
            `
        });
        break;
      case "UPDATE":
        var data = firebase.database().ref('Data/');
        data.on(getType.syntax,res => {
            var dataVal = res.val();
            console.log(getType.syntax)
            console.log(dataVal.id)
            sectionTwo.innerHTML += `
            <div class="card mb-3">
            <div class="card-header">
                  ${dataVal.title}
              </div>
              <div class="card-body">
                 <h5>Author : ${dataVal.author}</h5>
                 <h6 style="margin:15px 0px 2px">Description</h6>
                 <p style="text-align:justify;">${dataVal.desc}</p>
                 <button type="submit" style="color:white;" class="btn btn-warning" onclick="updateRes(${dataVal.id},'${dataVal.title}','${dataVal.author}','${dataVal.desc}')">Update Data</button>
                 <button type="submit" style="color:white;" class="btn btn-danger" onclick="deleteRes(${dataVal.id})">Delete Data</button>
              </div>
            </div>
            `
        });
        break;
      case "REMOVE":
        var data = firebase.database().ref('Data/');
        data.on(getType.syntax,function(res){
            var dataVal = res.val();
  
            sectionTwo.innerHTML += `
            <div class="card mb-3">
            <div class="card-header">
                  ${dataVal.title}
              </div>
              <div class="card-body">
                 <h5>Author : ${dataVal.author}</h5>
                 <h6 style="margin:15px 0px 2px">Description</h6>
                 <p style="text-align:justify;">${dataVal.desc}</p>
                 <button type="submit" style="color:white;" class="btn btn-warning" onclick="updateRes(${dataVal.id},'${dataVal.title}','${dataVal.author}','${dataVal.desc}')">Update Data</button>
                 <button type="submit" style="color:white;" class="btn btn-danger" onclick="deleteRes(${dataVal.id})">Delete Data</button>
              </div>
            </div>
            `
        });
        break;
    
      default:
        break;
    }
     
  }

  function updateRes(id,title,author,desc){
    button1.style.display="none"; 
    button2.style.display="inline-block"; 
    button3.style.display="inline-block"; 
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("desc").value = desc;
    idDummy = id;
  }

  function deleteRes(id){
    casex = {type:"DATA_REMOVED",msg:"Are you sure want to delete the data?"}
    params = {
      id:id
    }
    modalPop(casex,params);
  }

  function updateData(params){
     var dataUpdated = params
  
      let db_update= firebase.database().ref("Data/"+params.id);
      db_update.set(dataUpdated);
      button1.style.display="inline-block"; 
      button2.style.display="none"; 
      button3.style.display="none"; 
      form.reset();
      readData({case:"ADD",syntax:"child_added"});
      alertPop("Data Updated Successfully")
  }

  function deleteData(params){
    let db_delete= firebase.database().ref("Data/"+params.id);
    db_delete.remove();
    readData({case:"ADD",syntax:"child_added"});
    alertPop("Data Removed Successfully")
 
}


function modalPop(data,params){
  switch (data.type) {
    case "DATA_CHANGED":
      modalBody.innerHTML = `${data.msg}`
      modalFooter.innerHTML = `
      <button  type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
      <button  type="button" class="btn btn-primary" data-dismiss="modal" onclick="updateData(params)">Yes</button>
      `;
      $('#myModal').modal('show');
      break;
    case "DATA_REMOVED":
      modalBody.innerHTML = `${data.msg}`
      modalFooter.innerHTML = `
      <button  type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
      <button  type="button" class="btn btn-primary" data-dismiss="modal" onclick="deleteData(params)">Yes</button>
      `;
      $('#myModal').modal('show');
      break;

  
    default:
      break;
  }
}

function alertPop(alertMsg){
  alertx.innerHTML = `${alertMsg}`;
    alertw.style.display = "inline";
    alertw.style.webkitAnimationPlayState = "running";
  setTimeout(() => {
    alertw.style.display = "none";
  }, 4000);
}
  