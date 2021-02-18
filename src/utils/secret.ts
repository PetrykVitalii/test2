export function CreateKey() {
  const letters = [
    'x',
    '-',
    'd',
    'i',
    'g',
    'n',
    'i',
    't',
    'y',
  ];

  return letters.join('');
}

export function CreateHeader() {
  const toJson = {
    user_agent: navigator.userAgent,
    time: Date.now(),
  };
  const string = `totally${JSON.stringify(toJson)}spice`;
  function reverseString(str: string) {
    return str
      .split('')
      .reverse()
      .join('');
  }
  return reverseString(window.btoa(string));
}
