const Header = ({ course }) => {
	return <div>{course}</div>;
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part, index) => (
				<Part part={part} key={index} />
			))}
		</div>
	);
};

const Part = ({ part }) => {
	return <div>{`${part.name}: ${part.exercises}`}</div>;
};

const Total = ({ parts }) => {
	return <div>{`Total number of excercises: ${parts.reduce((acc, curr) => acc + curr.exercises, 0)}`}</div>;
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
