import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
// import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight) {
		return res.status(400).json({ error: 'malformatted parameters' });
	}

	const heightNum = parseFloat(height as string);
	const weightNum = parseFloat(weight as string);

	if (isNaN(heightNum) || isNaN(weightNum)) {
		return res.status(400).json({ error: 'Height and weight must be valid numbers.' });
	}

	const bmi = calculateBmi(heightNum, weightNum);
	return res.json({
		weight: weightNum,
		height: heightNum,
		bmi
	});
});

app.post('/exercises', (req, res) => {
	const { daily_exercises, target } = req.body;

	if (!daily_exercises.length || isNaN(target)) {
		return res.status(400).json({
			error: 'parameters missing'
		});
	}

	const exercisesResult = exerciseCalculator(daily_exercises as number[], target as number);

	return res.send(201).json(exercisesResult);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
