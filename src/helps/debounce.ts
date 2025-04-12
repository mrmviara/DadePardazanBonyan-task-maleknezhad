export const debounce = (func: Function, delay: number) => {
	let timeoutId: number | null = null;
  
	return (...args: any[]) => {
	  if (timeoutId) {
		clearTimeout(timeoutId);
	  }
  
	  timeoutId = setTimeout(() => {
		func(...args);
	  }, delay);
	};
  };