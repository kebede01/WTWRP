# Initialize backend
-Inside WTWRP mkdir /backend
- npm init
- Create .gitignore file
- Create .editorconfig file
- Create npm install express@^5.2.1
- npm i eslint@8 eslint-config-airbnb-base@15 eslint-plugin-import@2 --save-dev
- Create .eslintrc.js file

- Integrate prettier
npm install eslint-config-prettier@8 prettier@2 --save-dev
- Add a lint command to the scripts section in your project's package.json, like this:
```
"scripts": {
  // other scripts
  "lint": "npx eslint ." 
}
```
- npm run lint -- --fix
- npm install nodemon --save-dev
- npm run dev
## Create folders for modules:
- "routes" for storing files responsible for request routing
- "controllers" for storing files with functions that define routes
- "models" for storing files with described schemas and models
- "utils" for storing supportive data
## Create a database
-npm install mongoose@^9.3.3
-In app.js, connect to the MongoDB server: mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');