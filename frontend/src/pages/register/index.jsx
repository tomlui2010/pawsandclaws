import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        profilePhoto: null
    });

    const [isRegistered, setIsRegistered] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profilePhoto: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to an API)
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('breed', formData.breed);
        formDataToSubmit.append('age', formData.age);
        formDataToSubmit.append('profilePhoto', formData.profilePhoto);

        // Example: Sending the form data to an API endpoint
        fetch('http://localhost/register', {
            method: 'POST',
            body: formDataToSubmit
        }).then(response => {
            if (response.ok) {
                console.log('Registration successful!');
                setIsRegistered(true);
            } else {
                console.log('Registration failed.');
            }
        });

        console.log('Form data submitted:', formDataToSubmit);
        // Reset form after submission
        console.log('Form data submitted:', formData);
        setFormData({
            name: '',
            breed: '',
            age: '',
            profilePhoto: null
        });
    };

    return (
        <div className="register-container">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            {!isRegistered ? <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="breed" className="block text-lg mb-2">Breed</label>
                    <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-lg mb-2">Age</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="profilePhoto" className="block text-lg mb-2">Profile Photo</label>
                    <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        accept="image/*"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>: <RegistrationSuccess />}
        </div>
    );
}
function RegistrationSuccess() {
    return (
        <div className="mt-4 p-4 bg-orange-100 border border-orange-400 text-green-700 rounded">
            Registration successful! Welcome to Paws & Claws.
        </div>
    );
}

export default Register;

