The project is structured to render 3 panels, where each panel is representative of a different screen.

- The left panel is used for filtering events.
- The middle panel is used to host the events, boards, and map to which will eventually display events and their associated time, duration, host, etc (once we have a backend and can store it)
- The right panel is used to ping out events and be a display for events in greater detail, containing the information above

To navigate the app, use the 3 buttons in the upper portion of the screen

There's also a settings page which will contain the user's information (once we have a backend)

Each portion of the screen is rendered using its own Renderer.js file

CSS is handled within the styles.css file

Script.js is the main script associated with the page that makes use of all the other scripts to trigger event handlers to call the various js files in order to render content to the screen.