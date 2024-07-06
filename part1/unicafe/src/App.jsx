import { useState } from 'react';

const Statistics = (props) => {
	const { good, neutral, bad } = props.values;
	let total = good + neutral + bad;

	const calculateAvgGood = () => {
		let avg = 0;
		let calcAvg = (good / total) * 100;
		return isNaN(calcAvg) ? avg : calcAvg;
	};

	const calcAvgScore = () => {
		let totalSum = good * 1 + bad * -1;
		let totalCount = total;

		if (totalCount === 0) {
			return 0;
		} else {
			return totalSum / totalCount;
		}
	};
	return (
		<div>
			<h3>Statistics</h3>
			{total === 0 ? (
				<p>No feedback given</p>
			) : (
				<table>
					<tbody>
						<StatisticsLine text="Good:" value={good} />
						<StatisticsLine text="Neutral:" value={neutral} />
						<StatisticsLine text="Bad:" value={bad} />

						<StatisticsLine text="All:" value={total} />
						<StatisticsLine text="Average:" value={calcAvgScore()} />
						<StatisticsLine text="Positive:" value={`${calculateAvgGood()} %`} />
					</tbody>
				</table>
			)}
		</div>
	);
};

const StatisticsLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Button = ({ text, onClick }) => {
	return (
		<button onClick={onClick} name={text}>
			{text}
		</button>
	);
};

const App = () => {
	const [values, setValues] = useState({ good: 0, neutral: 0, bad: 0 });

	const handleClick = (e) => {
		const { name } = e.target;
		setValues((prevVal) => ({
			...prevVal,
			[name]: prevVal[name] + 1
		}));
	};

	return (
		<div>
			<h3>Give feedback</h3>
			<Button text="good" onClick={handleClick} />
			<Button text="neutral" onClick={handleClick} />
			<Button text="bad" onClick={handleClick} />
			<Statistics values={values} />
		</div>
	);
};

export default App;
