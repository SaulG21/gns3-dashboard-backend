//from https://stackoverflow.com/questions/11480769/how-can-i-check-if-a-json-is-empty-in-nodejs
export function isEmptyObject(obj: any) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

