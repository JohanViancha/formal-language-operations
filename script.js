
const c1 = ['a', 'b', 'c', 'd'];
const c2 = ['a', 'e', 'f', 'g'];



window.onload = ()=> {
    init();
}


const init = ()=>{
    const optionsAlphabet = document.querySelector('.alphabet');
    const subOptionsAlphabet =  document.querySelector('#alphabet');
    const subOptionsWords =  document.querySelector('#words');
    const subOptionsLanguage =  document.querySelector('#language');
    const optionsWords = document.querySelector('.words');
    const optionsLanguage = document.querySelector('.language');

    console.log(optionsAlphabet)

    optionsAlphabet.addEventListener('click',  (element)=>{
        subOptionsAlphabet.classList.toggle('alphabet-options')
    })

    optionsWords.addEventListener('click',  (element)=>{
        subOptionsWords.classList.toggle('word-options')
    })


    optionsLanguage.addEventListener('click',  (element)=>{
        subOptionsLanguage.classList.toggle('language-options')
    })
}

/*** Operations with alphabet  ***/

const belongingSets = (setA, setB) => {
    return  [...new Set(setB)].every((character) => findCharacterInAGroup(character, setA))
}

const joinSets = (setA, setB) => {
    return [...new Set(setA.concat(setB))]
}

const intersectionSets = (setA,setB) => {
    return  [... new Set(setA)].filter((character)=> findCharacterInAGroup(character, setB))
}

const complementSets = (univerSet, setB) =>{
    return [... new Set(univerSet)].filter((character)=> !findCharacterInAGroup(character, setB))
}

const absoluteDifference = () =>{
 ///Pendiente para aclarar con el profesor
}

const findCharacterInAGroup = (character, set) => new Set(set).has(character);

const symmetricalDifference = (setA, setB) =>{
    const characterSetaNotFoundInb = [...new Set(setA)].filter((character)=> !findCharacterInAGroup(character, setB))
    const characterSetbNotFoundIna = [...new Set(setB)].filter((character)=> !findCharacterInAGroup(character, setA))

    return joinSets(characterSetaNotFoundInb, characterSetbNotFoundIna)
}



/** Operations with words */

const lengthWord = (word) => word.length;

const concatWords = (wordA ='', wordB ='') => wordA.concat(wordB);

const boostAWord = (boost, word) => {
    if(boost==0) return 'vacío';
    let wordConcat = '';
    for (let index = 0; index < boost; index++) wordConcat += word;
    return wordConcat;
}

const inverseOfWord = (word) => word.split("").reverse().join("");


/** Operations with language */

const concatLanguage = (langA, langB) =>{
    const concatAAndB = [];
    langA.unshift('')
    for (let i = 0; i < lengthWord(langA); i++) {
        for (let j = 0; j < lengthWord(langB); j++) {    
            console.log(concatWords(langA[i], langB[j]));   

            concatAAndB.push(concatWords(langA[i], langB[j]));
        }        
    }

    return concatAAndB;

}


const cloneLanguage = (n, lang)=> {
    let arrayLang = [];
    for (let index = 0; index < n; index++){
        arrayLang.push(lang.slice(lang[index])) 
    }
    return arrayLang
}

let count = 1;
const boostLanguage = (boost,lang,size,resultLang) => {

    if(boost===1) return lang;
    for (let index = 0; index < boost ; index++) {
        for (let j = 0; j < boost; j++) {
            //console.log(concatWords(lang[index], lang[j]).concat(resultLang[index]))
            resultLang.push(concatWords(lang[index], lang[j]))      
        }      
    }

   if(boost-1 > count) {
        count++;
        console.log('afdas')
       // boostLanguage(boost,lang,size,resultLang)
   }

    //arrayResult = [];
    //count = 1;
    return resultLang;
}


const reverseLanguage = (lang) => {
    return lang.map((character)=> inverseOfWord(character))
}

const joinLanguage = (langa, langb) => {
    const aaa = joinSets(langa,langb);
    aaa.unshift('');
    return aaa
}

const intersectionLanguage = (langa, langb) => {
    return  intersectionSets(langa, langb)
}

const subtractLanguage =  (langa, langb)=> {
    const aaa = complementSets(langa, langb)
    aaa.unshift('');
    return aaa;
}



// console.log(belongingSets(c1,c2));
// console.log(joinSets(c1,c2))
// console.log(intersectionSets(c1,c2))
// console.log(complementSets(c1,c2))
// console.log(symmetricalDifference(c1,c2))
// console.log(lengthWord('gs'))
// console.log(concatWords('abc','def'))
// console.log(boostAWord(4, 'abc'))
// console.log(inverseOfWord('hola'))
// console.log(concatLanguage(['carro','moto'],['cicla','bus']));
//console.log(boostLanguage(2,['a','b','c']));
//console.log(reverseLanguage(['0','01','1234', '111']))
//console.log(joinLanguage(['lana','papa', 'perro'], ['nana','natis','pepa']))
//console.log(intersectionLanguage(['lana','papa', 'perro'], ['lana','natis','papa']))
// console.log(subtractLanguage(['lana', 'papa'],['papa']))
// console.log(subtractLanguage(['papa'],['lana', 'papa']))

console.log(boostLanguage(3,['a','b'],['a','b'].length, []))


