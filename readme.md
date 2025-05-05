**PART A**
1. Clone Signify: https://github.com/WebOfTrust/signify-ts.git
2. Install docker if you don't already have it installed on your machine.
3. Open the terminal, and change directory into the cloned project folder. Then run `docker-compose up` This starts the three servers. witness, vlei, and agent.
![docker](./docs/Signify%20DockerImages.JPG)

**PART B**

4. Clone https://github.com/landano/signify-native-wrapper switch to signify-browser-wrapper branch `git checkout signify-browser-wrapper`
5. Run `npm install`
6. Run `npm run build`
7. This create files in `/dist/` folder. 
![dist](./docs/dist%20folder%20contents.JPG)
8. Copy file `/dist/signify-browser.js` and paste it into any mendix project module eg: `javascriptsource\signifyts\src`
![Logo](./docs/Mendix%20Signify%20folder.JPG)
9. Create a [mendix javascript action]() and import the library.
![Logo](./docs/Javascript%20example%20in%20mendix2.JPG)
![Logo](./docs/Javascript%20example%20in%20mendix3.JPG)
10. Add Button on the test webpage, connect it with the javascript action.
![button](./docs/Mendix%20Button%20Signify%20Javaaction.JPG)
11. Run the application and Click the button. The console shows us the successful verification status "true" as per our example code. 

![browsertest](./docs/Mendix%20Signify%20Test%20in%20Browser.JPG)

> **Note:**
> The current signify example code executed in the javascript action is adopted from the article [KERI Tutorial: Sign and Verify with Signify & Keria](https://medium.com/finema/keri-tutorial-sign-and-verify-with-signify-keria-833dabfd356b) and is a combination of multi independent activities.
> - Connecting Signify clients to the KERIA server
> - Creating and resolving autonomic identifiers
> - Sender signing a message
> - Recipient verifying the sender's signature


