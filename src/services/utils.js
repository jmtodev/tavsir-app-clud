/* eslint-disable no-plusplus */
import Cookies from "js-cookie";

export const setCookie = (name, value) => {
  Cookies.set(name, value);
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const removeCookie = (name) => {
  Cookies.remove(name);
};

export const convertCurrency = (value) => {
  const currency = Number(value).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return currency;
};

export const validateCookiey = (cookieName) => {
  // Get all cookies as a string
  const cookies = document.cookie;

  // Split the cookies string into an array of individual cookies
  const cookieArray = cookies.split(";");

  // Iterate through the cookie array to find the specified cookie
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();

    // Check if the cookie starts with the specified name
    if (cookie.indexOf(`${cookieName}=`) === 0) {
      return true; // Cookie exists
    }
  }

  return false; // Cookie does not exist
}

// Helper function to get the value of a cookie by name
export const getCookie2 = (cookieName) => {
  const name = `${cookieName}=`;
  const cookieArray = document.cookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}

// Helper function to set/update the value of a cookie
export const setCookie2 = (cookieName, cookieValue) => {
  document.cookie = `${cookieName}=${cookieValue}; path=/`;
}

export const updateAddCookieObject = (cookieName, newObject) => {
  // Get the existing cookie value
  const existingCookie = getCookie(cookieName);

  if (existingCookie) {
    // Decode the existing cookie value

    // Parse the cookie value as an array of objects
    const cookieObjects = JSON.parse(existingCookie);

    // Check if the new object has the same ID as any existing object
    const matchedObjectIndex = cookieObjects.findIndex((obj) => {
      return obj.product_id === newObject.product_id;
    });

    if (matchedObjectIndex !== -1) {
      // If the object with the same ID is found, increment its quantity by 1
      cookieObjects[matchedObjectIndex].qty += 1;
    } else {
      // If there is no object with the same ID, push the new object
      cookieObjects.push(newObject);
    }

    // Encode the updated cookie value
    const encodedCookie = encodeURIComponent(JSON.stringify(cookieObjects));

    // Update the cookie
    setCookie2(cookieName, encodedCookie);
  } else {
    // If the cookie doesn't exist, create a new cookie with the new object
    const encodedCookie = encodeURIComponent(JSON.stringify([newObject]));
    setCookie2(cookieName, encodedCookie);
  }
}

export const updateCookieObject = (cookieName, newObject) => {
  // Get the existing cookie value
  const existingCookie = getCookie(cookieName);

  if (existingCookie) {
    // Decode the existing cookie value

    // Parse the cookie value as an array of objects
    const cookieObjects = JSON.parse(existingCookie);

    // Check if the new object has the same ID as any existing object
    const matchedObjectIndex = cookieObjects.findIndex((obj) => {
      const isMatch = obj.product_id === newObject.product_id
      && obj.pilihan === newObject.pilihan
        && obj.customize === newObject.customize
        && obj.note === newObject.note;
      return isMatch
    });

    if (matchedObjectIndex !== -1) {
      // If the object with the same ID is found, update its quantity
      cookieObjects[matchedObjectIndex].qty = newObject.qty;
      cookieObjects[matchedObjectIndex].customize = newObject.customize;
      cookieObjects[matchedObjectIndex].pilihan = newObject.pilihan;
      cookieObjects[matchedObjectIndex].note = newObject.note;
      cookieObjects[matchedObjectIndex].price = newObject.price;
      cookieObjects[matchedObjectIndex].orderDesc = newObject.orderDesc;
    } else {
      // If there is no object with the same ID, push the new object
      cookieObjects.push(newObject);
    }

    // Encode the updated cookie value
    const encodedCookie = encodeURIComponent(JSON.stringify(cookieObjects));

    // Update the cookie
    setCookie2(cookieName, encodedCookie);
  } else {
    // If the cookie doesn't exist, create a new cookie with the new object
    const encodedCookie = encodeURIComponent(JSON.stringify([newObject]));
    setCookie2(cookieName, encodedCookie);
  }
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const isValidName = (name) => {
  const nameRegex = /^.{1,25}$/;
  return nameRegex.test(name);
}

export const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10,13}$/;
  return phoneRegex.test(phoneNumber);
}

export const convertPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters from the phone number
  const cleanedNumber = phoneNumber.replace(/\D/g, '')

  // Check if the first digit is 0 and replace it with "62"
  if (cleanedNumber.charAt(0) === '0') {
    return cleanedNumber
  }

  // Check if the first two digits are already "62" and skip adding the country code
  if (cleanedNumber.substr(0, 2) === '62') {
    const convertNumber = `0${cleanedNumber.substr(2)}`
    return convertNumber
  }

  // Add the code "0" to the cleaned number
  const convertedNumber = `0${cleanedNumber}`

  return convertedNumber
}

export const textColor = (status) => {
  if (status) {
    if (status.toLowerCase().includes('cancel')) {
      return '#FF2020'
    }
    if (status.toLowerCase().includes('waiting_payment')) {
      return '#FFCB04'
    }
    if (status.toLowerCase().includes('waiting_confirmation')) {
      return '#f9a603'
    }
    if (status.toLowerCase().includes('ready')) {
      return '#0024B4'
    }
    if (status.toLowerCase().includes('queue')) {
      return '#FF8E00'
    }
    if (status.toLowerCase().includes('waiting_open')) {
      return '#f9a603'
    }
    if (status.toLowerCase().includes('payment_success')) {
      return '#797ef6'
    }
    return '#2AB930'
  }
  return null
}

export const textStatus = (status) => {
  if (status) {
    if (status.toLowerCase().includes('cancel')) {
      return 'Dibatalkan'
    }
    if (status.toLowerCase().includes('waiting_payment')) {
      return 'Menunggu Pembayaran'
    }
    if (status.toLowerCase().includes('waiting_confirmation_tenant')) {
      return 'Menunggu Konfirmasi Tenant'
    }
    if (status.toLowerCase().includes('waiting_confirmation_user')) {
      return 'Menunggu Konfirmasi User'
    }
    if (status.toLowerCase().includes('ready')) {
      return 'Selesai Disiapkan'
    }
    if (status.toLowerCase().includes('queue')) {
      return 'Menunggu Pembayaran di Kasir'
    }
    if (status.toLowerCase().includes('waiting_open')) {
      return 'Menunggu Konfirmasi'
    }
    if (status.toLowerCase().includes('payment_success')) {
      return 'Disiapkan'
    }
    return 'Berhasil'
  }
  return null
}
