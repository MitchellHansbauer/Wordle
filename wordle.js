export function checkWordPositions(userGuess,wordToBeGuessed) {
return userGuess.split('').map((letter, index)=> {
    if(letter === wordToBeGuessed[index]) {
        console.log(`Letter ${letter} is in the correct position`);
        return `correct`;
    } else if (wordToBeGuessed.includes(letter)) {
        console.log(`Letter ${letter} is not in the correct position`);
        return `misplaced`;
    }
    
    else {
        console.log(`Letter ${letter} does not exist in the word`);
        return `wrong`;
    }
})}