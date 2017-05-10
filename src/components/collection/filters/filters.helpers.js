// @flow

export const getRegularExpression = (query: string) => {
  const invalid = /[°"§%()\[\]\/{}=\\?´`'#<>|,;.:+_-]+/g;
  const filter = query.replace(invalid, '');

  return new RegExp(filter, 'i');
};
