export const dataFormat = data => {
  const day = data.split('T')[0].replace(/-/gm, '/');
  const seconds = data.split('T')[1].slice(0, -5);
  return `${day} ${seconds}`;
};
