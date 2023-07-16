const inputEl=document.getElementById("input")
const infoTextEl=document.getElementById("info")
const meaningContainerEl=document.getElementById("meaning-container")
const titleEl=document.getElementById("title")
const meaningEl=document.getElementById("meaning")
const audioEl=document.getElementById("audio")


async function fetchAPI(word){
    try{
        //Search waiting is turned on//
        infoTextEl.style.display="block"
        //Search waiting to action//
        infoTextEl.innerText=`Searching the meaning of '${word}'`
        //collecting word from dictionary API//
    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    //Storing the word to variable result and converting it to json file//
    const result=await fetch(url).then((res)=>res.json());

   //if the word does not have a meaning//

    if(result.title)
    {  
        // search waiting is turned off//
        infoTextEl.style.display="none"
        titleEl.innerText=word;
        //meaning of the word is said to be not available//
        meaningEl.innerText="Not Available"
        //audio made disable//
        audioEl.style.display="none"
    }
    else{


       // search waiting is turned off//
   infoTextEl.style.display="none"
   //audio made enable and palced it to the center 
   audioEl.style.display="inline-flex"
   //container containg the word and meaning is made visible//
    meaningContainerEl.style.display="block"
    //taken the word from dictonary API//
    titleEl.innerText=result[0].word
    //taken the meaning from the dictonary API//
  meaningEl.innerText=result[0].meanings[0].definitions[0].definition
  //taken the audio from the dictionary API//
  audioEl.src=result[0].phonetics[0].audio
    }
}
catch (error){
    //if some network issue it will be caught here//
    console.log("some error happend.Try again later")
}
}
    //the input text element works only if there is a word and enter key pressed after the word//
inputEl.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key==="Enter"){
        //move to the function fetchAPI//
        fetchAPI(e.target.value)
    }
})