import { elasticOut, sineOut } from 'svelte/easing'

export const convertISODateToInputTZ = (dayjsDate) => {
  return dayjsDate.format('YYYY-MM-DD[T]HH:mm');
}

export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    let i: any = '' ;
    if(item[1]["type"] === "array") i = []
    if(item[1]["type"] === "object_array") i = {}
    if(item[1]["type"] === "number") i = 0
    return {
      ...obj,
      [item[key]]: "",
    };
  }, initialValue);
};

export function spin(node, { duration }) {
  return {
    duration,
    css: t => {
      const eased = elasticOut(t);

      return `
        transform: scale(${eased});`
    }
  };
}

export function fadeSlideLeft(node, { duration, delay }) {
		return {
			duration,
      delay,
			css: t => {
				const eased = sineOut(t);

				return `
					transform: translate(${-5*(1-eased)}%,0);
          opacity: ${eased};
					);`
			}
		};
	}
