function validateEmail(email) {
  // Regex checks for non-whitespace/non-@ characters before and after @, followed by a dot and TLD
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export default validateEmail;