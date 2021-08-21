// import React from 'react';
// import Alert from '../components/shared/UI/Alert/Alert';

export const isEmpty = (data: string) => {
  if (typeof data === 'string') {
    if (data.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  }
  throw new Error('Expected parameter type must be a string');
};


export const getDateTime = (date: Date | string | number, options: string = 'en-FI') => {
  const formattedDate = new Date(date ? date : new Date()).toLocaleTimeString(options, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return formattedDate;
};

// export const displayErrorAlert = (error?: string, message?: string, status = 'success') => {
//   if (error && error.length > 0) {
//     status = 'danger'
//     return (
//       <Alert >{ message } < /Alert>
//     );
//   }
// }

