import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Card from '../components/Card';
import { getRiskDataByProjectId } from '../utils/auth';

const PredictionDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2030);
  const [selectedParameter, setSelectedParameter] = useState('rainfall');

  const projectData = location.state?.projectData;
  const projectId = projectData?.id || 'PROJ001';
  const riskData = getRiskDataByProjectId(projectId);

  if (!riskData) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Card>
          <p className="text-gray-400 mb-4">No risk data available. Using default PROJ001 data.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const isFeasible = riskData.feasibility === 'Feasible';
  const rainfallData = riskData.rainfallTrend.filter((row) => row.year <= selectedYear);
  const groundwaterData = riskData.groundwaterLevel.filter((row) => row.year <= selectedYear);
  const floodRiskData = riskData.floodRiskIndex.filter((row) => row.year <= selectedYear);

  const parameterMap = {
    rainfall: {
      title: 'Rainfall Trend',
      value: `${rainfallData[rainfallData.length - 1]?.rainfall ?? 0} mm`,
      description: 'Annual rainfall forecast at selected horizon',
      tone: 'text-cyan-300'
    },
    groundwater: {
      title: 'Groundwater Level',
      value: `${groundwaterData[groundwaterData.length - 1]?.depth ?? 0} m`,
      description: 'Projected groundwater extraction depth',
      tone: 'text-amber-300'
    },
    flood: {
      title: 'Flood Risk Index',
      value: `${floodRiskData[floodRiskData.length - 1]?.risk ?? 0}/100`,
      description: 'Estimated flood risk severity',
      tone: 'text-rose-300'
    }
  };

  const selectedSummary = parameterMap[selectedParameter];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="pt-24 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Risk Analysis Report</h2>
              <p className="text-gray-400">Project: {projectId}</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate('/dashboard')}
            >
              Back
            </Button>
          </div>

          {/* Feasibility Card */}
          <Card className={`mb-6 border-2 ${isFeasible ? 'border-green-500 border-opacity-50' : 'border-red-500 border-opacity-50'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Feasibility Status</h3>
                <p className={`text-3xl font-bold ${isFeasible ? 'text-green-400' : 'text-red-400'}`}>
                  {isFeasible ? '✓ FEASIBLE' : '✗ NOT FEASIBLE'}
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-sm text-gray-400 mb-2">Risk Score</h3>
                <div className={`text-4xl font-bold ${riskData.riskScore < 50 ? 'text-green-400' : riskData.riskScore < 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {riskData.riskScore}/100
                </div>
              </div>
            </div>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="input-field"
                >
                  <option value={2025}>2025</option>
                  <option value={2030}>2030</option>
                  <option value={2040}>2040</option>
                  <option value={2050}>2050</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Parameter
                </label>
                <select
                  value={selectedParameter}
                  onChange={(e) => setSelectedParameter(e.target.value)}
                  className="input-field"
                >
                  <option value="rainfall">Rainfall Trend</option>
                  <option value="groundwater">Groundwater Level</option>
                  <option value="flood">Flood Risk Index</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <p className="text-sm text-blue-200/80 mb-1">Selected Parameter</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedSummary.title}</h3>
                <p className="text-sm text-blue-100/80">{selectedSummary.description}</p>
              </div>
              <p className={`text-3xl font-bold ${selectedSummary.tone}`}>{selectedSummary.value}</p>
            </div>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Rainfall Trend */}
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">📈 Rainfall Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rainfallData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="year" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a2f66',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rainfall"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Groundwater Level */}
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">💧 Groundwater Level</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={groundwaterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="year" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a2f66',
                      border: '1px solid #06b6d4',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="depth"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Flood Risk Chart */}
          <Card className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4">🌊 Flood Risk Index</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={floodRiskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a2f66',
                    border: '1px solid #ef4444',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="risk"
                  fill="#ef4444"
                  stroke="#dc2626"
                  strokeWidth={2}
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Risk Factor Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <h4 className="text-sm text-gray-400 mb-2">🌧️ Rainfall Variability</h4>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-cyan-400">
                  {riskData.factors.rainfallVariability}
                </span>
                <span className="text-gray-400">/100</span>
              </div>
              <div className="mt-3 bg-dark-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-accent"
                  style={{ width: `${riskData.factors.rainfallVariability}%` }}
                />
              </div>
            </Card>

            <Card>
              <h4 className="text-sm text-gray-400 mb-2">🌊 Flood Risk</h4>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-orange-400">
                  {riskData.factors.floodRisk}
                </span>
                <span className="text-gray-400">/100</span>
              </div>
              <div className="mt-3 bg-dark-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${riskData.factors.floodRisk}%` }}
                />
              </div>
            </Card>

            <Card>
              <h4 className="text-sm text-gray-400 mb-2">💧 Groundwater Depletion</h4>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-yellow-400">
                  {riskData.factors.groundwaterDepletion}
                </span>
                <span className="text-gray-400">/100</span>
              </div>
              <div className="mt-3 bg-dark-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{ width: `${riskData.factors.groundwaterDepletion}%` }}
                />
              </div>
            </Card>
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Explanation */}
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">📝 Analysis</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {riskData.explanation}
              </p>
              <p className="text-sm text-blue-100/75">
                Projection year considered: {selectedYear}
              </p>
            </Card>

            {/* Recommendations */}
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">💡 Recommendations</h3>
              <ul className="space-y-2">
                {riskData.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-2 text-gray-300 text-sm">
                    <span className="text-primary-400 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Alternative Locations */}
          <Card>
            <h3 className="text-lg font-bold text-white mb-4">🗺️ Alternative Locations</h3>
            <div className="space-y-3">
              {riskData.alternativeLocations.map((location, idx) => (
                <div key={idx} className="p-3 bg-dark-700 rounded-lg border border-dark-600 hover:border-primary-500 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{location.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${location.feasibility === 'Feasible' ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'}`}>
                      {location.feasibility}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </p>
                  <div className="flex gap-4">
                    <span className="text-xs text-gray-500">Risk Score: <span className="text-white font-semibold">{location.riskScore}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Export Button */}
          <div className="mt-8 flex gap-4">
            <Button variant="primary" className="flex-1">
              Download Report
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionDashboard;
