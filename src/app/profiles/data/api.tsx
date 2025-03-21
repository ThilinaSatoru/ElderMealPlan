
import { useEffect, useState } from 'react';

function HealthProfiles() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/healthProfiles')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error('Error fetching CSV data:', err));
    }, []);

    return (
        <div>
            <h1>Health Profiles </h1>
            < pre > {JSON.stringify(data, null, 2)} </pre>
        </div>
    );
}





import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'health_profiles.csv'); // Ensure the CSV is in `public/`
        const results: any[] = [];

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                res.status(200).json(results);
            })
            .on('error', (error) => {
                res.status(500).json({ error: 'Error reading CSV file', details: error.message });
            });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error });
    }
}
