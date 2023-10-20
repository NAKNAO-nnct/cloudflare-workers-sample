import { Router } from 'itty-router';
import { loadCSV } from './lib/loadCsv';

// now let's create a router (note the lack of "new")
const router = Router();

// 奈良高専吹奏楽部 API
const gasApiEndpoint = 'https://script.google.com/macros/s/AKfycbxl_iWjgcunOEu0tLvKlnLC4MM9CpcsmNu_L_O1yHWp1x2XHnWN/exec?key=';

router.get('/api/v3/about', async ({ query, params }) => {
	const url = gasApiEndpoint + 'about';

	const response = await loadCSV(url, array => {
		return {
			'question': array[0],
			'answer': array[1],
		}
	}, 1);

	response.forEach(line => {
		line['answer'] = line['answer'].replace(/<cms-br>/g, '\n');
	});

	return new Response(JSON.stringify(response));
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
