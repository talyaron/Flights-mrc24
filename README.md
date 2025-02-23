# Flights-mrc24

# Environment Variables

To run the application, you need to configure the following environment variables in a `.env` file at the root of your project:


### Explanation of Variables:

- **MYSQL_PASSWORD**: The password for the MySQL user.
- **SECRET**: A secret key used for signing JWT tokens. It should be a strong, secure value.
- **COOKIE_NAME**: The name of the cookie to store the JWT token.

Make sure to keep this file secure and **do not** commit it to version control (e.g., Git) by adding it to your `.gitignore` file.
