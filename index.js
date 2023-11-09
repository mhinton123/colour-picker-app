let coloursArr = []

renderPalleteHTML()

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
        document.getElementById('pallete').innerHTML = html
    });
}
    