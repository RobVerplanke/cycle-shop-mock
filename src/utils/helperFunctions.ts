// Capitalize only the first letter of a string
export function capitalizeString(name: string) {
  // Lowercase full string
  const lowerCased: string = name.toLowerCase();

  // Uppercase first letter
  return lowerCased[0].toUpperCase() + lowerCased.slice(1);
}
