/**
 * @param {String} 
 * @param {sKey}
 * 
 */
function getUrlParam(sUrl,sKey){
    const url = new URL(sUrl)
    const urlSearchParams = new URLSearchParams(url.search)
    if(sKey){
        return urlSearchParams.getAll(sKey) || ''
    }else {
        return Array.from(urlSearchParams.keys())
    }
    // console.log(urlSearchParams.keys())
}