export const getRoleText = (value: string): string =>
  value.trim() ? value[0].toUpperCase() + value.slice(1).toLowerCase() : 'Member';
