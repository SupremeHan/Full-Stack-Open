enum BmiType {
	Underweight = 'Underweight',
	NormalWeight = 'Normal weight',
	Overweight = 'Overweight',
	Obese = 'Obese'
}

export const calculateBmi = (height: number, weight: number): BmiType => {
	const heightInMeters = height / 100;
	const result = weight / (heightInMeters * 2);

	if (result < 18.5) {
		return BmiType.Underweight;
	} else if (result >= 18.5 && result <= 24.9) {
		return BmiType.NormalWeight;
	} else if (result >= 25 && result <= 29.9) {
		return BmiType.Overweight;
	} else {
		return BmiType.Obese;
	}
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
