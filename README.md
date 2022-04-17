# Whose Commit is It Anyways
![Whose Line is It Anyways](whose-line-is-it-anyways.gif "The inspiration behind the repo name...")

## Setup
0. Make sure you're running >=NodeJS v14
1. `npm i`: to install dependencies
2. `npm run start`: to start the local NodeJS server
    - this will transpile the .ts files and write out the .js files to `/dist`

Once the server is up and running, make GET requests like to get your desired results:
```
http://localhost:3001/v1/commit_counts?owner=facebook&repo=CacheLib
```

The endpoint supports Basic Auth, and if given it, will just pass it on down to GitHub (use your GitHub account name for the username and your personal access token for the password).

## Test
- `npm t`: runs both unit and integration tests
- `npm run test:unit`: runs just unit tests
- `npm run test:e2e`: runs just integration tests
