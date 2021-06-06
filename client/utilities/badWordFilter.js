import Filter from 'bad-words';


const filter = new Filter();
var newBadWords = ['shit', 'crap', 'poop'];
filter.addWords(...newBadWords);
export default filter;











/*
Usage
var Filter = require('bad-words'),
    filter = new Filter();
 
console.log(filter.clean("Don't be an ash0le")); //Don't be an ******
Placeholder Overrides
var Filter = require('bad-words');
var customFilter = new Filter({ placeHolder: 'x'});
 
customFilter.clean("Don't be an ash0le"); //Don't be an xxxxxx
Regex Overrides
var filter = new Filter({ regex: /\*|\.|$/gi });
 
var filter = new Filter({ replaceRegex:  /[A-Za-z0-9가-힣_]/g }); 
//multilingual support for word filtering
Add words to the blacklist
var filter = new Filter(); 
 
filter.addWords('some', 'bad', 'word');
 
filter.clean("some bad word!") //**** *** ****!
 
//or use an array using the spread operator
 
var newBadWords = ['some', 'bad', 'word'];
 
filter.addWords(...newBadWords);
 
filter.clean("some bad word!") //**** *** ****!
 
//or
 
var filter = new Filter({ list: ['some', 'bad', 'word'] }); 
 
filter.clean("some bad word!") //**** *** ****!
Instantiate with an empty list
var filter = new Filter({ emptyList: true }); 
filter.clean('hell this wont clean anything'); //hell this wont clean anything
Remove words from the blacklist
let filter = new Filter(); 
 
filter.removeWords('hells', 'sadist');
 
filter.clean("some hells word!"); //some hells word!
 
//or use an array using the spread operator
 
let removeWords = ['hells', 'sadist'];
 
filter.removeWords(...removeWords);
 
filter.clean("some sadist hells word!"); //some sadist hells word!
API
constructor
Filter constructor.

Parameters

options object Filter instance options (optional, default {})
options.emptyList boolean Instantiate filter with no blacklist
options.list array Instantiate filter with custom list
options.placeHolder string Character used to replace profane words.
options.regex string Regular expression used to sanitize words before comparing them to blacklist.
options.replaceRegex string Regular expression used to replace profane words with placeHolder.
isProfane
Determine if a string contains profane language.

Parameters

string string String to evaluate for profanity.
replaceWord
Replace a word with placeHolder characters;

Parameters

string string String to replace.
clean
Evaluate a string for profanity and return an edited version.

Parameters

string string Sentence to filter.
addWords
Add word(s) to blacklist filter / remove words from whitelist filter

Parameters

word ...string Word(s) to add to blacklist
removeWords
Add words to whitelist filter

Parameters

word ...string Word(s) to add to whitelist.
Testing
npm test
*/