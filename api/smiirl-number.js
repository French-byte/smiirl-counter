import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const AGENCY_URL = 'https://risky-business-consulting961.agencyanalytics.app/report/12095353/tkn.abf87cc790d6c0d87d82c931e4f81aee';

  try {
    const response = await axios.get(AGENCY_URL);
    const html = response.data;
    const $ = cheerio.load(html);

    const span = $('span[title]').first();
    const rawNumber = span.attr('title');

    if (!rawNumber) throw new Error('Number not found in span');

    const number = parseInt(rawNumber, 10);
    res.status(200).json({ number });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to extract number' });
  }
}
