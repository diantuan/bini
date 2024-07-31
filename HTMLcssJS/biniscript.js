
const cart = document.querySelector("#cartjs");
const orderbuttons = document.querySelector(".orderbuttons");
const itemdiv = document.querySelector("#items");
const totes = document.querySelector("#totalat");
const checkout = document.querySelector("#checkout button");

let cartno = 0;


// declare product infos in an object array
const allMerch = [

  {
    name: "Bini T-shirt",
    price: 999,
    quantity: 0,
    src:"https://unseennorms.com/cdn/shop/files/BINISALAMINBLACK.png?v=1714039876&width=1920",
    id: "tshirt"
  },
  {
    name: "Bini Lightstick",
    price: 2000,
    quantity: 0,
    src:"https://pbs.twimg.com/media/GEfZXmIaAAAyzHp.jpg",
    id: "lightstick"
  },
{
  name: "Biniverse Ticket",
  price: 3000,
  quantity: 0,
  src:"https://ticketnetonline.s3.ap-southeast-1.amazonaws.com/files/events/seatmap/BiniVerseWebMap.jpg",
  id: "ticket"
},
{
  name: "Bini Photocards",
  price: 200,
  quantity:0,
  src:"https://pbs.twimg.com/media/Fj_Y6WQVIAA-Fnc.jpg",
  id: "photocard"
}
];

// define listProducts function by mapping individual object items

const listProducts = itemsArray => {

  const buttonHTML =  itemsArray.map( item =>{
return `
    <div>
      <button type="button" id="${item.id}">Buy ${item.name}</button>
      <img src=${item.src}><span></span>
    </div>
    `
  }).join("");

orderbuttons.innerHTML =  buttonHTML;
}

// call listProducts function
listProducts(allMerch);




// define addToCart function
function addToCart(){

  cartno++;
  cart.innerHTML = `${cartno}`;}
  

/*  define addItems function by mapping object items with the quantity property*/
  const addItems = (itemIndex) =>{
 function hahaha(){
    addToCart();
    ++allMerch[itemIndex].quantity;
    const merchArrayHTML = allMerch.map( item => {
        if (item.quantity > 0){
          return `
            <div> <span class="itemname"> ${item.quantity} ${item.name} </span>
            <span class="itemprice"> ${item.price*item.quantity} </span></div><br>
             `}
        else{
          return null;
            }
      }
      ).join("");
  itemdiv.innerHTML = merchArrayHTML;
  total(allMerch);
    }
    return hahaha;
}


// iterate through the products object array to store the button element for each and call the addItems function
for (let i = 0; i< allMerch.length; ++i){
  const purchaseButton = document.getElementById(`${allMerch[i].id}`);
  purchaseButton.addEventListener("click", addItems(i));
}


// call checkout
checkout.addEventListener("click", checkOut); 



// define the total price function
function total(allItems){
  let totalPrice = 0;
  for (const item of allItems){
    totalPrice += item.quantity*item.price;
  }
  
  totes.innerHTML = `${totalPrice}`;
  
};





function checkOut(){

  let totalNumber = 0;
  
  for (const item of allMerch){
   
    totalNumber += item.quantity;
    
  }

  if (totalNumber >0 ){
    alert('Thank you for purchasing Bini Merch!')
  }
  else{
    alert('You don\'t have anything in the cart')
  }
  
  
};





// get mp3player
const mp3container = document.getElementById("mp3container");



// list songs info
const allSongs = [

  {
    id: 9,
    name: "Pantropiko",
    duration: "3:45",
    src: `songs\\BINI - Pantropiko (Lyrics).mp3`,
    time: 225000
  },
  {
    id: 10,
    name: "Cherry On Top",
    duration: "2:55",
    src: "songs\\BINI - Cherry On Top Lyrics (Framed) (1).mp3",
    time: 175000

  },
  {
    id: 11,
    name: "Karera",
    duration: "4:27",
    src: "songs\\BINI - Karera Lyrics (Framed).mp3",
    time: 267000
  },
  {
    id: 12,
    name: "I Feel Good",
    duration: "0:56",
    src:"songs\\BINI - I Feel Good Lyrics (Framed).mp3",
    time:56000
  },
   {
    id: 13,
    name: "Golden Arrow",
    duration: "3:47",
    src:"songs\\BINI - Golden Arrow Lyrics (Framed).mp3",
    time:227000
   },
   {
    id: 14,
    name: "Na Na Na",
    duration: "4:08",
    src:"songs\\BINI - Na Na Na Lyrics (Framed).mp3",
    time:248000
   }
  ,
  {
    id: 15,
    name:"Salamin Salamin",
    duration: "3:50",
    src:"songs\\@BINIPH - Salamin, Salamin Lyrics (Framed).mp3",
    time:230000
  }

]


// function to render songs
const renderSongs = (array) =>{
const mp3HTML = array.map( item => {
return `
<div class="mp3song">
<button class = "mp3button" id = "mp3${item.id}" onclick = "playSong(${item.id})">
<span class="songname">${item.name} </span>
<span class="songduration">${item.duration}</span>
</button>
</div>
`
}).join("")

mp3container.innerHTML = mp3HTML;

}


// function to sort songs
const sortSongs = (array)=>{
  const sorted = array.sort((a,b)=>{
    if (a.name < b.name)
  {
    return -1
  }
  if(a.name > b.name ){
    return 1
  }

  return 0;

  })

  return sorted;
}

// create audio object
const audio = new Audio();

// declare user data
const userSong = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime:0
};

//call sortSongs
const sortedSongs = sortSongs(userSong.songs);


// call rendersongs function
const currentPlaylist = renderSongs(sortedSongs);



// function to play song
const playSong = (id) =>{
  const foundsong =  userSong.songs.find(song => song.id === id);
  
  audio.src = foundsong.src;

  if (userSong.currentSong === null ||foundsong.id !== userSong.currentSong.id){
    audio.currentTime = 0;

  }
  else{
    audio.currentTime = userSong.songCurrentTime;
  }

 
  userSong.currentSong = foundsong;
  
  audio.play();

  highlightSong();
  displaySong();

  
  };

  
  


  //function to pause song
function pauseSong(){
 userSong.songCurrentTime = audio.currentTime;
  console.log(userSong.songCurrentTime);
  audio.pause();
}

// function to play next
  const playNext = () =>
  {
    const nextIndex = userSong.songs.indexOf(userSong.currentSong) + 1;
    
    if(nextIndex > userSong.songs.length -1){
      playSong(userSong.songs[userSong.songs.length-1].id);
    }
    else{
      playSong(userSong.songs[nextIndex].id);
    }
    audio.currentTime = 0;

  }

//function to play previous
  const playPrevious = () =>{
    const previousIndex = userSong.songs.indexOf(userSong.currentSong)-1;

    if(previousIndex < 0){
      playSong(userSong.songs[0].id);
    }
    else{
      playSong(userSong.songs[previousIndex].id);
    }
    audio.currentTime = 0;
    ;
  }


//get playpause buttons
const playButton = document.querySelector("#play");
const previousButton = document.querySelector("#previous");
const pauseButton = document.querySelector("#pause");
const nextButton = document.querySelector("#next");

// add function to playButton
playButton.addEventListener("click", function whatSong() {
 
  if(userSong.currentSong === null){
    playSong(userSong.songs[0].id)
  }
  else{
    playSong(userSong.currentSong.id);
  }

})
  
pauseButton.addEventListener("click", pauseSong);
previousButton.addEventListener("click", playPrevious);
nextButton.addEventListener("click", playNext);


//function to highlight song
function highlightSong(){
  
  for (const item of userSong.songs){
    if(item.id === userSong.currentSong.id){
      
      const accessedHTML = document.querySelector(`#mp3${item.id}`);
      accessedHTML.style.border="3px solid lightslategray";

    }
    else{
      const accessedHTML = document.querySelector(`#mp3${item.id}`);
      accessedHTML.style.border="none";
    }
   
  }

}

//function to display song to led

function displaySong(){

  for(const item of userSong.songs){
    if(item.id === userSong.currentSong.id){
      const accessLed = document.querySelector("#song-disp");
      accessLed.innerHTML = `NOW PLAYING - ${item.name} `;
      
    }
    else{
      const accessLed = document.querySelector("#song-disp");
      accessLed.insertAdjacentHTML="";
    }
  }
}





// scrollbar

const gallery = document.getElementById("gallery-container");
const gallerybuttonleft = document.getElementById("gallerybuttonleft");
const gallerybuttonright = document.getElementById("gallerybuttonright");




gallerybuttonleft.addEventListener("click", () =>{
  gallery.scrollLeft -= 600;
  gallery.style.scrollBehavior = "smooth";
  })

  gallerybuttonright.addEventListener("click", () => {
    gallery.scrollLeft += 600;
    gallery.style.scrollBehavior = "smooth";
  })