
export function getProp(object,keys,defaultVal){
    keys = Array.isArray( keys )? keys : keys.split('.');
    object = object[keys[0]];
    if( object && keys.length>1 ){
        return getProp( object, keys.slice(1) );
    }
    return object === undefined? defaultVal : object;
}

export function cutString(text, len){
    let limit = len || 50;
    if(text && typeof(text) === "string")
        return text.length < limit ? text : `${text.substr(0,limit - 1)}...`;
    return text;
}

export function timeConvert(n) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h:${rminutes}m`;
}

const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
        const context = this;
        const args = arguments; 
        clearTimeout(debounceTimer); 
        debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}

export {debounce};