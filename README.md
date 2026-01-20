# Gemini FAQ Discord Bot

A powerful, intermediate-level Discord bot that uses the Google Gemini API to answer questions based on a provided FAQ document. This bot features conversation history, slash commands, and is fully containerized with Docker.

## Features

- **Intelligent FAQ Answering:** Uses the Gemini API to understand and answer questions based on a local `FAQ.md` file.
- **Conversational Context:** Remembers the history of your conversation, allowing for natural follow-up questions.
- **Slash Commands:** Modern, easy-to-use slash commands for all interactions (`/faq`, `/ping`, `/clear`).
- **Rich Embed Responses:** Formats bot responses in visually appealing embeds for better readability.
- **TypeScript:** Built with TypeScript for robust, type-safe, and maintainable code.
- **Dockerized:** Fully containerized with a multi-stage `Dockerfile` for easy and consistent deployment.
- **Scalable Command Handler:** A dynamic command handler that automatically loads and registers new commands.

## Tech Stack

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Discord.js](https://discord.js.org/)
- [Google Gemini API](https://ai.google.dev/)
- [Docker](https://www.docker.com/)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or higher)
- [Docker](https://www.docker.com/get-started) (optional, for containerized deployment)

## Installation and Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Ajith-ajay/gemini-discord-faq-bot.git
    cd gemini-discord-faq-bot
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up your environment variables:**
    -   Rename the `.env.example` file to `.env`.
    -   Open the `.env` file and fill in the required values:
        -   `DISCORD_BOT_TOKEN`: Your Discord bot token.
        -   `DISCORD_CLIENT_ID`: Your Discord application's client ID.
        -   `GEMINI_API_KEY`: Your Google Gemini API key.

4.  **Customize the FAQ:**
    -   Open the `FAQ.md` file and add your own frequently asked questions and answers.

## Usage

1.  **Deploy Slash Commands:**
    Before running the bot for the first time, you need to register the slash commands with Discord.
    ```sh
    npm run deploy
    ```
    *(You only need to run this command once, or whenever you add or modify a command.)*

2.  **Run the bot in development mode:**
    ```sh
    npm run dev
    ```
    This will start the bot with `nodemon`, which automatically restarts the bot when you save a file.

### Available Commands

-   `/faq [question]`: Ask a question to the bot.
-   `/ping`: Check the bot's latency.
-   `/clear`: Clear your conversation history with the bot.

## Docker Deployment

This is the recommended way to run the bot in a production environment.

1.  **Build the Docker image:**
    ```sh
    docker build -t gemini-discord-bot .
    ```

2.  **Run the Docker container:**
    This command securely passes your `.env` file to the container and runs it in the background.
    ```sh
    docker run --env-file ./.env -d --name my-gemini-bot gemini-discord-bot
    ```

### Managing the Docker Container

-   **View logs:**
    ```sh
    docker logs my-gemini-bot
    ```
-   **Stop the container:**
    ```sh
    docker stop my-gemini-bot
    ```
-   **Start the container:**
    ```sh
    docker start my-gemini-bot
    ```
