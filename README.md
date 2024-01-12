## Mailer

This repository contains an Express server set up to send emails using Nodemailer. The server listens for POST requests to `/api/v1/send-mail` endpoint, processes the request, and sends an email using the provided details.

## API Reference

#### SEND MAIL : POST METHOD

```http
  POST /api/v1/send-mail
```

#### BODY Parameters:

| Parameter    | Type     | Description                                                                       |
| :----------- | :------- | :-------------------------------------------------------------------------------- |
| Sender Name  | `string` | **Required**                                                                      |
| Sender Email | `string` | **Required**                                                                      |
| Emai Subject | `string` | **Required**                                                                      |
| Message      | `string` | **Required**                                                                      |
| Website      | `string` | **Optional**. If you are using it for sending mail from website form then use it. |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

-   `LOGIN_EMAIL`: @example : abc@example.com
-   `LOGIN_PASSWORD`: it will be generated from [Google Account App Password](https://myaccount.google.com/apppasswords).
-   `RECEIVER_EMAIL`: The email address on which you want to receive the mail.
-   `WHITELIST_CORS`: Whitelist all the cross orgin responses using this pattern `website1, website2, website3` etc.. (note: here comma and a space is required)

## Run Locally

1. Clone the project

    ```bash
    git clone https://github.com/alpha-alexxx/mailer
    ```

2. Go to the project directory

    ```bash
    cd mailer
    ```

3. Install dependencies

    ```bash
    npm install
    ```

4. Start the server

    ```bash
    npm run dev
    ```

_Note: Setup the environment variables first and then start the server._

## Deployment

There is some free plateform is available to deploy and test this project, you can use them:

1. [Render](https://dashboard.render.com/)
2. [Cylic.sh](https://www.cyclic.sh/)
3. [Koyeb](https://app.koyeb.com/)

Read their Deployment Docs and deploy this project by forking it.

## Authors

-   [alpha-alexxx](https://www.github.com/alpha-alexxx)
