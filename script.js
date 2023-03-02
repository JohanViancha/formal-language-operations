let resultLeft = document.querySelector("#result-left");
let equal = document.querySelector("#equal");
let resultRight = document.querySelector("#result-right");
const InputSetsA = document.querySelector("#setsA");
const InputSetsB = document.querySelector("#setsB");
const labelA = document.querySelector("#name-setsA");
const labelB = document.querySelector("#name-setsB");
const btnChange = document.querySelector("#btn-change");
let changeOrder = true;

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
            clearForm();
            showPlaceHolder(operations.sets,operations["operations"])
            validateShowElement(operations["operations"]);
        })
    })

    btnChange.addEventListener('click', (element)=> {
        element.target.classList.toggle('animation-rotate')
        changeOrder = !changeOrder;
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
            resultLeft.innerText = 'B';
            resultRight.innerText = 'A';
            equal.innerHTML = belongingSets(sets["setsA"], sets["setsB"]);
        },
        'Unión': ()=>  {
            resultLeft.innerHTML = `A ${'&cup;'} B`;
            equal.innerText = '=';
            resultRight.innerText = joinSets(sets["setsA"], sets["setsB"]);
        },
        'Intersección': ()=> {
            resultLeft.innerHTML = `A ${'&cap;'} B`;
            equal.innerText = '=';
            labelA.innerText = 'Conjunto U';
            resultRight.innerText = intersectionSets(sets["setsA"], sets["setsB"]);
        },
        'Complemento': ()=> {
            resultLeft.innerText = `B’`;
            equal.innerText = '=';
            resultRight.innerText = complementSets(sets["setsA"], sets["setsB"]);
        },
        'Diferencia absoluta': ()=> {
            resultRight.innerText = absoluteDifference(sets["setsA"], sets["setsB"]);
        },
        'Diferencia simétrica': ()=> {
            resultLeft.innerHTML = `A ${'&oplus;'} B`;
            equal.innerText = '=';
            resultRight.innerText = symmetricalDifference(sets["setsA"], sets["setsB"]);
        },
        "Longitud" : () =>{
            resultLeft.innerHTML = `| A |`;
            equal.innerText = '=';
            resultRight.innerText = lengthWord(sets["setsA"][0]);
        },
        'Concatenación': ()=>{
            resultLeft.innerHTML = `AB`;
            equal.innerText = '=';
            resultRight.innerText = joinSets(sets["setsA"], sets["setsB"]);
        } ,
         'Potenciación' : ()=> {
            resultLeft.innerHTML = `A <sup>${sets["setsB"]}</sup>`
            equal.innerText = '=';
            labelA.innerText = 'Exponente';
            resultRight.innerHTML = boostAWord(sets["setsB"],sets["setsA"])
         },
         'Inversa': ()=> {
            resultLeft.innerHTML = `A <sup>R</sup>`
            equal.innerText = '=';
            resultRight.innerText = inverseOfWord(sets["setsA"][0])
         }

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
    labelA.innerText = 'Conjunto A'
    labelB.innerText = 'Conjunto B'
    InputSetsA.placeholder  = `Ingresa ${article} ${placeHolder.toLowerCase()} A (seperados por coma ",")`
    InputSetsB.placeholder  = `Ingresa ${article} ${placeHolder.toLowerCase()} B (seperados por coma ",")`

    if(operation === 'Complemento'){
        labelA.innerText = 'Conjunto U';
        InputSetsA.placeholder = 'Ingresa el conjunto U (seperados por coma ",")'
        return;
    }

    if((operation === 'Longitud' 
        || operation === 'Concatenación' 
        || operation === "Inversa") 
        && placeHolder === 'Cadena') {        
        InputSetsA.placeholder = `Ingresa ${article} ${placeHolder.toLowerCase()} A`;
        InputSetsB.placeholder  = `Ingresa ${article} ${placeHolder.toLowerCase()} B`;
        return;
    }

    if(operation === 'Potenciación') {
        InputSetsA.placeholder = `Ingresa ${article} ${placeHolder.toLowerCase()} A`;
        InputSetsB.placeholder  = `Ingresa el exponente`;
        labelB.innerText = 'Exponente';
        return;
    }

}


const validateShowElement = (operation) =>{
    operation === 'Longitud' ||  operation === 'Inversa' 
    ? canShowElement([labelB,InputSetsB ],'none') 
    :canShowElement([labelB,InputSetsB] ,'block');
    operation === 'Diferencia absoluta' ? canShowElement([btnChange],'block') : canShowElement([btnChange],'none');

}

const canShowElement = (element , display) =>{
    element.forEach((el)=>{
        el.style.display = display;
    })
}


const clearForm = () =>{
    InputSetsA.value = '';
    equal.innerText = '';
    resultLeft.innerText = '';
    resultRight.innerHTML = '';
    InputSetsB.value = '';
}

/*** Operations with alphabet  ***/

const belongingSets = (A, B) => {
    return [...new Set(B)].every((character) => findCharacterInAGroup(character, A)) ? '&isin;': '&notin;';
}

const joinSets = (A, B) => {
    return `${[...new Set(A.concat(B))].join('')}`
}

const intersectionSets = (A,B) => {
    return `{ ${[... new Set(A)].filter((character)=> findCharacterInAGroup(character, B))} }`
}

const complementSets = (univerSet, B) =>{  
    return `{ ${[... new Set(univerSet)].filter((character)=> !findCharacterInAGroup(character, B))} }` 
}

const absoluteDifference = (A,B) => {
    equal.innerText = '=';
    if(changeOrder) {
        resultLeft.innerHTML = `A ${'&#92;'} B`;
        return complementSets(A,B);
    }
    resultLeft.innerHTML = `B ${'&#92;'} A`;
    return complementSets(B,A);
}

const findCharacterInAGroup = (character, set) => new Set(set).has(character);

const symmetricalDifference = (A, B) =>{
    const characterSetaNotFoundInb = [...new Set(A)].filter((character)=> !findCharacterInAGroup(character, B))
    const characterSetbNotFoundIna = [...new Set(B)].filter((character)=> !findCharacterInAGroup(character, A))

    return joinSets(characterSetaNotFoundInb, characterSetbNotFoundIna)
}



/** Operations with words */

const lengthWord = (word) => {
    console.log(word)
    return word.length
};

const concatWords = (wordA ='', wordB ='') => wordA.concat(wordB);

const boostAWord = (boost, word) => {
    if(boost==0) return '&lambda;';
    let wordConcat = '';
    for (let index = 0; index < boost; index++) wordConcat += word
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


