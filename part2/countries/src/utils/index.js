const isObjectEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};

const generateImgUrl = (imgPath) => {
	const IMG_BASE_URL = `http://openweathermap.org/img/w/`;
	return `${IMG_BASE_URL}${imgPath}.png`;
};

export { isObjectEmpty, generateImgUrl };
