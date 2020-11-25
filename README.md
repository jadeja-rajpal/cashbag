# Cashbag Franchise Portal

```
INFO:   name: cashbag franchise
        version: 1.0.0
        depends on:  webpack, nodejs, babel and others. // Open package.json to view all the dependencies.

NODE:   Nodejs version 8 or greater.

REACT:  React version 16.8.6 or greater

# ABOUT

Cashbag offers an incredible built-in lifetime opportunity to create a future in the E-Commerce industry. It also provides easy online shopping experience.

## Installation

```
1. Clone the repository from the cashbag official bitbucket repository.
        Repository Name:- cash_bag_admin
        Clone command:- git clone https://AnshikaNegi@bitbucket.org/daffodilsoftware/cash_bag_admin.git

2. Checkout to the development branch.
        Command:- git checkout development

3. Take pull from the development branch to get the latest code.
        Command:- git pull origin development

4. Install all the dependencies.
        Command:- npm i
        (If any vulnerabilities found kindly run the following command:- npm audit fix)

5. Start the application.
        Command:- npm start

6. The application can now be accessed at http://localhost:8080.
```

## Test Cases

```
-> Run test cases using the following command:-
        npm run test:jest

-> Run test cases with updated snapshots using the following command:-
        npm run test:jest -- -u

-> Follow the given steps to get the code coverage:-
        1. Run command 'npx jest --coverage' in terminal.
        2. Navigate to coverage/Icov-report/
        3. Open the file index.html in browser to view the coverage report.

```

## Building 

```
# Build for development:
npm run build-development

# Build for staging:
npm run build-staging

# Build for production:
npm run build-production
```

Built bundles will be located in the `dist` folder
Note:- Install the dependencies correctly before running build command.

```