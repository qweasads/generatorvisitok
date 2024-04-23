import React, { useState } from 'react';
import styles from './styles/global.module.scss';
import { toPng } from 'html-to-image';
import './styles/reset.module.scss'

const Home: React.FC = () => {
    const [description, setDescription] = useState('');
    const [interest, setInterest] = useState('');
    const [profession, setProfession] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterest(e.target.value);
    };

    const handleProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfession(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result) {
                setUploadedImage(reader.result.toString());
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const saveAsImage = () => {
        const cardElement: HTMLElement | null = document.querySelector(`.${styles.card}`);

        if (cardElement) {
            toPng(cardElement)
                .then(function (dataUrl: string) {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'card-image.png';
                    link.click();
                })
                .catch(function (error) {
                    console.error('Error saving image: ', error);
                });
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.card}>
                <img src={uploadedImage || "phon.jpg"} alt="phone" />
                <input
                    className={styles.name}
                    placeholder="Your name"
                    value={name}
                    maxLength={23}
                    onChange={handleNameChange}
                    style={{ height: '50px' }}
                />

                <input
                    className={styles.profession}
                    placeholder="Your profession"
                    value={profession}
                    maxLength={24}
                    onChange={handleProfessionChange}
                    style={{ height: '50px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '0 auto' }}>
                    <p className={styles.socialEmail} style={{ marginRight: '5px' }}>Email:</p>
                    <input
                        className={styles.inputField}
                        placeholder="Your email"
                        value={email}
                        maxLength={20}
                        onChange={handleEmailChange}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '10px auto' }}>
                    <p className={styles.socialPhone} style={{ marginRight: '5px' }}>Phone:</p>
                    <input
                        className={styles.inputField}
                        placeholder="Your phone number"
                        value={phone}
                        maxLength={16}
                        onChange={handlePhoneChange}
                    />
                </div>

                <div className={styles.desc}>
                    <p className={styles.about}>About</p>

                    <input
                        className={`${styles.about_desc} ${styles.textarea}`}
                        placeholder="Your description"
                        value={description}
                        maxLength={100}
                        onChange={handleDescriptionChange}
                        style={{ height: '50px' }}
                    />

                    <p className={styles.interest}>Interest</p>

                    <input
                        className={`${styles.interest_desc} ${styles.textarea}`}
                        placeholder="Interest desc"
                        value={interest}
                        maxLength={100}
                        onChange={handleInterestChange}
                        style={{ height: '50px' }}
                    />
                </div>
            </div>

            <label htmlFor="fileInput" className={styles.customUploadImage}>
                Поменять изображение
            </label>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
            />

            <button className={styles.saveButton} onClick={saveAsImage}>
                Скачать визитку
            </button>
        </div>
    );
};

export default Home;