/**
 * @param {Function} 
 * @param {Object} 
 */
function bindThis(f,oTarget){
    return f.bind(oTarget)
}

function bindThis2(f,oTarget){
    return function(){
        return f.apply(oTarget,arguments)
    }
}