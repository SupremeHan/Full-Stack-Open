import diagnosesData from '../data/diagnoses';
import { DiagnosesData } from '../types';

const diagnoses: DiagnosesData[] = diagnosesData;

const getAllDiagnoses = (): DiagnosesData[] => {
	return diagnoses;
};

export default { getAllDiagnoses };
