/**
 * Obtains the user's information from local storage.
 * @param {Function} setUser A setter function to save the user object
 */
function retrieveUser(setUser) {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      return foundUser;
    } else {
        console.log('User is not currently logged in.');
        return null;
    }
}

/**
 * Saves the user's information in local storage.
 * @param {Object} user JSON Object representing a user
 */
function persistUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Removes the user's information from local storage.
 */
function removeUser() {
    localStorage.removeItem('user');
}

export {
    retrieveUser,
    persistUser,
    removeUser
}