import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class BackendAPI {
  /**
   * Generic static method to send a request to the backend API
   *
   * Accepts an endpoint, token, data, and a method and sends a request to the API
   * using the given params. If an error occurs, puts any errors into an arry and throws the arry as an error
   */

  static async request(endpoint, token = undefined, data = {}, method = 'get') {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message;
      let status;
      let errorToThrow;
      if (err.message === 'Network Error') {
        message = err.message;
        status = 500;
        errorToThrow = [{ message, status }];
      } else {
        message = err.response.data.error.message;
        status = err.response.data.error.status;
        errorToThrow = Array.isArray(message)
          ? message.map((msg) => {
              return { message: msg, status };
            })
          : [{ message, status }];
      }
      throw errorToThrow;
    }
  }

  // Individual API routes

  // User Routes

  /**
   * Gets user data from the API given an email & password (loginData)
   */

  static async login(loginData) {
    let res = await this.request('auth/login', undefined, loginData, 'post');
    return { token: res.token, user: res.user };
  }

  /**
   * Gets user data from the API given an email & password (registerData)
   */

  static async register(registerData) {
    let res = await this.request(
      'auth/register',
      undefined,
      registerData,
      'post'
    );
    return { token: res.token, user: res.user };
  }

  /**
   * Gets new user data from the API given a token, username, and new email address
   */

  static async updateEmail(token, username, email) {
    let res = await this.request(
      `users/${username}/change-email`,
      token,
      { email },
      'patch'
    );
    return { token: res.token, user: res.user };
  }

  /**
   * Gets new user data from the API given a token, username, and new password
   */

  static async updatePassword(token, username, oldPassword, newPassword) {
    let res = await this.request(
      `users/${username}/change-password`,
      token,
      { oldPassword, newPassword },
      'patch'
    );
    return { token: res.token, user: res.user };
  }

  /**
   * Sends a new confirmation email and gets a success message from the API
   */

  static async resendConfirmation(email) {
    let res = await this.request(
      'auth/resend-confirmation-email',
      undefined,
      { email },
      'post'
    );
    return { message: res.message };
  }

  /**
   * Sends the confirmation token to the API and gets a new user token & user data
   */

  static async confirmEmail(token) {
    let res = await this.request(
      'auth/confirm-email',
      undefined,
      { emailToken: token },
      'post'
    );
    return { token: res.token, user: res.user };
  }

  /**
   * Gets a success message from the API, sending data to be emailed to the server
   */

  static async contact(data) {
    let res = await this.request(`users/contact`, undefined, data, 'post');
    return { message: res.message };
  }

  /**
   * Deletes a user given a token and username
   */

  static async deleteUser(token, username) {
    let res = await this.request(`users/${username}`, token, {}, 'delete');
    return { message: res.message };
  }

  // API Key Routes
}

export default BackendAPI;
