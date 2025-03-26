export const LuxuryFind = (type) => {
  const normalizedType = type?.toLowerCase() || '';

  return (
    normalizedType.includes("volvo") ||
    normalizedType.includes("mercedes benz") ||
    normalizedType.includes("washroom") ||
    normalizedType.includes("bharat benz") ||
    normalizedType.includes("luxury") ||
    normalizedType.includes("ve") ||
    normalizedType.includes("scania")
  );
};
