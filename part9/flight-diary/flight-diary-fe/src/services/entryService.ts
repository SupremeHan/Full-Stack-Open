import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const BASE_URL = '/api/diaries';

const getAllEntires = async () => {
	const response = await axios.get<DiaryEntry[]>(BASE_URL);

	return response.data;
};

const addNewEntry = async (newEntry: NewDiaryEntry) => {
	const response = await axios.post<NewDiaryEntry>(BASE_URL, newEntry);

	return response.data;
};

export { getAllEntires, addNewEntry };
