import  { useState } from 'react';

function UploadForm() {
    const [teamName, setTeamName] = useState("");
    const [users, setUsers] = useState([{ name: "", email: "" }]);
    const [audioFile, setAudioFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object
        const formData = new FormData();
        formData.append('team_name', teamName);
        formData.append('users', JSON.stringify(users));
        formData.append('audio', audioFile);

        try {
            // Use fetch API to send the POST request
            const response = await fetch('/summarize', {
                method: 'POST',
                body: formData,
            });

            // Check if the request was successful
            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
            } else {
                console.error('Failed to submit:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={teamName} 
                onChange={(e) => setTeamName(e.target.value)} 
                placeholder="Team Name"
            />
            {/* Example of file input */}
            <input 
                type="file" 
                onChange={(e) => setAudioFile(e.target.files[0])} 
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default UploadForm;