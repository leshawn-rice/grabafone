# Grabafone

Grabafone is a REST API designed for accessing cellular device data that has been scraped from publicly available websites. It provides a simple and efficient interface for querying information about cellular devices, manufacturers, and their specifications.

---

## Key Features

- **Comprehensive Data Access:** Retrieve detailed information on cellular devices and manufacturers.
- **RESTful Endpoints:** Interact with the API using standard HTTP methods.
- **Interactive Documentation:** A built-in Swagger UI makes it easy to explore available endpoints and test API calls.
- **Secure Access:** Supports API key authentication and user management to control access.

---

## API Overview

Grabafone exposes a collection of endpoints to help you interact with cellular device data. The API is structured to support common operations such as retrieving lists of devices, filtering based on specifications, and accessing manufacturer information.

### Endpoints

- **GET /devices**  
  Retrieve a list of cellular devices.  
  **Query Parameters:**  
  - `limit` (default: 100): Maximum number of devices returned.
  - `offset` (default: 0): Pagination offset.
  - `reversed` (default: false): Order the results in ascending or descending order.
  - `specifications`: An optional object to filter devices by specific key-value pairs in their specifications.

- **GET /manufacturers**  
  Fetch a list of device manufacturers.

- **GET /specifications**  
  Access detailed specifications for a particular device or a set of devices.

- **User & API Key Endpoints**  
  Endpoints for user registration, authentication, and API key management ensure secure access to the API.

---

## How It Works

1. **Data Aggregation:**  
   Grabafone scrapes cellular device data from various public websites, consolidating it into a centralized database.

2. **REST API Design:**  
   The API is built using REST principles, allowing you to use standard HTTP methods (GET, POST, etc.) to interact with device data.

3. **Swagger UI Integration:**  
   Explore the API and test endpoints interactively via the Swagger UI, which is accessible when the application is running.

---

## Getting Started

### Prerequisites

- **Node.js:** Version 12 or higher.
- **PostgreSQL:** Ensure PostgreSQL is installed and running.

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/grabafone.git
   cd grabafone
   ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Configure the Database:**
    - Ensure PostgreSQL is running.
    - Initialize the database using the provided setup script or your preferred database management tool.

4. **Set Up Environment Variables:**

    Create a `.env` file with your configuration settings (database credentials, API keys, etc.).

5. **Start the Application:**

    ```bash
    npm start
    ```
    The API server will typically run on http://localhost:3001.

6. **Access the Swagger UI**:

Navigate to http://localhost:3001/docs to view interactive API documentation and test endpoints.

---

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.
4. Follow the project's coding standards and include tests for new functionality.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For further questions or support, please reach out via leshawn.rice@yahoo.com.

---

Grabafone provides a robust, secure, and easy-to-use interface for accessing cellular device data, making it an ideal tool for developers and data enthusiasts looking to integrate this information into their applications. Enjoy exploring and using the API!