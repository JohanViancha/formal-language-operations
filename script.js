
const c1 = [1,2,3,5,7,10];
const c2 = [2,3,1,5,6,7,3, 7];



const belongingSets = (seta, setb) => {
    return  [...new Set(setb)].every((caracter) => new Set(seta).has(caracter))
}

const joinSets = (seta, setb) => {
    return [...new Set(seta.concat(setb))]
}

const intersectionSets = (seta,setb) => {
    return  [... new Set(seta)].filter((caracter)=> new Set(setb).has(caracter))
}

const complementSets = (univerSet, setb) =>{
    return [... new Set(univerSet)].filter((caracter)=> !new Set(setb).has(caracter))
}

const concatSets = (seta, setb) => {
    return seta.concat(setb);
}

console.log(belongingSets(c1,c2));
console.log(joinSets(c1,c2))
console.log(intersectionSets(c1,c2))
console.log(complementSets(c1,c2))

// console.log(concatSets(c1,c2))


