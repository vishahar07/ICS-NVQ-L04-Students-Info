function initials(name){
  return name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();
}

function makeUrl(id){
  return window.location.origin + window.location.pathname + "?id=" + encodeURIComponent(id);
}

function cardHTML(s){
  const photo = s.photo
    ? `<img src="${s.photo}" alt="${s.name}">`
    : `<span>${initials(s.name)}</span>`;
  return `
    <article class="card" id="card-${s.id}">
      <div class="card-head">
        <div>
          <h3>${s.name}</h3>
          <div class="student-id">Student ID: ${s.id}</div>
        </div>
        <div class="photo">${photo}</div>
      </div>
      <div class="card-body">
        <div class="row"><span class="label">Course</span><span class="value">${s.course}</span></div>
        <div class="row"><span class="label">Batch</span><span class="value">${s.batch}</span></div>
        <div class="row"><span class="label">Date of Birth</span><span class="value">${s.dob}</span></div>
        <div class="row"><span class="label">Address</span><span class="value">${s.address}</span></div>

      </div>
      <div class="card-actions">
        <button onclick="openStudent('${s.id}')">Open Card</button>
        <button class="secondary" onclick="printStudent('${s.id}')">Print</button>
      </div>
    </article>`;
}

function render(list=students){
  const grid=document.getElementById("studentGrid");
  grid.innerHTML=list.map(cardHTML).join("");
  document.getElementById("empty").style.display=list.length?"none":"block";
  list.forEach(s=>{
    new QRCode(document.getElementById("qr-"+s.id),{
      text:makeUrl(s.id),width:110,height:110,colorDark:"#123b63",colorLight:"#ffffff"
    });
  });
}

function searchStudents(){
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  if (q === ""){
    render(students);
    return;
  }
  const results = students.filter(function(s){
    const name = String(s.name || "").toLowerCase();
    const id = String(s.id || "").toLowerCase();
    
    const idNumber = id.replace(/\D/g, "");
    return (
      name.includes(q) ||
      id.includes(q) ||
      idNumber.includes(q)
    );
  });
render(results);
  }

function showAll(){
  document.getElementById("searchInput").value="";
  render(students);
}

function openStudent(id){
  window.location.href=window.location.pathname+"?id="+encodeURIComponent(id);
}

function printStudent(id){
  document.querySelectorAll(".card").forEach(c=>c.classList.remove("print-target"));
  const target=document.getElementById("card-"+id);
  if(target){target.classList.add("print-target");window.print();}
}

function singleStudent(id){
  const s=students.find(x=>x.id.toLowerCase()===id.toLowerCase());
  if(!s){document.body.innerHTML="<main class='single-view'><h2>Student not found</h2><a class='back' href='"+window.location.pathname+"'>← Back to all students</a></main>";return;}
  document.querySelector(".topbar").style.display="none";
  document.querySelector(".hero").style.display="none";
  const grid=document.getElementById("studentGrid");
  grid.className="single-view";
  grid.innerHTML="<a class='back' href='"+window.location.pathname+"'>← Back to all students</a>"+cardHTML(s);
  document.getElementById("empty").style.display="none";
  new QRCode(document.getElementById("qr-"+s.id),{text:makeUrl(s.id),width:150,height:150,colorDark:"#123b63",colorLight:"#ffffff"});
}

const params=new URLSearchParams(window.location.search);
const studentId=params.get("id");
if(studentId) singleStudent(studentId);
else render();
