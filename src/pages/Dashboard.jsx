import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { getAllProjects, getMapLocations } from '../utils/auth';

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const mapLocations = getMapLocations();
  const projects = getAllProjects();

  const createCustomIcon = (type) => {
    const colors = {
      office: '#3385ff',
      industry: '#f97316',
      project: '#06b6d4'
    };

    return L.divIcon({
      html: `
        <div style="
          background-color: ${colors[type]};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          ${type === 'office' ? 'O' : type === 'industry' ? 'I' : 'P'}
        </div>
      `,
      iconSize: [30, 30],
      className: 'custom-marker'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="pt-24 px-4 pb-24 m-2">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2 p-3">Project Map</h2>
            <p className="text-gray-300 p-2">View existing offices, industries, and project locations</p>
          </div>

          {/* Map Container */}
          <div className="card p-4 mb-6 overflow-hidden" style={{ height: '500px' }}>
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={4}
              style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap contributors'
              />

              {/* Office Markers */}
              {mapLocations.offices.map((office) => (
                <Marker
                  key={office.id}
                  position={[office.latitude, office.longitude]}
                  icon={createCustomIcon('office')}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-sm">{office.name}</h4>
                      <p className="text-xs text-gray-600">{office.description}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Industry Markers */}
              {mapLocations.industries.map((industry) => (
                <Marker
                  key={industry.id}
                  position={[industry.latitude, industry.longitude]}
                  icon={createCustomIcon('industry')}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-sm">{industry.name}</h4>
                      <p className="text-xs text-gray-600">{industry.description}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Project Markers */}
              {projects.map((project) => (
                <Marker
                  key={project.id}
                  position={[project.latitude, project.longitude]}
                  icon={createCustomIcon('project')}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-sm">{project.companyName}</h4>
                      <p className="text-xs text-gray-600">{project.id} | {project.type}</p>
                      <p className="text-xs text-gray-600">{project.location}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">Offices</h3>
              <p className="text-gray-300 text-sm">{mapLocations.offices.length} locations</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">Industries</h3>
              <p className="text-gray-300 text-sm">{mapLocations.industries.length} locations</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">Projects</h3>
              <p className="text-gray-300 text-sm">{projects.length} locations</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="fixed bottom-8 right-8 flex flex-col gap-4">
            <Button
              onClick={() => navigate('/new-project')}
              variant="primary"
              className="rounded-full px-6 py-3 shadow-lg"
            >
              New Project
            </Button>
            <Button
              onClick={() => navigate('/existing-project')}
              variant="secondary"
              className="rounded-full px-6 py-3 shadow-lg"
            >
              View Existing Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
