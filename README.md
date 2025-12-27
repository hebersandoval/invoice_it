# The Invoicing App

## Features

- **Invoice Tracking & Management**: Easily track customer invoices with full CRUD (Create, Read, Update, Delete) operations for both customers and invoices.
- **Payment Status Visualization**: View overall revenue statistics at a glance with interactive charts based on invoice payment statuses (e.g., paid, pending, overdue).
- **Many-to-Many Relationships**: Robust database design using MongoDB/Mongoose, allowing customers to have multiple invoices and invoices to link to customers seamlessly.
- **Secure Authentication**: User signup, login, and session management to protect dashboard access and ensure data privacy.
- **Intuitive Dashboard**: Quick access to key revenue insights, recent activity, and navigation for managing customers and invoices.

## Technologies Used

*   [Node.js](https://nodejs.org/)
*   [Express.js](expressjs.com)
*   [MongoDB](mongodb.com)
*   Other supporting libraries and packages

## Prerequisites

Make sure you have the following installed on your local machine:

*   Node.js (version 20.X.X or higher)
*   npm (Node Package Manager)

## Installation

Follow these steps to get your development environment running:

1.  **Clone the repository:**
    ```bash
    git clone github.com
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd your-repo-name
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create a `.env` file (if applicable):**
    Copy the example environment file and update the variables.
    ```bash
    cp .env.example .env
    ```

## Usage

To run the application:

```bash
npm start
```