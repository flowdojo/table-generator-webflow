export const setErrorMessage = (msg : string) => 
{
    let id;
    clearTimeout(id)
    const node = document.querySelector(".error-msg")! as HTMLParagraphElement;
    node.classList.remove('hidden')
    node.innerText = msg;

    id = setTimeout(() => {
        node.innerText = ''
        node.classList.add('hidden')

    }, 3000)
}


export const setResponse = (responseText : string) => 
{
    const node = document.getElementById('output')! as HTMLPreElement

    node.innerText = responseText
}
