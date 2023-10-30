export const setLoadingButton = () => 
{
    const btn = document.querySelector(".generate-btn")! as HTMLButtonElement
    
    btn.classList.add('loading')
    btn.disabled = true
}

export const removeLoadingFromButton = () => 
{
    const btn = document.querySelector(".generate-btn")! as HTMLButtonElement
    
    const btnText = btn.querySelector('span')!
    const btnIcon = btn.querySelector('img')!

    btnText.innerText = 'Generated..'
    btn.classList.remove('loading')
    btnIcon.style.display = 'none'

    btn.disabled = false
}

export const resetGenerateButton = () => 
{
    const btn = document.querySelector(".generate-btn")! as HTMLButtonElement
    btn.disabled = false
    const btnText = btn.querySelector('span')!
    const btnIcon = btn.querySelector('img')!

    btnText.innerText = 'Generate Table'
    btn.classList.remove('loading')
    btnIcon.style.display = 'block'
}