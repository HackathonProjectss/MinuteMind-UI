import { useState } from "react";
import Robot from "../../assets/images/robot.png";
import { PacmanLoader} from "react-spinners";


function UploadForm() {
  const [teamName, setTeamName] = useState("");
  const [users, setUsers] = useState([{ name: "", email: "" }]);
  const [documentFile, setDocumentFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading image when submit is clicked

    const formData = new FormData();
    formData.append("team_name", teamName);
    formData.append("users", JSON.stringify(users));
    formData.append("document", documentFile);

    try {
      const response = await fetch(
        "https://minutemind-api-production.up.railway.app/api/summarize",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text(); 
        console.error(`Failed to submit: ${response.status} - ${errorDetails}`);
        alert(`Error: ${response.status} - ${response.statusText}`);
      } else {
        const data = await response.json();
        console.log("Response:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentFile(file);
      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview("");
      }
    } else {
      setDocumentFile(null);
      setPreview("");
    }
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen bg-gray-100'>
    {/* loading icon section  */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10'>
         <PacmanLoader size={28} color='#3949AB' /> 
        </div>
      )}

      <div className='grid md:grid-cols-2 grid-cols-1 relative z-0'>
        <div className='bg-indigo-700 shadow-lg border border-gray-300 p-6 max-w-md justify-center items-center flex'>
          <img src={Robot} alt='Robot' />
        </div>
        <div className='max-w-md w-full p-10 border border-gray-300 shadow-lg bg-white'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>
            Upload Form
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                className='block text-sm font-medium text-gray-700 mb-1'
                htmlFor='teamName'
              >
                Team Name
              </label>
              <input
                id='teamName'
                type='text'
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder='Enter team name'
                className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-gray-700 mb-1'
                htmlFor='documentFile'
              >
                Upload Document
              </label>
              <input
                id='documentFile'
                type='file'
                onChange={handleFileChange}
                className='w-full text-sm text-gray-500 file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200'
              />
            </div>
            {preview && (
              <div className='mt-4'>
                <p className='text-sm font-medium text-gray-700'>Preview:</p>
                <img
                  src={preview}
                  alt='Preview'
                  className='mt-2 w-full h-auto object-cover rounded-md border border-gray-300'
                />
              </div>
            )}
            {documentFile && !preview && (
              <div className='mt-4'>
                <p className='text-sm font-medium text-gray-700'>
                  Selected File:
                </p>
                <p className='text-gray-500'>{documentFile.name}</p>
              </div>
            )}
            <button
              type='submit'
              className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
