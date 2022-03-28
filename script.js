const searchInput = document.getElementsByClassName("search-input")[0]
const searchSpan = document.getElementsByClassName("description")[0]
const eachResult = document.querySelector(".each-result")
const xIcon = document.getElementById("x-icon")
const searchIcon = document.getElementById("search-icon")
const row = document.querySelector(".row ")
let i =0 

function fetchApi(word){
    searchSpan.style.color="#000"
    searchSpan.innerHTML=`searching the meaning of "<span>${word}</span>"`
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then(result => addData(result))
}

function addData(result){
    console.log(result)
    if(result.title){
        searchSpan.innerHTML="No Definitions Found"
    }else{
        searchSpan.innerHTML="search a word and press Enter"
        searchInput.value = ""
    let searchedWord = result[0].word;
    let partSpeech=`${result[0].meanings[0].partOfSpeech} \ ${result[0].phonetic}`;
    let mean =result[0].meanings[0].definitions[0].definition;
    let example = result[0].meanings[0].definitions[0].example;
    let wordAudio = new Audio(result[0].phonetics[0].audio);
    if (example === undefined){
        example = ""
    }
    let synonyms = result[0].meanings[0].synonyms;
    if( synonyms[0] == undefined){
       synonyms =" "
    }
    const eachResultDiv = document.createElement("div")
    eachResultDiv.classList.add("col" ,"col-md-4" , "each-result")
    row.insertAdjacentElement('afterbegin', eachResultDiv);
    eachResultDiv.style.background=colorFunc();
    eachResultDiv.style.transform=rotateFunc();
    eachResultDiv.innerHTML=`
    <div class="word">
    <div>
    <h3 class="searched-word">${searchedWord}</h3>
     <span class="part-speech">${partSpeech}</span>
    </div>
    <svg id="audio" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
    <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
    </svg>       
    </div>
    <ul>
    <li  class="meaning">
    <h4>meaning : </h4>
    <span class="mean">${mean}</span>
    </li>
    <li class="example">
    <h4>example: </h4>
    <span class="examp"> ${example} </span>
    </li>
    <li class="synonyms">
    <h4>synonyms: </h4>
    <span> ${synonyms} </span>
    </li>
    </ul>      
    <svg id="close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
    `
    const audioPlayer = row.querySelector("#audio")
    audioPlayer.addEventListener("click" , ()=>{wordAudio.play()} )
    const closeBtn = row.querySelector("#close")
    closeBtn.addEventListener("click" , ()=>{
        eachResultDiv.remove();
    } )
}
}


searchInput.addEventListener("keyup" , e =>{
  if( e.key === "Enter" && e.target.value){
    fetchApi( e.target.value) 
  }
    }
)
xIcon.addEventListener("click" , ()=>{
    searchInput.value = ""
})

function rotateFunc(){
    const rotate =["rotate(5deg)" , "rotate(-7deg)" , "rotate(7deg)"  , "rotate(3deg)" , "rotate(-3deg)" , "rotate(-5deg)" ]
   return rotate[ Math.floor(Math.random() * rotate.length  )]
}


function colorFunc(){
    const colors =["#F79489" , "#F8AFA6", "#EF7C8E" , "#D8A7B1" , "#FFAEBC" , "#B99095"]; 
    if(i > colors.length - 1 ){
        i=0;
    }
    return colors[i++]
}




