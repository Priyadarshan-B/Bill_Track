const { query } = require('../../config/query');

const findUserByEmail = async (email) => {
  try {
    const Query = "SELECT id, name, email, role FROM users WHERE email = ?";
    let users = await query(Query, [email]);
    if (users.length > 0) {
      return { ...users[0] };
    }
    return null;
  } catch (error) {
    throw new Error('Error finding user by email');
  }
};

module.exports = { findUserByEmail };
