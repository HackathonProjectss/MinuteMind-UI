import { useState } from "react";
import UploadForm from "./components/UploadForm";
import { FaMicrophone, FaClipboardList, FaRocket } from "react-icons/fa";
import Logo from "../src/assets/images/logo.png";

function App() {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
          <a href='/'>
            <div className='flex gap-3 justify-center items-center cursor-pointer'>
              <img src={Logo} alt='logo' className='w-10  h-auto' />
              <h1 className='md:text-3xl text-2xl font-bold text-indigo-600'>
                MinuteMind
              </h1>
            </div>
          </a>
          <button
            onClick={() => setShowUpload(true)}
            className='px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Upload Meeting
          </button>
        </div>
      </header>

      <main>
        {!showUpload ? (
          <HeroSection onUploadClick={() => setShowUpload(true)} />
        ) : (
          <UploadForm onClose={() => setShowUpload(false)} />
        )}
      </main>
    </div>
  );
}

function HeroSection({ onUploadClick }) {
  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700'>
      <div className='max-w-7xl mx-auto'>
        <div className='relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8'>
          <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28'>
            <div className='text-center'>
              <h1 className='text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Transform Your Meetings</span>{" "}
                <span className='block text-pink-400 xl:inline'>
                  Into Actionable Insights
                </span>
              </h1>
              <p className='mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl'>
                MinuteMind uses AI to convert your meeting audio into
                comprehensive summaries and personalized action items for each
                participant.
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center'>
                <div className='rounded-md shadow'>
                  <button
                    onClick={onUploadClick}
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out transform hover:scale-105'
                  >
                    <FaMicrophone className='mr-2' /> Get Started
                  </button>
                </div>
              </div>
            </div>
          </main>
          <div className='mt-10'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='pt-6'>
                <div className='flow-root bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center p-3 bg-pink-500 rounded-md shadow-lg'>
                        <FaMicrophone
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-white tracking-tight'>
                      AI-Powered Transcription
                    </h3>
                    <p className='mt-5 text-base text-gray-400'>
                      Our advanced AI accurately transcribes your meeting audio,
                      capturing every important detail.
                    </p>
                  </div>
                </div>
              </div>
              <div className='pt-6'>
                <div className='flow-root bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg'>
                        <FaClipboardList
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-white tracking-tight'>
                      Smart Summaries
                    </h3>
                    <p className='mt-5 text-base text-gray-400'>
                      Get concise, intelligent summaries that highlight key
                      points and decisions from your meetings.
                    </p>
                  </div>
                </div>
              </div>
              <div className='pt-6'>
                <div className='flow-root bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg'>
                        <FaRocket
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-white tracking-tight'>
                      Personalized Action Items
                    </h3>
                    <p className='mt-5 text-base text-gray-400'>
                      Automatically generate and assign action items to team
                      members, ensuring follow-through on decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute inset-y-0 right-0 w-full sm:w-3/4 lg:w-1/2'>
        <svg
          className='absolute inset-0 h-full w-full'
          preserveAspectRatio='xMinYMin slice'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient
              id='bg-gradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='rgba(129, 140, 248, 0.2)' />
              <stop offset='100%' stopColor='rgba(236, 72, 153, 0.2)' />
            </linearGradient>
          </defs>
          <path
            d='M500,0 L1000,0 L1000,1000 L500,1000 Q400,750 400,500 Q400,250 500,0'
            fill='url(#bg-gradient)'
          />
        </svg>
      </div>
    </div>
  );
}

export default App;
