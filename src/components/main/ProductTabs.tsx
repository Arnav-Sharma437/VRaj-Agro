'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ProductTabsProps {
  description?: string;
  specifications?: Record<string, string>;
  applications?: string[];
}

export default function ProductTabs({
  description = '',
  specifications = {},
  applications = [],
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'applications'>('description');

  const specPairs = Object.entries(specifications);
  const hasSpecs = specPairs.length > 0;
  const hasApps = applications.length > 0;

  const tabs = [
    { id: 'description', label: 'Description', show: !!description },
    { id: 'specifications', label: 'Specifications', show: hasSpecs },
    { id: 'applications', label: 'Applications', show: hasApps },
  ] as const;

  const visibleTabs = tabs.filter((t) => t.show);

  if (visibleTabs.length === 0) return null;

  return (
    <div className="w-full">
      {/* Tabs list */}
      <div className="flex border-b border-gray-250 mb-6">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-all focus:outline-none -mb-[2px] ${
              activeTab === tab.id
                ? 'border-[#cc0000] text-[#cc0000]'
                : 'border-transparent text-gray-500 hover:text-[#cc0000]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panel contents */}
      <div className="py-2">
        {activeTab === 'description' && description && (
          <div className="prose max-w-none text-[#555] text-sm leading-relaxed whitespace-pre-wrap">
            {description}
          </div>
        )}

        {activeTab === 'specifications' && hasSpecs && (
          <div className="overflow-hidden border border-gray-200 rounded-xl max-w-2xl bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <tbody className="divide-y divide-gray-200">
                {specPairs.map(([key, val], idx) => (
                  <tr
                    key={key}
                    className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}
                  >
                    <td className="px-6 py-4 font-bold text-[#1a1a1a] w-1/3 bg-gray-50/30">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-[#555]">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'applications' && hasApps && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {applications.map((app, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-[#555] leading-relaxed">
                <span className="p-1 rounded bg-red-50 text-[#cc0000] shrink-0 mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </span>
                <span>{app}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
