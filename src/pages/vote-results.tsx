import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../context';
import Confetti from 'react-confetti';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VoteResults: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const { isAuthenticated } = useAuth();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetch(`${process.env.REACT_APP_API_URL}/reactions/results/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => response.json())
            .then(data => setResults(data));
        }
    }, [isAuthenticated]);

    const chartData = {
        labels: results.map((r) => r.name),
        datasets: [
            {
                label: 'Количество голосов',
                data: results.map((r) => r.likes),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
            },
        },
    };

    return (
        <div className="container mt-5">
            {showConfetti && <Confetti recycle={false} numberOfPieces={1000} onConfettiComplete={() => setShowConfetti(false)} />}
            <h2 className="text-center">Результаты голосования</h2>
            <div className="chart-container mt-5">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default VoteResults;
