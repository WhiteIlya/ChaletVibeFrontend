import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateChalet: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [review, setReview] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [country, setCountry] = useState('FR'); // Default to France
    const [chaletLink, setChaletLink] = useState('');
    const [skiResortLink, setSkiResortLink] = useState('');
    const [approximateTravelTime, setApproximateTravelTime] = useState('');
    const [beds, setBeds] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('review', review);
        formData.append('beds', beds.toString());
        formData.append('country', country);
        formData.append('chalet_link', chaletLink);
        formData.append('ski_resort_link', skiResortLink);
        formData.append('approximate_travel_time', approximateTravelTime);

        if (image) {
            formData.append('image', image);
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/chalets/`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: formData,
        });

        if (response.ok) {
            navigate('/');
        } else {
            alert('Failed to create chalet');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Добавить новое шале</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Название шале</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Цена</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="review" className="form-label">Отзыв</label>
                    <textarea className="form-control" id="review" value={review} onChange={(e) => setReview(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Страна</label>
                    <select className="form-control" id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="FR">Франция</option>
                        <option value="CH">Швейцария</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="chaletLink" className="form-label">Ссылка на шале</label>
                    <input type="url" className="form-control" id="chaletLink" value={chaletLink} onChange={(e) => setChaletLink(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="skiResortLink" className="form-label">Ссылка на горнолыжку</label>
                    <input type="url" className="form-control" id="skiResortLink" value={skiResortLink} onChange={(e) => setSkiResortLink(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="approximateTravelTime" className="form-label">Примерное время от аэропорта</label>
                    <input type="text" className="form-control" id="approximateTravelTime" value={approximateTravelTime} onChange={(e) => setApproximateTravelTime(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="beds" className="form-label">Количество мест</label>
                    <input type="number" className="form-control" id="beds" value={beds} onChange={(e) => setBeds(Number(e.target.value))} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Изображение</label>
                    <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
                </div>
                <button type="submit" className="btn btn-primary">Создать шале</button>
            </form>
        </div>
    );
};

export default CreateChalet;
