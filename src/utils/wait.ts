export const wait = (
  condition: any,
  callback: () => void,
  timeout: number = 100,
) => {
  const interval = setInterval(iteration, timeout);

  function iteration() {
    console.log(condition);
    if (condition) {
      clearInterval(interval);
      callback();
    }
  }

  iteration();
};
