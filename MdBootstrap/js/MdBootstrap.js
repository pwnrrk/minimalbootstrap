window.onload = ()=>{
    initnavbar()   
}

function initnavbar(){
    document.querySelectorAll('.navbar-toggler').forEach(e => {
        e.addEventListener('click',()=>{
            open_navbar(e.dataset.target)
        })
    })
}

function open_navbar(target){
    document.querySelectorAll(target).forEach(e =>{
        if(e.classList.contains('opened')){
            e.classList.remove('opened')
        }else{
            e.classList.add('opened')
        }
    })
}