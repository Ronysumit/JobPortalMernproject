import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Job<span className="text-[#6A38C2]">Portal</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
              Connecting talented people with great career opportunities.
              Discover jobs, build your professional profile, and take the
              next step in your career journey.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-gray-400">
                Your career, your next opportunity.
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
              Platform
            </h2>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>Job Search</li>
              <li>Career Profiles</li>
              <li>Job Applications</li>
              <li>Recruitment Solutions</li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
              For Recruiters
            </h2>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>Post Job Opportunities</li>
              <li>Find Qualified Candidates</li>
              <li>Manage Applications</li>
              <li>Build Your Team</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>

            <p className="text-sm text-gray-500">
              Built with React & MERN Stack
            </p>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer