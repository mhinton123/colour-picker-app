let coloursArr = []

document.addEventListener("submit", function(e){
    
    // Stop refresh
    e.preventDefault()
    
    const selectedColour = document.getElementById('colour-picker').value.substring(1)
    const selectedMode = document.getElementById('mode-select').value
    
    const apiURL = `https://www.thecolorapi.com/scheme?hex=${selectedColour}&mode=${selectedMode}`
    
    // Get colour scheme
    fetch(apiURL)
    .then(res => res.json())
    .then(data => {

        coloursArr = data.colors
        renderPalleteHTML()
        
    })
})

document.addEventListener('click', function(event) {
    
    let clickedColour = ''
    if (event.target.classList.contains('colour-pane')) { 
        clickedColour = event.target.nextElementSibling.innerText
    }
    else if (event.target.classList.contains('colour-info-wr') ||
    event.target.classList.contains('colour-value')) {
        clickedColour = event.target.previousElementSibling.innerText
    }

    copyToClipboard(clickedColour)
    showPopupMessage()
});

    
function renderPalleteHTML () {

    let html = ``
    coloursArr.forEach(color => {
        html += `
        <div class="colour-wr">
            <div class="colour-pane" style="background-color: ${color.hex.value};" ></div>
            <div class="colour-info-wr">
                <p class="colour-value">${color.hex.value}</p>
            </div>
        </div>
        `

    });
    document.getElementById('pallete').innerHTML = html
}


function copyToClipboard(value) {
    const el = document.createElement('textarea');
    el.value = value;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);

    const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}

function showPopupMessage() {
    const popup = document.getElementById('popupMessage')
    popup.style.opacity = '1'

    setTimeout(() => {
        popup.style.opacity = '0'
    }, 2000); 

    setTimeout(() => {
        popup.style.display = 'none'
    }, 2300);
}


    