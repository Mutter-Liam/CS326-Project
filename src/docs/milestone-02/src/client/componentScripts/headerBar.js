export function renderHeaderBar(element) {
    element.innerHTML = "\
        <div id='headerIcon'>\
            <img src='./images/RendezvousIcon.png' width='60px' height='60px'></img>\
            <h2 style='margin-left: 10px; margin-top: 0; margin-bottom: 0;'>Rendezvous</h2>\
        </div>\
        <div id='settings-button-container'>\
            <button class='nav-button' id='settingsBtn'>Settings</button>\
        </div>\
        ";
}



