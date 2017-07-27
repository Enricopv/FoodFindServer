# ExpressReactBase
Express backend API with a React frontend boilerplate for my projects. Maybe it will be useful to you too :)

<h2><u>Table of Contents</u></h2>
<ul>
  <li><a href="#why">Why is this a thing?</a></li>
  <li><a href="#what">What is this?</a></li>
  <li><a href="#how">How do I use this?</a></li>
  <li><a href="#work">How does it work?</a></li>
</ul>

<div id="why">
  <h3>Why is this a thing?</h3>
  This is a project meant to have boilerplate code to:<br>
  <ul>
    <li>Allow for anyone to pick up a ready to use Express API with React Front End codebase and get moving on their project</li>
    <li>Have several examples for users new to Express and/or React to get them quickly going</li>
  </ul>
</div>

<div id="what">
  <h3>What is this?</h3>
  This app was built by using: 
  <ol>
    <li>Express-generator to first create an express app</li>
    <li>Creating a /client folder and running create-react-app</li>
    <li>I then modified server.js to demonstrate an API route while ready to serve a react frontend in production</li>
  </ol>

  I followed the below tutorial that is linked from the <a href="https://github.com/facebookincubator/create-react-app">create-react-app</a> github:<br>
  https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

</div>

<div id="how">
  <h3>Cool. How do I use this?</h3>
<ol>
  <li>
    <p>
    If you are completely new to everying, make sure to download node.js first at nodejs.org. This will give you both node and npm. Once installed, open up terminal or cmd.exe (for windows) and type:
    </p>
    <pre>
node --version
    </pre>
    <p>If installed properly you should see the version output back to you</p>
  </li>
  
  <li>
    <p>
      Next you want to download or clone this project. Place it anywhere and make sure to navigate to it in the terminal or command line. For example, if you downloaded the project to C:\Documents\GitHub\ExpressReactBase. Then you need to type:
    </p>
    <pre>
  C:
  cd Documents/GitHub/ExpressReactBase
    </pre>
  </li>
  
  <li>
  <p>In order to run this app you should use npm install in both the root and /client directories in order to download the express server and react app dependencies respectively.</p>
  <p>Root install</p>
  <pre>
  npm install
  </pre>
  <p>Navigate to client and install</p>
  <pre>
  cd client
  npm install
  </pre>
  </li>

  <li>
  <p>Once this done you want to go back to root and start the app</p>
  <pre>
  cd ..
  npm start
  </pre>
  </li>

  <li>
  <p>
  Viola! You should see the basic create-react-app webpage.
  If you enter in http://localhost:3000/api/getdata you should get json back.
  </p>
  </li>
</ol>

    
</div>

<div id="work">
  <h3>How does it work?</h3>

  <p>Honestly, this is best explained in the original tutorial under the section "The Rub":</p>
  https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/ <br>

  <p>In development, npm start will concurrently run two servers on two different ports. The express api server will run on 1337, while the react server will run on 3000. The package.json in /client lists localhost:1337 as its proxy, so you don't have to specify localhost:1337/api/getdata to get data in your localhost:3000 reat app, but just use /api/getdata in your code and it should work.</p>

  <p>In production, you will want your server to use npm run server. This will run the express server which will serve your react app from /client/build. This means you <i>must</i> <b>go into client and do npm run build</b></p>
  <pre>
    cd client
    npm run build
  </pre>
  <p>The create-react-app uses webpack to bundle/compile what often looks like a big hairy react app with many components down to a few javascript files. These optimized, production ready files are put into /client/build.</p>
</div>






