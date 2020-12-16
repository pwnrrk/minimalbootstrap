window.onload = () => {
    initnavbar()
    initmodal()
    initpopup()
}

function initnavbar() {
    document.querySelectorAll('.navbar-toggler').forEach(e => {
        e.addEventListener('click', ev => open_navbar(e.dataset.target))
    })
}

function initmodal() {
    document.querySelectorAll('.btn,.close,.modal').forEach(e => {
        if (e.classList.contains('modal')) {
            e.addEventListener('click', ev => {
                if (ev.target == e) {
                    close_modal()
                }
            })
        }
        if (e.dataset.toggle == 'modal') {
            e.addEventListener('click', ev => open_modal(e.dataset.target))
        }
        if (e.dataset.dismiss == 'modal') {
            e.addEventListener('click', close_modal)
        }
    })
}

function open_modal(target) {
    document.querySelectorAll(target).forEach(modal => {
        modal.classList.add('showing')
        document.body.classList.add('modal-open')
        document.addEventListener('keyup', close_modal_esc)
    })
}

function close_modal_esc(ev) {
    if (ev.key == 'Escape') {
        close_modal()
    }
}

function close_modal() {
    document.querySelectorAll('.modal').forEach(modal => {
        if (modal.classList.contains('showing')) {
            modal.classList.add('goingout')
            document.removeEventListener('keyup', close_modal_esc)
            modal.addEventListener('animationend', () => {
                if (modal.classList.contains('goingout')) {
                    modal.classList.remove('goingout')
                    modal.classList.remove('showing')
                    document.body.classList.remove('modal-open')
                }
            })
        }
    })
}

function open_navbar(target) {
    document.querySelectorAll(target).forEach(e => {
        if (e.classList.contains('opened')) {
            e.classList.remove('opened')
        } else {
            e.classList.add('opened')
        }
    })
}

function initpopup() {
    document.querySelectorAll('.btn,a').forEach(e => {
        if (e.dataset.toggle == 'popup') {
            e.addEventListener('click', ev => open_popup(e, e.dataset.target))
        }
    })
}

function open_popup(source, target) {
    document.querySelectorAll(target).forEach(popup => {
        if(!popup.classList.contains('showing')){
            popup.classList.add('showing')
            popup.setAttribute('style', `left: ${source.offsetLeft = source.offsetWidth} ;top: ${source.offsetTop+source.offsetHeight+10}`)
            popup.addEventListener('animationend',addPopDismiss)   
        }     
    })
}

function addPopDismiss(){
    document.addEventListener('click', close_popup_trigger)
    document.querySelectorAll('.popup').forEach(popup=>{
        removePopupListener(popup)
    })
}

function removePopupListener(popup){
    popup.removeEventListener('animationend',addPopDismiss)
}

function close_popup_trigger(ev) {
    document.querySelectorAll('.popup').forEach(popup => {
        if (ev.target != popup) {
            close_popup()
        }
    })
}

function close_popup() {
    document.querySelectorAll('.popup').forEach(popup => {
        if(popup.classList.contains('showing')){
            popup.classList.add('goingout')
            document.removeEventListener('click', close_popup_trigger)
            popup.addEventListener('animationend', () => {
                if (popup.classList.contains('goingout')) {
                    popup.classList.remove('goingout')
                    popup.classList.remove('showing')
                }
            })
        }
    })
}