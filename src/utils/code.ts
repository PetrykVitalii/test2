export default (string: string) => string.startsWith('#') ? string.toLocaleUpperCase() : `#${string.toLocaleUpperCase()}`;
