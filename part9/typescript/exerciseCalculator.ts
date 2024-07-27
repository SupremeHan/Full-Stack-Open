interface CalculatorResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export const exerciseCalculator = (dailyExerciseHours: number[], target?: number): CalculatorResult => {
	const TARGET_DAYS = target ?? 5;
	const trainingDaysDone = dailyExerciseHours.filter((el) => el !== 0);
	const isSuccess = TARGET_DAYS <= trainingDaysDone.length;

	const totalHoursTrained = dailyExerciseHours.reduce((acc, curr) => {
		return (acc += curr);
	}, 0);

	const calculateRating = () => {
		if (totalHoursTrained > 10) {
			return {
				rating: 3,
				message: 'Well done, kepp it up!'
			};
		} else if (totalHoursTrained > 8 && totalHoursTrained < 10) {
			return {
				rating: 2,
				message: 'You are almost there, good job!'
			};
		} else {
			return {
				rating: 1,
				message: 'Lets add more hours, you got this!'
			};
		}
	};

	return {
		periodLength: dailyExerciseHours.length,
		trainingDays: trainingDaysDone.length,
		success: isSuccess,
		target: TARGET_DAYS,
		average: totalHoursTrained / dailyExerciseHours.length,
		rating: calculateRating().rating,
		ratingDescription: calculateRating().message
	};
};

const args = process.argv.slice(2);

const arrayOfNums = args.map((arg) => {
	const num = parseFloat(arg);
	if (isNaN(num)) {
		console.error(`Invalid number ${arg}`);
		process.exit(1);
	}
	return num;
});

console.log(exerciseCalculator(arrayOfNums));
