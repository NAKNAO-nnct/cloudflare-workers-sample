async function loadCSV(url, convert, skip=2){
		const response = await fetch(url);
		const data = await response.text();

		return data.split('\n').slice(skip).map(e => {
			return convert(e.split(','))
		});
}

export { loadCSV }
