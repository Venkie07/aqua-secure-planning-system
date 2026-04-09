import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { findProjectByCompanyAndLocation } from '../utils/auth';

const ExistingProject = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setSearched(true);

    if (!companyId.trim() || !locationQuery.trim()) {
      setError('Please enter both Company ID and Location');
      return;
    }

    // TODO: Replace with backend API call
    // const response = await fetch(`/api/projects/search?companyId=${companyId}&location=${locationQuery}`);
    // const data = await response.json();

    const foundProject = findProjectByCompanyAndLocation(companyId, locationQuery);

    if (foundProject) {
      setProject(foundProject);
    } else {
      setError('Project not found');
      setProject(null);
    }
  };

  const handleViewPrediction = () => {
    navigate(`/prediction`, { state: { projectData: project } });
  };

  return (
    <div className="min-h-screen text-slate-900">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="pt-20 sm:pt-24 px-4 sm:px-6 md:px-10 lg:px-20 pb-8 sm:pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">View Existing Project</h2>
            <p className="text-sm sm:text-base text-slate-600">Search for project details and risk analysis</p>
          </div>

          {/* Search Form */}
          <Card className="mb-6 sm:mb-8">
            <form onSubmit={handleSearch} className="space-y-3 sm:space-y-4">
              <Input
                label="Company ID"
                type="text"
                placeholder="e.g., COMP001"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value.toUpperCase())}
                error={searched && error ? error : ''}
              />

              <Input
                label="Location"
                type="text"
                placeholder="e.g., New Delhi"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 text-sm sm:text-base"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 text-sm sm:text-base"
                  onClick={() => navigate('/dashboard')}
                >
                  Back
                </Button>
              </div>
            </form>
          </Card>

          {/* Project Details */}
          {project && (
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <Card>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Project Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <p className="text-slate-500 text-sm">Project ID</p>
                    <p className="text-slate-900 font-semibold">{project.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Company Name</p>
                    <p className="text-slate-900 font-semibold">{project.companyName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Company Type</p>
                    <p className="text-slate-900 font-semibold">{project.type}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Construction Type</p>
                    <p className="text-slate-900 font-semibold">{project.constructionType}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Location</p>
                    <p className="text-slate-900 font-semibold">
                      {project.latitude.toFixed(4)}, {project.longitude.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Status</p>
                    <p className={`font-semibold ${project.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {project.status}
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Requirements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <p className="text-slate-500 text-sm">Water Requirement</p>
                    <p className="text-slate-900 font-semibold">{project.waterRequirement} m³/day</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Area Needed</p>
                    <p className="text-slate-900 font-semibold">{project.areaNeeded} hectares</p>
                  </div>
                </div>
              </Card>

              <Button
                onClick={handleViewPrediction}
                variant="primary"
                className="w-full"
              >
                View Risk Analysis & Prediction 📊
              </Button>
            </div>
          )}

          {/* No Results */}
          {searched && !project && !error && (
            <Card>
              <p className="text-slate-600 text-center">Enter both Company ID and Location to search</p>
            </Card>
          )}

          {/* Available Projects */}
          <Card className="mt-8 sm:mt-10 md:mt-12">
            <h3 className="text-lg sm:text-base md:text-lg font-bold text-slate-900 mb-4">Available Projects</h3>
            <div className="space-y-2 text-sm">
              <p className="text-primary-300 font-semibold">COMP001 | New Delhi</p>
              <p className="text-primary-300 font-semibold">COMP002 | Mumbai</p>
              <p className="text-primary-300 font-semibold">COMP003 | Chennai</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExistingProject;
