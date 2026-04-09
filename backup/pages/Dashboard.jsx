import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { getAllProjects, getMapLocations } from '../utils/auth';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // ✅ NEW
  const navigate = useNavigate();

  const mapLocations = getMapLocations();
  const projects = getAllProjects();

  return (
    <div className="min-h-screen text-slate-900">
      
      {/* Hide navbar when expanded */}
      {!isExpanded && (
        <>
          <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      )}

      <div className={`${isExpanded ? '' : 'pt-20 sm:pt-24 px-4 sm:px-6 md:px-10 lg:px-20 pb-24'}`}>
        <div className={`${isExpanded ? '' : 'max-w-7xl mx-auto'}`}>

          {/* Hide header when expanded */}
          {!isExpanded && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Project Map
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 sm:mt-2">
                View existing offices, industries, and project locations
              </p>
            </div>
          )}

          {/* Map Container */}
          <div
            className={`card p-0 overflow-hidden relative transition-all duration-300 ${
              isExpanded
                ? 'fixed top-0 left-0 w-screen h-screen z-50 rounded-none'
                : 'mb-6 sm:mb-8'
            }`}
            style={!isExpanded ? { height: 'clamp(400px, 75vh, 800px)' } : {}}
          >

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-grey text-white px-3 py-1 rounded-lg text-sm shadow"
            >
              {isExpanded ? '✖' : '⛶'}
            </button>

            {/* Iframe */}
            <iframe title="Waterbodies GIS Dashboard" src="https://balaji2424-sys.github.io/waterbodies-gis-dashboard/" className="w-full h-full border-0" loading="lazy" allowFullScreen />
          </div>

          {/* Hide rest when expanded */}
          {!isExpanded && (
            <>
              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8">
                <div className="card">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Offices</h3>
                  <p className="text-slate-600 text-sm">
                    {mapLocations.offices.length} locations
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Industries</h3>
                  <p className="text-slate-600 text-sm">
                    {mapLocations.industries.length} locations
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Projects</h3>
                  <p className="text-slate-600 text-sm">
                    {projects.length} locations
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex flex-col gap-3 sm:gap-4">
                <Button
                  onClick={() => navigate('/new-project')}
                  variant="primary"
                  className="rounded-lg px-5 sm:px-6 py-3 shadow-lg text-sm sm:text-base"
                >
                  New Project
                </Button>

                <Button
                  onClick={() => navigate('/existing-project')}
                  variant="secondary"
                  className="rounded-lg px-5 sm:px-6 py-3 shadow-lg text-sm sm:text-base"
                >
                  View Project
                </Button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;