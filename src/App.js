import { useState } from 'react';

// To select all "groups" of same characters eg. 1112211 = [111][22][11]
const regex = /(.)\1*/gm

/* 
	Use length of string for first number
	Use character for second number
*/
const transformSegmentToPair = (segment) => {
	const length = segment.length;
  const character = segment[0];
	return `${length}${character}`
}

const App = () => {
	// List of sequenses, initialised with "1"
  const [sequenses, setSequenses] = useState(["1"]);
  
  const updateSequense = () => {
  	// Select the last of the sequenses
    const lastSequense = sequenses[sequenses.length - 1];
    // Split into groups of same type [111][22][11]
    const groups = lastSequense.match(regex);
    // Go trough all the groups and transform to number pair. [111][22][11] => [31][22][21]
    const numberPairs = groups.map(transformSegmentToPair);
		// Join all pairs with no separator [31][22][21] => 312221
    const newSequense = numberPairs.join("")
    // add new sequense to the others
    setSequenses([...sequenses, newSequense]);
  }
  
  return (
      <div id="app">
        <h2>Sequenses:</h2>
       <button onClick={updateSequense}>
          More, lots more!
        </button>
        <ol>
        {sequenses.map(item => (
          <li key={item} style={{wordWrap: "break-word"}}>
            <label>
              <span className={item.done ? "done" : ""}>{item}</span>
            </label>
          </li>
        ))}
        </ol>
       
      </div>
    );
}

export default App;