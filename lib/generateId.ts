const string = 'abcdefghijklmnopqrstuvwxyz'; 
let id = '';

export const generateId =  () => {
    for (let i = 0; i < string.length; i++) {
        const m = Math.floor(Math.random()*string.length);
        id += string[m];
    }
    
    const generatedId = id.slice(0,8);
    id = '';
    return generatedId;
}