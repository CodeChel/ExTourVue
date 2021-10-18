
map.onload = () => {
    const map = document.getElementById('map')
    const svgDoc = map.contentDocument

    const town = svgDoc.getElementById("old-town")
    const kazimierz = svgDoc.getElementById("kazimierz")
    const ghetto = svgDoc.getElementById("ghetto")
    addListenerClick ( [town, kazimierz, ghetto], 'district-selected')
 }
 const addListenerClick = ( arr, className ) => {
     if ( !Array.isArray(arr) ){
         arr = [arr]
     }
     arr.forEach( i => i.onclick = () => {
         document.getElementById(i.id + '-checkbox').click()
         // i.classList.toggle(className)
     } )
 }