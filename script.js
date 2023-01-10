const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


/*Feth se usa para trabajar con REST APIs
await es una promesa que sirve solo con la funcion async
 y contiene un codigo que cargara pronto. 

*/

let apiQuotes=[];

//show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}


//show new quote
function newQuote(){
    loading();
    //PICK A RAmdom quote from apiquotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

    // check if author field is blank and replace it with 'unknown'

    if(!quote.author){
        authorText.textContent='unknow';
    }else{
        authorText.textContent=quote.author;
    }
    
    //check quote length to determine styling, quote.text is the array.
if(quote.text.length>50){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}

    //Set Quote, Hide Loader

    quoteText.textContent = quote.text;
    complete();
}




//Get Quotes From API
async function getQuotes(){

    loading();

    //esta constante se puede omitir si se pone directo al fetch
    const apiUrl='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    
    } catch(error){
        //catch error here
    }
}


//Tweet Quote

function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();


/*local*/
/*

function newQuote(){
    const quote =localQuotes[Math.floor(Math.random()*localQuotes.length)];
    console.log(quote);
}

newQuote();*/