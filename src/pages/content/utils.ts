// export function onSizeChange(ele: HTMLElement) {
//   const observer = new MutationObserver((mutationsList, observer) => {
//     for (const mutation of mutationsList) {
//       if (
//         mutation.type === "attributes" &&
//         (mutation.attributeName === "style" || mutation.attributeName === "class")
//       ) {
//         console.log("The " + mutation.attributeName + " attribute was modified.")
//         // Do something in response to textarea size change
//       }
//     }
//   })

//   // Start observing the textarea with the configured parameters
//   observer.observe(ele, { attributes: true })
// }
