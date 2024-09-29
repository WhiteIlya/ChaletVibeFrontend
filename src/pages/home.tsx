import React from 'react';
import { useAuth } from '../context';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const { isAuthenticated, voted, name } = useAuth();

    return (
        <div className="container mt-5 text-center">
            <h1 className="display-1 text-center mb-4">
                Выбираем шале, друзья!
            </h1>
            <img src="/assets/chalet-vibe.png" alt="Chalet Vibe" className="img-fluid" />
            {isAuthenticated && (
                <>
                    <h2 className="mt-4">Привет, {name || 'друг'}, давай проголосуем за шале, в которое мы все вместе поедем тусить на Новый Год!</h2>
                    <div className="mt-5">
                        {!voted && (
                            <Link to="/choose-chalet" className="btn btn-success btn-lg me-3">Выбираем Шалешку</Link>
                        )}
                        <button className="btn btn-warning btn-lg" disabled={!voted} onClick={() => window.location.href = '/reactions/results'}>
                            Результаты
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
