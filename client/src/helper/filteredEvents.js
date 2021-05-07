export const filteredEvents = (events, inputValue) =>
  events.filter(event => {
    const lowerFilterValue = inputValue.toLowerCase();
    return (
      event.type.toLowerCase().includes(lowerFilterValue) ||
      event.traits?.email?.toLowerCase().includes(lowerFilterValue) ||
      event.properties?.path?.toLowerCase().includes(lowerFilterValue) ||
      event.event?.toLowerCase().includes(lowerFilterValue) ||
      event.receivedAt.toLowerCase().includes(lowerFilterValue)
    );
  });
