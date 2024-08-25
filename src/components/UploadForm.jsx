import { useState } from "react";
import { FaUserPlus, FaUserMinus, FaFileAudio, FaMicrophone, FaInfoCircle, FaSquare, FaCheckSquare } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";

function UploadForm() {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [participants, setParticipants] = useState([{ name: "", email: "" }]);
  const [audioFile, setAudioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    const meetingInfo = {
      title: meetingTitle,
      users: participants,
    }
    formData.append("meeting_info", JSON.stringify(meetingInfo));
    formData.append("audio", audioFile);

    try {
      const response = await fetch(
        "https://minutemind-api-production.up.railway.app/api/summarize",
        {
          method: "POST",
          headers: {
            "Accept": "application/json", // This is fine to keep
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Failed to submit: ${response.status} - ${errorDetails}`);
        alert(`Error: ${response.status} - ${response.statusText}`);
      } else {
        const resp = await response.json();
        setData(resp);
        console.log("Response:", resp);
        // alert("Meeting audio processed successfully! Check your email for the summary and action items.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    } else {
      setAudioFile(null);
      alert("Please upload a valid audio file.");
    }
  };

  const addParticipant = () => {
    setParticipants([...participants, { name: "", email: "" }]);
  };

  const removeParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const updateParticipant = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
  };
  return (
    data ? (
      <MeetingSummary data={data} />
    ) : (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <PacmanLoader size={28} color="#EC4899" />
          </div>
        )}

        <div className="max-w-4xl w-full space-y-8 bg-white bg-opacity-10 p-10 rounded-xl shadow-2xl backdrop-filter backdrop-blur-lg">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white mb-2">MinuteMind</h1>
            <p className="text-xl text-pink-300">Transform your meetings into actionable insights</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="meetingTitle" className="block text-sm font-medium text-pink-200">
                Meeting Title
              </label>
              <input
                id="meetingTitle"
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Enter meeting title"
                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-white placeholder-pink-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-200 mb-2">Participants</label>
              {participants.map((participant, index) => (
                <div key={index} className="md:flex space-y-4 md:space-y-0 md:items-center md:space-x-4 mb-4">
                  <div className="w-full">
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => updateParticipant(index, "name", e.target.value)}
                      placeholder="Name"
                      className="w-full flex-1 px-3 py-2 bg-white bg-opacity-20 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-white placeholder-pink-200"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-4 w-full">
                    <input
                      type="email"
                      value={participant.email}
                      onChange={(e) => updateParticipant(index, "email", e.target.value)}
                      placeholder="Email"
                      className=" flex-1 px-3 py-2 bg-white bg-opacity-20 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-white placeholder-pink-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className="p-2 bg-red-500 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none transition duration-150 ease-in-out"
                      aria-label="Remove participant"
                    >
                      <FaUserMinus />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addParticipant}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out"
              >
                <FaUserPlus className="mr-2" /> Add Participant
              </button>
            </div>

            <div>
              <label htmlFor="audioFile" className="block text-sm font-medium text-pink-200 mb-2">
                Upload Meeting Audio
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-pink-300 border-dashed rounded-md bg-white bg-opacity-10">
                <div className="space-y-1 text-center">
                  <FaFileAudio className="mx-auto h-12 w-12 text-pink-300" />
                  <div className="flex text-sm text-pink-200">
                    <label
                      htmlFor="audioFile"
                      className="relative cursor-pointer bg-pink-600 rounded-md font-medium text-white hover:bg-pink-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500 px-3 py-2"
                    >
                      <span>Upload audio file</span>
                      <input id="audioFile" type="file" accept="audio/*" className="sr-only" onChange={handleFileChange} required />
                    </label>
                    <p className="pl-1 pt-2">or drag and drop</p>
                  </div>
                  <p className="text-xs text-pink-200">MP3, WAV, M4A up to 50MB</p>
                </div>
              </div>
            </div>

            {audioFile && (
              <div className="mt-4">
                <p className="text-sm font-medium text-pink-200">Selected Audio File:</p>
                <p className="text-pink-300">{audioFile.name}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out transform hover:scale-105"
            >
              <FaMicrophone className="mr-2" /> Process Meeting Audio
            </button>
          </form>

          <div className="mt-8 border-t border-pink-300 border-opacity-50 pt-6">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <FaInfoCircle className="mr-2 text-pink-300" /> How it works:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-pink-200">
              <li>Upload your meeting audio file</li>
              <li>Our AI processes the audio and generates a detailed summary</li>
              <li>Action items are created and assigned to each participant</li>
              <li>Receive the summary and action items via email</li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
}

const MeetingSummary = ({ data }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Meeting Summary</h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">{data.summary}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.action_items.map((item, index) => (
          <div key={index} className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-pink-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">{item.user.name}</h3>
              <p className="text-pink-200">{item.user.email}</p>
            </div>
            <div className="px-6 py-4">
              <ul className="space-y-2">
                {item.action_items.split('\n').filter(line => line.trim().startsWith('- [')).map((action, actionIndex) => (
                  <li key={actionIndex} className="flex items-start">
                    {action.includes('[ ]') ? (
                      <FaSquare className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                    ) : (
                      <FaCheckSquare className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    )}
                    <span className="text-gray-700">{action.replace(/- \[[ x]\] /, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UploadForm;