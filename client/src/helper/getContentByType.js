export const getContentByType = event => {
  switch (event.type) {
    case 'identify':
      return event.traits.email;
    case 'page':
      return event.properties.path;
    case 'track':
      return event.event;
    default:
      return 'No content';
  }
};
