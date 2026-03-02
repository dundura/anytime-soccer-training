'use client';

import { useState, useMemo } from 'react';

interface AdminPageEntry {
  type: 'Static' | 'Page' | 'Blog';
  title: string;
  url: string;
  date: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '--';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '--';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

type SortField = 'type' | 'title' | 'url' | 'date';

export default function AdminTable({ entries }: { entries: AdminPageEntry[] }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Static' | 'Page' | 'Blog'>('All');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (typeFilter !== 'All' && e.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return e.title.toLowerCase().includes(q) || e.url.toLowerCase().includes(q);
      }
      return true;
    });
  }, [entries, search, typeFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'date') {
        cmp = (new Date(a.date || '1970').getTime()) - (new Date(b.date || '1970').getTime());
      } else {
        cmp = (a[sortField] || '').localeCompare(b[sortField] || '');
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const typeBadge = (type: string) => {
    const styles: Record<string, string> = {
      Static: 'bg-navy text-white',
      Page: 'bg-navy/10 text-navy',
      Blog: 'bg-red text-white',
    };
    return (
      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${styles[type]}`}>
        {type}
      </span>
    );
  };

  const arrow = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' \u25B2' : ' \u25BC';
  };

  const staticCount = entries.filter((e) => e.type === 'Static').length;
  const pageCount = entries.filter((e) => e.type === 'Page').length;
  const blogCount = entries.filter((e) => e.type === 'Blog').length;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-navy placeholder:text-gray focus:outline-none focus:border-red"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
          className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy bg-white focus:outline-none focus:border-red cursor-pointer"
        >
          <option value="All">All Types ({entries.length})</option>
          <option value="Static">Static ({staticCount})</option>
          <option value="Page">Pages ({pageCount})</option>
          <option value="Blog">Blog ({blogCount})</option>
        </select>
      </div>

      <p className="text-sm text-gray mb-3">{sorted.length} results</p>

      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-navy text-white text-left text-xs uppercase tracking-wider">
                {(['type', 'title', 'url', 'date'] as SortField[]).map((field) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    className="px-4 py-3 cursor-pointer hover:bg-navy-light transition-colors select-none whitespace-nowrap"
                  >
                    {field === 'url' ? 'URL' : field.charAt(0).toUpperCase() + field.slice(1)}
                    {arrow(field)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry) => (
                <tr key={entry.url} className="border-b border-gray-100 hover:bg-[#f8fafc] text-sm">
                  <td className="px-4 py-3">{typeBadge(entry.type)}</td>
                  <td className="px-4 py-3 font-medium text-navy">{entry.title}</td>
                  <td className="px-4 py-3">
                    <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-navy hover:text-red underline break-all">
                      {entry.url}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray whitespace-nowrap">{formatDate(entry.date)}</td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray">No pages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
