export function formatNumber(number) {
	if (isNaN(number)) {
		return 'Número inválido';
	}

	const suffixes = ["", "K", "M", "B", "T"];
	// const suffixes = ["", "Mil", "Millón", "Mil Millones", "Billón"];
	let suffixIndex = 0;
	let formattedNumber = number;

	while (formattedNumber >= 1000 && suffixIndex < suffixes.length - 1) {
		formattedNumber /= 1000;
		suffixIndex++;
	}

	// Usamos `toFixed(2)` para limitar el número a 2 decimales
	formattedNumber = Number(formattedNumber).toFixed(2);

	return `${formattedNumber} ${suffixes[suffixIndex]}`;
}
