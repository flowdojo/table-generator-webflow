import { removeLoadingFromButton, resetGenerateButton, setLoadingButton } from "./helpers/buttons";
import { setErrorMessage, setResponse } from "./helpers/setters";
import { hide, show } from "./helpers/showAndHide";
import submitSheet from "./helpers/submitSheet";
import "./style.css";


const stylesText = `
<style>
  .flowdojo-custom-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .flowdojo-custom-table th, .flowdojo-custom-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .flowdojo-custom-table th {
    background-color: #f2f2f2;
    color : #464ab6 !important;
  }
  .flowdojo-custom-table tr td {
    color : #464ab6 !important;
  }
  .flowdojo-custom-table:not(:has(thead)) tr:nth-child(odd) {
    background-color: #f2f2f2 !important;
    transition : background-color 0.3s ease;
  }

  .flowdojo-custom-table:has(thead) tr:nth-child(odd) {
    background-color: transparent !important;
    transition : background-color 0.3s ease;
  }

  .flowdojo-custom-table:has(thead) tr:nth-child(even) {
    background-color: #f2f2f2 !important;
    transition : background-color 0.3s ease;
  }
  
  .flowdojo-custom-table:has(thead) tr:hover,
  .flowdojo-custom-table:not(:has(thead)) tr:hover
  {
    background-color: #ddd !important;
  }
</style>
`;


const addStylesToNode = () => {
  const stylesWrapper = document.querySelector(".styles-wrapper")!;

  const codeBlock = document.createElement('pre');
  codeBlock.innerText = stylesText;
  stylesWrapper.appendChild(codeBlock)

}

const copyStylesClickListener = () => 
{
  let timeoutId : any;
  clearInterval(timeoutId)
  const copyStylesBtn = document.getElementById("copy-styles")! as HTMLButtonElement;
  const copyStylesBtnText = copyStylesBtn.querySelector('span')! as HTMLSpanElement;

  const copyStyles = async () =>
  {
    copyStylesBtn.disabled = true

    const stylesNode = document.querySelector(".styles-wrapper")! as HTMLPreElement;
    if (stylesNode.innerText) {

      const textarea = document.createElement('textarea');
        textarea.value = stylesText;

        // Append the textarea to the body (required for copy command to work)
        document.body.appendChild(textarea);

        // Select the text in the textarea
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices

        // Execute the copy command
        document.execCommand('copy');

        // Remove the textarea from the DOM
        document.body.removeChild(textarea);

        copyStylesBtnText.innerText = 'Copied..'
    
        timeoutId = setTimeout(() => {
          copyStylesBtnText.innerText = 'Copy Styles'
          copyStylesBtn.disabled = false
        },5000)
    }
  }

  copyStylesBtn?.addEventListener('click', copyStyles)
}



const handleSheetSubmission = () : void => {

  const form = document.getElementById("user-sheet")!;

  let id : any;

  const handleSubmit = async (e : SubmitEvent) => {

    clearInterval(id)
    e.preventDefault()

    hide(document.getElementById("output-wrapper")!)
    const sheetNode = document.querySelector('#user-sheet textarea') as HTMLInputElement;
    const sheetData : string = sheetNode.value;

    setLoadingButton()

    if (!sheetData) {
      alert("Please Enter Sheet Data")
      resetGenerateButton()
      return
    }
    const { success, message, responseText } = await submitSheet({ sheetData })
    
    if (!success) 
    {
      if (message === "No Input") {
        alert("Please Enter Sheet Data")
      } else {
        message && setErrorMessage(message)
      }

      resetGenerateButton()
    } else {

      removeLoadingFromButton()
      if (responseText) 
      {
        setResponse(responseText)
        show(document.getElementById('output-wrapper')!)
        /** Scroll down */
        window.scrollBy({
          top : 400,
          behavior : "smooth"
        })
      }

      id = setTimeout(() => {
        resetGenerateButton()
      }, 5000)
    }

  }

  form?.addEventListener('submit', handleSubmit)
}


const copyTableButtonListener = () => {
  const copyTableBtn = document.querySelector("button.copy-table") as HTMLButtonElement;

  const copyText = async () => {

    const outputNode = document.getElementById('output')!

    if (outputNode.innerText !== '') {

      /**  Disable the copy button temporarily */
      
      await navigator.clipboard.writeText(outputNode.innerText)

      const copyTableBtnText = copyTableBtn.querySelector('span')!

      copyTableBtnText.innerText = 'Copied!'
    }
    
  }  

  copyTableBtn.addEventListener('click', copyText)

}

addStylesToNode()
copyStylesClickListener()
handleSheetSubmission()
copyTableButtonListener()

