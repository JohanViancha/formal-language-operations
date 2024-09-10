let resultLeft = document.querySelector("#result-left");
let equal = document.querySelector("#equal");
let resultRight = document.querySelector("#result-right");
const InputSetsA = document.querySelector("#setsA");
const InputSetsB = document.querySelector("#setsB");
const labelA = document.querySelector("#name-setsA");
const labelB = document.querySelector("#name-setsB");
const btnChange = document.querySelector("#btn-change");
const home = document.querySelector(".home");
const form = document.querySelector(".form");
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
            form.style.display = 'flex'
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
        executeOperations(operations, {
            setsA:InputSetsA.value.split(',').map((str)=>str.trim()), 
            setsB:InputSetsB.value.split(',').map((str)=>str.trim())
        });
    })
   
    optionsAlphabet.addEventListener('click',  (element)=>{
        if(subOptionsAlphabet.classList.contains('alphabet-options')){
            subOptionsAlphabet.classList.remove('alphabet-options')
        }else{
            subOptionsAlphabet.classList.add('alphabet-options')
        }
        subOptionsWords.classList.remove('word-options')
        subOptionsLanguage.classList.remove('language-options')
    })

    optionsWords.addEventListener('click',  (element)=>{
        if(subOptionsWords.classList.contains('word-options')){
            subOptionsWords.classList.remove('word-options')

        }else{
            subOptionsWords.classList.add('word-options')
        }
        subOptionsAlphabet.classList.remove('alphabet-options')
        subOptionsLanguage.classList.remove('language-options')
       
    })

    optionsLanguage.addEventListener('click',  (element)=>{
        if(subOptionsLanguage.classList.contains('language-options')){
            subOptionsLanguage.classList.remove('language-options')

        }else{
            subOptionsLanguage.classList.add('language-options')
        }
        subOptionsAlphabet.classList.remove('alphabet-options')
        subOptionsWords.classList.remove('word-options')    })
}

const validateIputClear = () => {
    if(sets["setsA"].length === 0 && sets["setsB"].length === 0){
        resultRight.innerHTML = `&empty;`;
        return;
    }
}


const executeOperations = (operation, sets) =>{
    equal.innerText = '=';
    let options = {
        'Pertenencia' : ()=>{ 
            if(String(sets["setsA"]).length === 0 && String(sets["setsB"]).length === 0 ){
                equal.innerHTML = `&empty;`
                resultLeft.innerText = '';
                resultRight.innerText = '';
                return;
            }
            resultLeft.innerText = 'B';
            resultRight.innerText = 'A';
            equal.innerHTML = belongingSets(sets["setsA"], sets["setsB"]);
        },
        'Unión': ()=>  {
            resultLeft.innerHTML = `A ${'&cup;'} B`;
            if(String(sets["setsA"]).length === 0 && String(sets["setsB"]).length === 0 ){
                resultRight.innerHTML = `&empty;`
                return;
            }

            if(operation["sets"] === 'Alfabeto'){
                resultRight.innerText = `{ ${joinSets(sets["setsA"], sets["setsB"]) } } `;
                return;
            }
            let result = joinLanguage(sets["setsA"], sets["setsB"]);
            resultRight.innerHTML = `{ ${result} }`;
        },

        'Intersección': ()=> {
            resultLeft.innerHTML = `A ${'&cap;'} B`;

            if(String(sets["setsA"]).length === 0 && String(sets["setsB"]).length === 0 ){
                resultRight.innerHTML = `&empty;`
                return;
            }


            if(operation["sets"] === 'Alfabeto'){
                resultRight.innerHTML = intersectionSets(sets["setsA"], sets["setsB"]);
                return;
            }
            resultRight.innerHTML = intersectionLanguage(sets["setsA"], sets["setsB"]);
        },

        'Complemento': ()=> {
            resultLeft.innerText = `B’`;
            
            if(String(sets["setsA"]).length === 0 && String(sets["setsB"]).length === 0 ){
                resultRight.innerHTML = `&empty;`
                return;
            }

            resultRight.innerHTML = `${complementSets(sets["setsA"], sets["setsB"])}`;
        },

        'Diferencia absoluta': ()=> {
            resultRight.innerHTML = ` ${absoluteDifference(sets["setsA"], sets["setsB"])} `;
        },

        'Diferencia simétrica': ()=> {
            resultLeft.innerHTML = `A ${'&oplus;'} B`;
            resultRight.innerText = `{ ${symmetricalDifference(sets["setsA"], sets["setsB"])} }`;
        },

        "Longitud" : () =>{
            resultLeft.innerHTML = `| A |`;
            resultRight.innerText = lengthWord(sets["setsA"][0]);
        },

        'Concatenación': ()=>{
            if(operation["sets"] === 'Cadena'){
                resultLeft.innerHTML = `AB`;
                if(String(sets["setsA"]).length === 0 && String(sets["setsB"]).length === 0 ){
                    resultRight.innerHTML = `&empty;`
                    return;
                }
                resultRight.innerText = concatWords(sets["setsA"], sets["setsB"]).join().replace(',','');
                return;
            }

            resultLeft.innerHTML = `A &middot; B`;
            
            if(String(sets["setsA"]).length === 0 && String(sets["setsB"]).length === 0 ){
                resultRight.innerHTML = `&empty;`
                return;
            }
        
            resultRight.innerText = concatLanguage(sets["setsA"], sets["setsB"]);
        } ,

        'Potenciación' : ()=> {
            resultLeft.innerHTML = `A <sup>${sets["setsB"]}</sup>`
            if(operation["sets"] === "Cadena"){ 
                resultRight.innerHTML = boostAWord(sets["setsB"],sets["setsA"]);
                return;
            }
            resultRight.innerHTML = ` ${boostLanguage(sets["setsB"],sets["setsA"])} `;
         },

         'Inversa': ()=> {
            resultLeft.innerHTML = `A <sup>R</sup>`
            if(String(sets["setsA"]).length === 0 ){
                resultRight.innerHTML = '&empty;'
                return;
            }
            if(operation["sets"] === "Cadena"){  
                resultRight.innerText = `{ ${reverseOfWord(sets["setsA"][0])} }`;
                return;
            }
            resultRight.innerHTML = `{ ${reverseLanguage(deleteLambda(sets["setsA"],false))} }`;

         },

         "Resta" : () =>{
            resultLeft.innerText = 'A - B'
            resultRight.innerText = `{ ${subtractLanguage(sets["setsA"],sets["setsB"])} }`;
        },

        "Clausura de Kleene": () =>{
            resultLeft.innerHTML = `A <sup>*</sup>`
            const result = `{ ${kleeneClosure(5,sets["setsA"])} }`;
            resultRight.innerHTML = result;
        },

        "Clausura Positiva": () =>{
            resultLeft.innerHTML = `A <sup>+</sup>`
            const result = `{ ${positiveClosure(5,sets["setsA"])} }`;
            resultRight.innerHTML = result;
        }
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
    operation === 'Longitud' 
    ||  operation === 'Inversa' 
    || operation === 'Clausura de Kleene' 
    ||  operation === 'Clausura Positiva'
    ? canShowElement([labelB,InputSetsB ],'none') 
    : canShowElement([labelB,InputSetsB] ,'block');

    operation === 'Diferencia absoluta' 
    || operation === 'Resta'
    ? canShowElement([btnChange],'block') 
    : canShowElement([btnChange],'none');
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
    changeOrder = true;
}

/*** Operations with alphabet  ***/

const belongingSets = (A, B) => {
    return [...new Set(B)].every((character) => findCharacterInAGroup(character, A)) ? '&isin;': '&notin;';
}

const joinSets = (A, B) => {
    let result = [...new Set(A.concat(B))].join(',')
    if(result[0] === ','){
        return result.slice(1,result.length)
    }
    if(result[result.length - 1] === ','){
        return result.slice(0,result.length - 1)
    }
    return result
}

const intersectionSets = (A,B) => {
    const result = [... new Set(A)].filter((character)=> findCharacterInAGroup(character, B));
    return result.length===0 ? '&empty;': `{ ${result} }`;
}

const complementSets = (univerSet, B) =>{  
    const result = [... new Set(univerSet)].filter((character)=> !findCharacterInAGroup(character, B)) 
    if(String(result).length === 0){
        return '&empty;'
    }
    return `{ ${result} }`
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
    return word.length;
};

const concatWords = (wordA ='', wordB ='') => {
    if(String(wordA).length === 0){
        return wordB
        
    }
    if(String(wordB).length === 0){
        return wordA
    }

    console.log('no entró')
    return wordA.concat(wordB);
}

const boostAWord = (boost, word) => {
    if(String(word).length === 0) return '&empty;'
    if(boost==0) return 'λ';
    let wordConcat = '';
    for (let index = 0; index < boost; index++) wordConcat += word
    return wordConcat;
}

const reverseOfWord = (word) => word.split("").reverse().join("");

/** Operations with language */

const concatLanguage = (langA, langB) =>{
    const concatAAndB = [];
    const hasLambdaA = searchLambda(langA)
    const hasLambdaB = searchLambda(langB)
    langA = deleteLambda(langA,false)
    langB = deleteLambda(langB,false)
    
    if(hasLambdaA || hasLambdaB){
        if(hasLambdaA){
            langA.unshift('');
        }
        else{
            langB.unshift('')
        }
    }
    
    for (let i = 0; i < lengthWord(langB); i++) {
        for (let j = 0; j < lengthWord(langA); j++) {    
            concatAAndB.push(concatWords(langA[j],langB[i]));
        }        
    }
    return concatAAndB;
}


const boostLanguage = (boost,lenguaje) => {
    if(boost==0) return 'λ'
    let result = deleteLambda(lenguaje,false);
    let lengArray = result;

    for (let i = 1; i < boost; i++) {
        result = result.reduce((acumulador, elemento) => {
      return acumulador.concat(lengArray.map(subElemento => elemento + subElemento));
    }, []);
  }
  if(searchLambda(lenguaje)){
    result.unshift('λ')
  }
  return result;
}

const reverseLanguage = (lang) => {
    return lang.map((character)=> reverseOfWord(character))
}

const joinLanguage = (langa, langb) => {
    const resultJoin = joinSets(langa,langb).split(",")
    return deleteLambda(resultJoin,true);;
}

const intersectionLanguage = (langa, langb) => {
    return intersectionSets(langa, langb)
}

const subtractLanguage =  (langa, langb)=> {
    if(changeOrder) {
        resultLeft.innerHTML = `A - B`;
        return complementSets(langa, langb)
    }
    resultLeft.innerHTML = `B - A`;
    return complementSets(langb, langa);
}

const kleeneClosure = (boost,langa) =>{
    let result = [];
    for (let index = 0; index < boost; index++) {
        result = joinLanguage(result,boostLanguage(index,langa));
    }
    result.push('...');
    return result;
}

const positiveClosure = (boost,langa) => {
    let result = kleeneClosure(boost,langa);
    if(!searchLambda(langa)){
        console.log(deleteLambda(result))
        return deleteLambda(result)
    }
    return result;
}

const deleteLambda = (chain, flag) =>{
    if(searchLambda(chain)){
        let result = chain.filter((element)=> element!=='λ')
        console.log(result)
        flag ? result.unshift('λ'): '';
        return result;
    }
    return chain;
}

const searchLambda = (chain) =>{
    return chain.indexOf('λ') !== -1 ? true : false;
}