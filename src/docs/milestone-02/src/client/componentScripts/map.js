export function renderMap(element) {
    // Get a reference to the parent container
    const parentContainer = element.parentElement;

    // Get the width and height of the parent container
    const parentWidth = parentContainer.offsetWidth;
    const parentHeight = parentContainer.offsetHeight;

    const mapURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17275.10389291347!2d-72.5333217714684!3d42.38777369375425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e6d273e4f0f865%3A0xa0d6586089148e05!2sUniversity%20of%20Massachusetts%20Amherst!5e0!3m2!1sen!2sus!4v1713540379345!5m2!1sen!2sus";

    // Set the HTML content with dynamic width and height
    element.innerHTML = `<iframe src="${mapURL}" width=100% height=100% style="border:0;grid-column: span 3;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}