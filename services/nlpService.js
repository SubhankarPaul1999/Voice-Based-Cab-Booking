const extractLocations = (text) => {
  const lower = text.toLowerCase();
  const fromMatch = lower.match(/from (.*?) to/);
  const toMatch = lower.match(/to (.*)/);

  return {
    from: fromMatch ? fromMatch[1].trim() : 'Unknown',
    to: toMatch ? toMatch[1].trim() : 'Unknown',
  };
};

module.exports = { extractLocations };
