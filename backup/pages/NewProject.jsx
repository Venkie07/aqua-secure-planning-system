import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { saveProjectToLocalStorage } from '../utils/auth';

const NewProject = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyId: '',
    location: '',
    companyType: 'Manufacturing',
    latitude: '',
    longitude: '',
    waterRequirement: '',
    areaNeeded: '',
    constructionType: 'Industrial'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Store project data
    const newProject = {
      ...formData,
      id: `PROJ${Date.now().toString().slice(-6)}`,
      type: formData.companyType,
      createdDate: new Date().toISOString(),
      status: 'Active'
    };

    // TODO: Replace with backend API call
    // const response = await fetch('/api/projects', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newProject)
    // });

    saveProjectToLocalStorage(newProject);

    setTimeout(() => {
      navigate(`/prediction`, { state: { projectData: newProject } });
    }, 500);
  };

  return (
    <div className="min-h-screen   text-slate-900">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="pt-20 sm:pt-24 px-4 sm:px-6 md:px-10 lg:px-20 pb-8 sm:pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">Create New Project</h2>
            <p className="text-sm sm:text-base text-slate-600">Enter project details to analyze water risk</p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Input
                  label="Company Name"
                  type="text"
                  name="companyName"
                  placeholder="e.g., BlueRiver Industries"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Company ID"
                  type="text"
                  name="companyId"
                  placeholder="e.g., COMP101"
                  value={formData.companyId}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Location"
                type="text"
                name="location"
                placeholder="e.g., Pune"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Company Type */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                    Company Type
                  </label>
                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Water Treatment">Water Treatment</option>
                    <option value="Textile">Textile</option>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Chemical">Chemical</option>
                  </select>
                </div>

                {/* Construction Type */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                    Construction Type
                  </label>
                  <select
                    name="constructionType"
                    value={formData.constructionType}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="Industrial">Industrial</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Farm">Farm</option>
                    <option value="Facility">Facility</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Latitude */}
                <Input
                  label="Latitude"
                  type="number"
                  name="latitude"
                  placeholder="e.g., 28.6139"
                  step="0.0001"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                />

                {/* Longitude */}
                <Input
                  label="Longitude"
                  type="number"
                  name="longitude"
                  placeholder="e.g., 77.209"
                  step="0.0001"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Water Requirement */}
                <Input
                  label="Water Requirement (m³/day)"
                  type="number"
                  name="waterRequirement"
                  placeholder="e.g., 1500"
                  value={formData.waterRequirement}
                  onChange={handleChange}
                  required
                />

                {/* Area Needed */}
                <Input
                  label="Area Needed (hectares)"
                  type="number"
                  name="areaNeeded"
                  placeholder="e.g., 50"
                  value={formData.areaNeeded}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 text-sm sm:text-base"
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze & Predict'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 text-sm sm:text-base"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              </div>

              <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs sm:text-sm text-slate-600">
                <p className="font-semibold mb-1 sm:mb-2">Tip:</p>
                <p>Use coordinates from the map on the Dashboard to find the best location for your project.</p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
