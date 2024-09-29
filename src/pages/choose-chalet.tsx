import React, { useState, useEffect } from 'react';
import { useAuth } from '../context';
import TinderCard from 'react-tinder-card';
import { ChaletCard } from '../shared';

const ChooseChalet: React.FC = () => {
    const [chalets, setChalets] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            fetch(`${process.env.REACT_APP_API_URL}/chalets/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => response.json())
            .then(data => setChalets(data));
        }
    }, [isAuthenticated]);

    const handleVote = (chaletId: number, liked: boolean) => {
        fetch(`${process.env.REACT_APP_API_URL}/reactions/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({ chalet: chaletId, liked })
        });

        setCurrentIndex(currentIndex + 1);
    };

    const onSwipe = (direction: string, chaletId: number) => {
        if (direction === 'right') {
            handleVote(chaletId, true);
        } else if (direction === 'left') {
            handleVote(chaletId, false);
        }
    };

    const handleUndoLastVote = () => {
        fetch(`${process.env.REACT_APP_API_URL}/reactions/undo-last-vote/`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.detail === "Last vote undone.") {
                setCurrentIndex(currentIndex - 1);
            } else {
                alert(data.detail);
            }
        });
    };

    const handleResultsClick = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/set-voted/`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => response.json())
        .then(() => {
            window.location.href = '/reactions/results';
        });
    };

    if (!chalets.length || currentIndex >= chalets.length) {
        return (
            <div className="text-center mt-5">
                <h2>Ты проголосвал! Теперь тебе доступны Результаты!</h2>
                <button className="btn btn-primary mt-3" onClick={handleResultsClick}>Результаты</button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h3 className="fs-1">Свайпни как в Tinderе!</h3>
                <p>Осталось проголосовать за {chalets.length - currentIndex} шале</p>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <i className="bi bi-arrow-left fs-1 text-danger"></i>
                        <span className="ms-3 fs-3 text-uppercase text-danger">Dislike</span>
                    </div>
                    <div>
                        <span className="me-2 fs-3 text-success text-uppercase">Like</span>
                        <i className="bi bi-arrow-right fs-1 text-success"></i>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <TinderCard
                    key={chalets[currentIndex].id}
                    onSwipe={(dir) => onSwipe(dir, chalets[currentIndex].id)}
                    preventSwipe={['up', 'down']}
                >
                    <ChaletCard
                        id={chalets[currentIndex].id}
                        name={chalets[currentIndex].name}
                        image={chalets[currentIndex].image}
                        review={chalets[currentIndex].review}
                        price={chalets[currentIndex].price}
                        chaletLink={chalets[currentIndex].chalet_link}
                        skiResortLink={chalets[currentIndex].ski_resort_link}
                        approximateTravelTime={chalets[currentIndex].approximate_travel_time}
                        beds={chalets[currentIndex].beds}
                        onVote={handleVote}
                    />
                </TinderCard>
            </div>

            {currentIndex > 0 && (
                <div className="text-center mt-4">
                    <button className="btn btn-warning" onClick={handleUndoLastVote}>Переобуться за последнее шале</button>
                </div>
            )}
        </div>
    );
};

export default ChooseChalet;
