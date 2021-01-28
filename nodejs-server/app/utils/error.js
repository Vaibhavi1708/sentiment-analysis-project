function notFound(type, id) {
  return 'Cannot find ' + type + ' with id: ' + id;
}

function userNotFound(email) {
  return 'Cannot find user with email id: ' + email;
}

function invalidPassword() {
  return 'Invalid Password';
}

function successful(type) {
  return type + ' Successful';
}

function unauthorized() {
  return 'Unauthorized!!';
}

function emailAlreadyExist() {
  return 'Email is already in use';
}

module.exports = {
  notFound,
  userNotFound,
  invalidPassword,
  successful,
  unauthorized,
  emailAlreadyExist
};
