# Link-Tracking-Assignment (Linky)
This was the assignment that I was assigned for the internship position at Requestly. The web app allows the user to create dynamic links on which
anyone can visit. On visiting the site the visitor's details such as ip address, country, device, browser, times of visiting and total no. of visits are stored.
## Tools and Technologies Used:
```
Front-End         : React.JS
Back-End          : Node.JS/Express.JS
Database          : MongoDB
Styled Components : Material-UI
Requests (React)  : Axios
Authentication    : Passport.JS
Cookies/Session   : Cookie-Parser/Express-Session
API for Traffic   : userstack.com
```
## To Run on Local Machine:
```
1 -> git clone https://github.com/Vrishabhsk/Link-Tracking-Assignment-Linky-.git
2 -> run the command npm install in the root directory
3 -> cd client && npm install
4 -> change proxy in package.json in client folder to http://localhost:(your server port)
5 -> open 2 terminal, on one run the command nodemon server.js and on another run npm start and voila
```
## IMP : For recording the data when the site is visited:
```
Have to allow insecure content in the site settings as the api being used is in http mode
so if the site does not allow insecure content the data of the user won't be stored
This is because the api that im using is userstack.com api as their free tier offers only http mode.
*** do this when the landing page has rendered!
```
## Live Site:
[http://link-tracking.herokuapp.com/](http://link-tracking.herokuapp.com/)
