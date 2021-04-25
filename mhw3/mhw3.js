const pref='https://image.freepik.com/free-vector/illustration-medical-icon_53876-6166.jpg';
const l=nomi.length;
const API_KEY ='2324be91e5f2fbde683b37869f4e83fe';
const request = 'http://api.mediastack.com/v1/news?languages=it&keywords=gaming&limit=10&access_key=' + API_KEY;
const API_KEY2 ='21231279-2b78ec4a53a7ef3a35593d518';



//inizio api news con la key

function OnJson(json){
    console.log(json);
    let news=document.querySelector('#mhw3');


    for (let i = 0; i < 10; i++)
    {

        let titolo = document.createElement('h1');
        let link= document.createElement('a');

        titolo.textContent = json.data[i].title;
        link.textContent = 'Visita il sito\n';
        link.addEventListener('click',function(){location.href=json.data[i].url});


        const cont = document.createElement('div');
        cont.classList.add('container');
        cont.id=i;

        news.appendChild(cont);
        cont.appendChild(link);
        cont.appendChild(titolo);

    }



}


function OnResponse(response){

    return response.json();
}


fetch(request).then(OnResponse).then(OnJson);

//fine api news con la key

//inizio apikey2
function onJson_img(json) {
  console.log(json);
  const screenshots= document.querySelector('#screen');
  screenshots.innerHTML='';


  for(let i=0;i<3;i++){
      const div= document.createElement('div');
      const img= document.createElement('img');
      console.log(json.hits[i].largeImageURL);
      const screen= json.hits[i].largeImageURL;
      img.src=screen;
      console.log(img);
      screenshots.appendChild(div);
      div.appendChild(img);
  }
}


function onResponse_img(response) {
  return response.json();
}



const img_api_endpoint = 'https://pixabay.com/api/';
const numResults = 100;

let results;
var i = 0;

function cerca(event){
  event.preventDefault();
  const TITOLO=document.querySelector('#form')
  const text=encodeURIComponent(TITOLO.value);
  fetch(img_api_endpoint + '?key='  + API_KEY2 + '&q='+text+ '&per_page=' + numResults).then(onResponse_img).then(onJson_img);
}

const form = document.querySelector('form');
form.addEventListener('submit',cerca);

fetch(request).then(OnResponse).then(OnJson);

//fine seconda apikey

//gestione preferiti prima fase



function seedetails(event){
    const pdett= event.currentTarget;
    const descrizione=pdett.parentElement.querySelector("p");
    pdett.classList.add("hidden");
    descrizione.classList.remove("hidden");
    descrizione.addEventListener("click",lessdet);
}

function lessdet(event){
    const ldett=event.currentTarget;
    ldett.parentElement.querySelector("h2").classList.remove("hidden");
    ldett.classList.add("hidden");
}

//fine gestione preferiti prima fase

//barra di ricerca fasi intere

function search(event){
    const bar=event.currentTarget;
    var x;
    console.log(bar.value);

    for(let i=0;i<l;i++){
        if(prodotti[i].textContent.search(bar.value)!==-1){
            x=prodotti[i].parentElement;
            x.classList.remove("hidden");
        }

        else{
            x=prodotti[i].parentElement;
            x.classList.add("hidden");
        }
    }

}

//fine barra di reicerca


//caricamento dinamico
for(let i=0; i<l; i++){
const box=document.createElement('div');
box.id='box'+i; 

const nome=document.createElement('h1');
nome.innerHTML=nomi[i];

const cuore=document.createElement('img');
cuore.id='tastocuore'
cuore.src=pref;
cuore.addEventListener('click', aggPref);

const img=document.createElement('img');
img.id='imm';
img.src=immagini[i];

const details=document.createElement('h2');
details.innerHTML='Clicca Per Scoprire';
details.addEventListener('click',seedetails);

const descrizione=document.createElement('p');
descrizione.innerHTML=desc[i];
descrizione.className='hidden';


document.getElementById('lista').appendChild(box);
document.getElementById('box'+i).appendChild(nome);
document.getElementById('box'+i).appendChild(cuore);
document.getElementById('box'+i).appendChild(img);
document.getElementById('box'+i).appendChild(details);
document.getElementById('box'+i).appendChild(descrizione);
console.log(box);


}
//fine caricamento dinamico

//gestione preferiti seconda fase
const listaBoxPref=[];
var nbox=1+listaBoxPref.length;

function createImage(src){
    const image = document.createElement('img');
    image.src= src;
    return image;
  }



function rimuoviBoxPreferito(id2){

    for(let i=0;i<nbox-1;i++)
      if(listaBoxPref[i].id == id2){
      listaBoxPref.splice(i,1);
      break;}
    nbox-=1;
  
  }
  
  function RimuoviPreferiti(event){
   
    const button=event.currentTarget;  
    const idBoxDaRimuovere = button.parentElement.id;
    
    //lo tolgo dalle liste
    rimuoviBoxPreferito(idBoxDaRimuovere);
    console.log(listaBoxPref);
    button.parentElement.remove();
    console.log(listaProdPreferiti);
  
    //se la lista rimane vuota nascondere lista preferiti
    
    if(listaBoxPref.length==0)
      listaPref.classList.add('hidden');
    
    
  }
  
  function creaPreferito(boxDaCopiare){
  
    const box = document.createElement('div');
    
  
    const tit = document.createElement('h1');
    tit.textContent = boxDaCopiare.querySelector('h1').textContent;
  
    const unlike_button = createImage(pref);
    unlike_button.className='removecuore';
    unlike_button.addEventListener('click',RimuoviPreferiti);
  
    const img = createImage(boxDaCopiare.querySelector('#imm').src);
    img.id='imm';
  
  
    box.appendChild(tit);
    box.appendChild(unlike_button);
    box.appendChild(img);
    
    return box;
  
  }
  
  function aggPref(event){
    
    const button = event.currentTarget;
    
    for(let i=0;i<listaBoxPref.length;i++)
      if(listaBoxPref[i].id == button.parentElement.id)
      return;
    
    const boxDaCopiare=button.parentElement;
    const boxCopiato = creaPreferito(boxDaCopiare);
    boxCopiato.id=boxDaCopiare.id;
  
    if(listaBoxPref.length==0)
      listaPref.classList.remove('hidden');
    
    listaBoxPref.push(boxCopiato);
    listaProdPreferiti.appendChild(boxCopiato);
    nbox+=1;
  
   console.log(listaPref);
  }


const prodotti=document.querySelectorAll("#lista div h1");
const sb=document.querySelector('input[type="text"]');
sb.addEventListener("keyup",search);
const listaPref=document.querySelector('#preferiti');
const listaProdPreferiti=document.querySelector('#listapref');
