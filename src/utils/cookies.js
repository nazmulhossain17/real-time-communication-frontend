export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();

    if (cookie.indexOf(nameEQ) === 0) {
      const cookieValue = cookie.substring(nameEQ.length);
      console.log(`Cookie found: ${name}=${cookieValue}`);
      return cookieValue;
    }
  }
  console.log("All cookies:", document.cookie);

  console.log(`Cookie not found: ${name}`);
  return null;
};
