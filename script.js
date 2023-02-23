
const c1 = ['a', 'b', 'c', 'd'];
const c2 = ['a', 'e', 'f', 'g'];




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

const concatWords = (wordA, wordB) => wordA.concat(wordB);

const boostAWord = (boost, word) => {
    if(boost==0) return 'vacío';
    let wordConcat = '';
    for (let index = 0; index < boost; index++) wordConcat += word;
    return wordConcat;
}

const inverseOfWord = (word) => word.split("").reverse().join("");


/** Operations with language */

const concatLanguage = (langA, langB) =>{
    langA.unshift('');
    const concatAAndB = [];

    for (let i = 0; i < lengthWord(langA); i++) {
        for (let j = 0; j < lengthWord(langB); j++) {            
            concatAAndB.push(concatWords(langA[i], langB[j]));
        }        
    }

    return concatAAndB;

}


const boostALanguage = (boost,lang) => {

    for (let i = 0; i < lang.length; i++) {
        
    }
}


console.log(belongingSets(c1,c2));
console.log(joinSets(c1,c2))
console.log(intersectionSets(c1,c2))
console.log(complementSets(c1,c2))
console.log(symmetricalDifference(c1,c2))
console.log(lengthWord('gs'))
console.log(concatWords('abc','def'))
console.log(boostAWord(4, 'abc'))
console.log(inverseOfWord('hola'))
console.log(concatLanguage(['carro','moto'],['cicla','bus']))



