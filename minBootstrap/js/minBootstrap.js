window.onload = ()=>{
    initnavbar()   
    initmodal()
}

function initnavbar(){
    document.querySelectorAll('.navbar-toggler').forEach(e => {
        e.addEventListener('click',ev => open_navbar(e.dataset.target))
    })
}

function initmodal(){
    document.querySelectorAll('.btn,.close,.modal').forEach(e => {
        if (e.classList.contains('modal')){
            e.addEventListener('click',ev => {
                if(ev.target == e){
                    close_modal()
                }
            })
        }
        if (e.dataset.toggle == 'modal'){
            e.addEventListener('click', ev => open_modal(e.dataset.target))
        }
        if (e.dataset.dismiss == 'modal'){
            e.addEventListener('click',close_modal)
        }
    })
}

function open_modal(target){
    document.querySelectorAll(target).forEach(modal=>{
        modal.classList.add('showing')
        document.body.classList.add('modal-open')
        document.addEventListener('keyup',close_modal_esc)
    })
}

function close_modal_esc(ev){
    if (ev.key == 'Escape'){
        close_modal()
    }
}

function close_modal(){
    document.querySelectorAll('.modal').forEach(modal => {
        if (modal.classList.contains('showing')){
            modal.classList.add('goingout')
            document.removeEventListener('keyup',close_modal_esc)
            modal.addEventListener('animationend',()=>{
                if(modal.classList.contains('goingout')){
                    modal.classList.remove('goingout')
                    modal.classList.remove('showing')
                    document.body.classList.remove('modal-open')
                }
            })
        }
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