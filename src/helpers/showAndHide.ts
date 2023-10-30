export const show = (elem : HTMLElement) =>
{
    elem.classList.remove('hidden')
}

export const hide = (elem : HTMLElement) =>
{
    elem.classList.add('hidden')
}