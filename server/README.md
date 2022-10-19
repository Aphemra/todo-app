# Express TODO Demo

## Configuration

To setup the demo, clone this repository and follow these steps:

1. Open a terminal and navigate to the locally-cloned repo `cd express-todo`.
2. Copy the `.env.example` file to a `.env` file.
3. Change the values in the `.env` file to suit your needs.
4. With a terminal opened in the same directory, run the following commands:
4a. `npm i`
4b. `npx prisma init`
4c. `npx prisma db push`

You can now spin up your app by running `npm run start`.

You can find the example Postman collection in the repository. Please import that into postman and configure the appropriate variables.

If you would like to visualize your `sqlite` database, please open a new terminal in the project directory and run `npx prisma studio`. It will open a browser window where you can explore, create and alter database values.