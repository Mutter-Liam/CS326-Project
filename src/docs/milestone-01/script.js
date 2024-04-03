const imgs = document.getElementsByClassName("intro-img")

for (let img of imgs){
    let retro = true
    const switchImg = () =>{
        let id = img.id
        if (id === "liam"){
            img.src = (retro) ? "images/LiamFace.jpeg" : "images/RetroLiamFace.png"
        }
        else if (id === "ben"){
            img.src = (retro) ? "images/BenFace.jpg" : "images/RetroBenFace.webp"
        }
        else if (id === "adam"){
            img.src = (retro) ? "images/AdamFace.jpeg" : "images/RetroAdamFace.webp"
        }
        else if (id === "sandro"){
            img.src = (retro) ? "images/SandroFace.png" : "images/RetroSandroFace.png"
        }
        retro = !retro
    }
    img.addEventListener("click",switchImg)
}

