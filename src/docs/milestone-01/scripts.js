const imgs = document.getElementsByClassName("intro-img")
for (let img of imgs){
    const switchImg = () =>{
        switch(img.src){
            case "RetroBenFace.webp":
                img.src = "BenFace.jpg"
                break;
            case "RetroAdamFace.webp":
                img.src = "AdamFace.jpg"
                break;
            case "RetroLiamFace.webp":
                img.src = "LiamFace.jpeg"
            break;
            case "RetroSandroFace.webp":
                img.src = "SandroFace.jpg"
            break;
        }
    }
    img.addEventListener("click",switchImg)
}

