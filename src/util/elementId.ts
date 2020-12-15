export class ElementId {
    public static generate(sourceElement: string) {
        let result: string = sourceElement; // Begin with source element (i.e. 'Row')
        result += Date.now(); // Add the time since epoch in miliseconds
        result += '-' + (1000 + Math.floor(Math.random() * 999)); // Add a random number between 1000 and 1999
        return result;
    }
}
