// import React from 'react';
// import Alert from '../components/shared/UI/Alert/Alert';

export const isEmpty = (data: string): boolean => {
  if (typeof data === 'string') {
    if (data.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  }
  throw new Error('Expected parameter type must be a string');
};


export const getDateTime = (date: Date | string | number, options = 'en-FI'): string => {
  const formattedDate = new Date(date ? date : new Date()).toLocaleTimeString(options, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return formattedDate;
};

export const getAlias = (props: IPost): string | undefined => {
  let postAuthorAlias;
  if (props.postAuthor?.fullName?.includes(' ')) {
    const alias = props.postAuthor.fullName.split(' ')[1].toLocaleLowerCase();
    postAuthorAlias = alias;
  } else {
    postAuthorAlias = props.postAuthor?.firstName;
  }
  return postAuthorAlias;
};

