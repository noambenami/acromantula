// console.log('dx:', chrome);
//
// const cacheAcronyms = () => {
//   return fetch('https://confluence.team.affirm.com/x/wIuHCQ')
//     .then(r => r.text())
//     .then(text => {
//       const domparser = new DOMParser();
//       const doc = domparser.parseFromString(text, 'text/html');
//       // Every acronym gets a row in the table:
//       const acronymRows = doc.querySelectorAll('table.confluenceTable tr');
//       console.log(acronymRows.length);
//       const acronymMap = {};
//       acronymRows.forEach(tr => {
//         // 3 Cols: acronym, plain english of acronym, optional full definition
//         const tds = tr.querySelectorAll('td');
//         const [acronym, plainEnglish, definition] = Array.from(tds).map(td => td.textContent);
//         if (acronym) {
//           acronymMap[acronym] = {
//             plainEnglish,
//             definition
//           }
//         }
//       });
//
//       // Save the results and resolve the promise when results are in storage
//       console.log(acronymMap);
//       return new Promise((resolve) => {
//         chrome.storage.local.set({acronyms: acronymMap}, () => resolve(acronymMap));
//       });
//     });
// }
//
// const getAcronyms = () => {
//   return new Promise((resolve) => {
//     chrome.storage.local.get(['acronyms'], (result) => {
//       const acronyms = result.key;
//       if (acronyms) {
//         resolve(acronyms);
//       }
//       cacheAcronyms().then(resolve);
//     });
//   })
// }
//
// getAcronyms().then(console.log);