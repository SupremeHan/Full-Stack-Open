import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { courseParts } from './data';

const App = () => {
	const courseName = 'Half Stack application development';

	const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

	return (
		<div>
			<Header courseName={courseName} />
			<Content data={courseParts} />
			<Footer totalExercises={totalExercises} />
		</div>
	);
};

export default App;
