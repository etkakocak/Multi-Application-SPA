# A3 SPA

**Website Image:**
![website image](/src/public/images/website-image.png)

### Description
desc

### Instructions to download and start the game:
1. Clone the repo to any location on your computer with the command below (or with SSH if you have the access):  
    ```
    git clone https://gitlab.lnu.se/1dv528/student/ek223zf/a3-spa
    ```    

2. From the same terminal, enter the repo with the command ``cd a3-spa`` and then type the command below:  
    ```
    npx http-server dist
    ```
* *The web page has already been built to dist, but if you wish to make any updates in the code, you need to rebuild it before running with the command below:*
    ```
    npm run build
    ```

3. Then, when you click on one of the links displayed in the terminal, it will open the website in your browser.  

### Linters
* Run the linters by the command ``npm run lint`` to verify that the codes contain no errors.  

I already ran the command and fixed all errors and warnings. But if you make some updates, run the command to see if any errors or warnings come up.