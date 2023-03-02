let resultLeft = document.querySelector("#result-left");
let equal = document.querySelector("#equal");
let resultRight = document.querySelector("#result-right");
const InputSetsA = document.querySelector("#setsA");
const InputSetsB = document.querySelector("#setsB");
const labelA = document.querySelector("#name-sets");
const btnChange = document.querySelector("#btn-change");


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
    const typeOptions = document.querySelectorAll('.options-type li');
    const calculate = document.querySelector("#calculate");

   
    let operations = {};
    
    typeOptions.forEach((option)=>{
        option.addEventListener('click', ({target})=>{
            operations = {sets:target.dataset.type, operations: target.innerText, description:target.dataset.description}
            showTitle(operations);
            showPlaceHolder(operations.sets,operations["operations"])
        })
    })

    btnChange.addEventListener('click', (element)=> {
        element.target.classList.toggle('animation-rotate')
    })

    calculate.addEventListener('click',()=>{
        executeOperations(operations, {setsA:InputSetsA.value.split(','), setsB:InputSetsB.value.split(',')});
    })
   
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


const executeOperations = (operation, sets) =>{
   
    let options = {
        'Pertenencia' : ()=>{ 
            console.log('aa')
            belongingSets(sets["setsA"], sets["setsB"])
        },
        'Unión': ()=>  joinSets(sets["setsA"], sets["setsB"]),
        'Intersección': ()=> intersectionSets(sets["setsA"], sets["setsB"]),
        'Complemento': ()=> complementSets(sets["setsA"], sets["setsB"])
        // 'alphabet-complement': complementSets(),
        // 'alphabet-absolute-difference': absoluteDifference(),
        // 'alphabet-symmetrical-difference': absoluteDifference()
         // 'words-length': belongingSets(),
        // 'words-concat': joinSets(),
        // 'words-boost': intersectionSets(),
        // 'words-reverse': complementSets()

        // 'language-concat': belongingSets(),
        // 'language-boost': joinSets(),
        // 'language-reverse': intersectionSets(),
        // 'language-join': complementSets(),
        // 'language-intersection': absoluteDifference(),
        // 'language-substract': absoluteDifference(),
        // 'language-kleene': absoluteDifference(),
        // 'language-positve': absoluteDifference()
    }

    return options[operation["operations"]](); 

}

const showTitle = (textOperations) => { 
    const titleTypeSets = document.querySelector("#title-type-sets")
    const titleTypeOperations = document.querySelector("#title-type-operations")
    const descriptionOperations = document.querySelector("#description-operations");
    titleTypeSets.innerHTML = textOperations.sets
    titleTypeOperations.innerHTML = textOperations.operations
    descriptionOperations.innerHTML = textOperations.description
}

const showPlaceHolder = (placeHolder,operation ) =>{
    const article = placeHolder==='Cadena' ? 'la':'el';

    if(operation === 'Complemento'){
        labelA.innerHTML = 'Conjunto U'
        InputSetsA.placeholder = 'Ingresa el conjunto U (seperados por coma ",")'
        InputSetsB.placeholder  = `Ingresa ${article} ${placeHolder.toLowerCase()} B (seperados por coma ",")`
        return;
    }

    if(operation === 'Diferencia absoluta') btnChange.style.display = 'block';

    InputSetsA.placeholder  = `Ingresa ${article} ${placeHolder.toLowerCase()} A (seperados por coma ",")`
    InputSetsB.placeholder  = `Ingresa ${article} ${placeHolder.toLowerCase()} B (seperados por coma ",")`
}

/*** Operations with alphabet  ***/

const belongingSets = (A, B) => {
    resultLeft.innerText = 'B'
    equal.innerHTML = [...new Set(B)].every((character) => findCharacterInAGroup(character, A)) ? '&isin;': '&notin;';
    resultRight.innerText = 'A'
}

const joinSets = (A, B) => {
    resultLeft.innerHTML = `A ${'&cup;'} B`
    equal.innerText = '='
    resultRight.innerText =  `{ ${[...new Set(A.concat(B))]} }`
   
}

const intersectionSets = (A,B) => {
    resultLeft.innerHTML = `A ${'&cap;'} B`
    equal.innerText = '='
    resultRight.innerText =  `{ ${[... new Set(A)].filter((character)=> findCharacterInAGroup(character, B))} }`
}

const complementSets = (univerSet, B) =>{
    console.log('asaf')
    resultLeft.innerText = `B’`
    equal.innerText = '='
    resultRight.innerText = `{ ${[... new Set(univerSet)].filter((character)=> !findCharacterInAGroup(character, B))} }` 
}

const absoluteDifference = () =>{
 ///Pendiente para aclarar con el profesor
}

const findCharacterInAGroup = (character, set) => new Set(set).has(character);

const symmetricalDifference = (A, B) =>{
    const characterSetaNotFoundInb = [...new Set(A)].filter((character)=> !findCharacterInAGroup(character, B))
    const characterSetbNotFoundIna = [...new Set(B)].filter((character)=> !findCharacterInAGroup(character, A))

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


