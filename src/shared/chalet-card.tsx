import React from 'react';

interface ChaletProps {
    id: number;
    name: string;
    image: string | null;
    review: string;
    price: number;
    chaletLink: string;
    skiResortLink: string;
    approximateTravelTime: string;
    beds: number;
    onVote: (chaletId: number, liked: boolean) => void;
}

export const ChaletCard: React.FC<ChaletProps> = ({
    id,
    name,
    image,
    review,
    price,
    chaletLink,
    skiResortLink,
    approximateTravelTime,
    beds,
    onVote
}) => {
    return (
        <div className="card mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
            {image ? (
                <img src={image} className="card-img-top" alt={name} />
            ) : (
                <div className="card-img-top" style={{ height: '300px', background: '#ddd' }}></div>
            )}
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{review}</p>
                <p className="card-text">
                    <strong>Цена:</strong> €{price}
                </p>
                <p className="card-text">
                    <strong>Вместимость:</strong> {beds} мест
                </p>
                <p className="card-text">
                    <strong>Цена за человека:</strong> €{price / beds}
                </p>
                <p className="card-text">
                    <strong>Время от аэропорта:</strong> {approximateTravelTime}
                </p>
                <p className="card-text">
                    <a href={chaletLink} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                        Ссылка на шале
                    </a>
                    <a href={skiResortLink} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                        Ссылка на горнолыжку
                    </a>
                </p>

                <div className="d-flex justify-content-between mt-4">
                    <div>
                        <button className="btn btn-danger" onClick={() => onVote(id, false)}>
                            <i className="bi bi-arrow-left"></i> Dislike
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={() => onVote(id, true)}>
                            Like <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
