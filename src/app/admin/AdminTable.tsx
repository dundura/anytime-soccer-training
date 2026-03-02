'use client';

import { useState, useMemo, useEffect } from 'react';

interface AdminPageEntry {
  type: 'Static' | 'Page' | 'Blog';
  title: string;
  url: string;
  date: string;
}

interface ImageEntry {
  url: string;
  sources: string[];
  domain: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '--';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '--';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

type SortField = 'type' | 'title' | 'url' | 'date';
type ImgSortField = 'url' | 'domain' | 'sources';

const HIDDEN_PAGES_KEY = 'ast-admin-hidden-pages';
const HIDDEN_IMAGES_KEY = 'ast-admin-hidden-images';

function loadHidden(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = localStorage.getItem(key);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveHidden(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export default function AdminTable({ entries, images }: { entries: AdminPageEntry[]; images: ImageEntry[] }) {
  const [tab, setTab] = useState<'pages' | 'images'>('pages');

  // --- Pages state ---
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Static' | 'Page' | 'Blog'>('All');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [hiddenPages, setHiddenPages] = useState<Set<string>>(new Set());
  const [showHiddenPages, setShowHiddenPages] = useState(false);

  // --- Images state ---
  const [imgSearch, setImgSearch] = useState('');
  const [imgDomainFilter, setImgDomainFilter] = useState('All');
  const [imgSortField, setImgSortField] = useState<ImgSortField>('url');
  const [imgSortDir, setImgSortDir] = useState<'asc' | 'desc'>('asc');
  const [hiddenImages, setHiddenImages] = useState<Set<string>>(new Set());
  const [showHiddenImages, setShowHiddenImages] = useState(false);

  useEffect(() => {
    setHiddenPages(loadHidden(HIDDEN_PAGES_KEY));
    setHiddenImages(loadHidden(HIDDEN_IMAGES_KEY));
  }, []);

  // --- Pages logic ---
  const toggleHidePage = (url: string) => {
    setHiddenPages((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url); else next.add(url);
      saveHidden(HIDDEN_PAGES_KEY, next);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (typeFilter !== 'All' && e.type !== typeFilter) return false;
      const isHidden = hiddenPages.has(e.url);
      if (showHiddenPages && !isHidden) return false;
      if (!showHiddenPages && isHidden) return false;
      if (search) {
        const q = search.toLowerCase();
        return e.title.toLowerCase().includes(q) || e.url.toLowerCase().includes(q);
      }
      return true;
    });
  }, [entries, search, typeFilter, hiddenPages, showHiddenPages]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'date') {
        cmp = new Date(a.date || '1970').getTime() - new Date(b.date || '1970').getTime();
      } else {
        cmp = (a[sortField] || '').localeCompare(b[sortField] || '');
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
  };

  // --- Images logic ---
  const toggleHideImage = (url: string) => {
    setHiddenImages((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url); else next.add(url);
      saveHidden(HIDDEN_IMAGES_KEY, next);
      return next;
    });
  };

  const domains = useMemo(() => {
    const d = new Set(images.map((i) => i.domain));
    return ['All', ...Array.from(d).sort()];
  }, [images]);

  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      if (imgDomainFilter !== 'All' && img.domain !== imgDomainFilter) return false;
      const isHidden = hiddenImages.has(img.url);
      if (showHiddenImages && !isHidden) return false;
      if (!showHiddenImages && isHidden) return false;
      if (imgSearch) {
        const q = imgSearch.toLowerCase();
        return img.url.toLowerCase().includes(q) || img.sources.some((s) => s.toLowerCase().includes(q));
      }
      return true;
    });
  }, [images, imgSearch, imgDomainFilter, hiddenImages, showHiddenImages]);

  const sortedImages = useMemo(() => {
    return [...filteredImages].sort((a, b) => {
      let cmp = 0;
      if (imgSortField === 'sources') {
        cmp = a.sources.length - b.sources.length;
      } else {
        cmp = (a[imgSortField] || '').localeCompare(b[imgSortField] || '');
      }
      return imgSortDir === 'asc' ? cmp : -cmp;
    });
  }, [filteredImages, imgSortField, imgSortDir]);

  const handleImgSort = (field: ImgSortField) => {
    if (imgSortField === field) setImgSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setImgSortField(field); setImgSortDir('asc'); }
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

  const arrow = (field: string, activeField: string, dir: 'asc' | 'desc') => {
    if (activeField !== field) return '';
    return dir === 'asc' ? ' \u25B2' : ' \u25BC';
  };

  const staticCount = entries.filter((e) => e.type === 'Static').length;
  const pageCount = entries.filter((e) => e.type === 'Page').length;
  const blogCount = entries.filter((e) => e.type === 'Blog').length;

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-navy/5 p-1 rounded-xl w-fit">
        <button
          onClick={() => setTab('pages')}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'pages' ? 'bg-navy text-white' : 'text-navy hover:bg-navy/10'}`}
        >
          Pages ({entries.length})
        </button>
        <button
          onClick={() => setTab('images')}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'images' ? 'bg-navy text-white' : 'text-navy hover:bg-navy/10'}`}
        >
          Images ({images.length})
        </button>
      </div>

      {/* ===== PAGES TAB ===== */}
      {tab === 'pages' && (
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
            <button
              onClick={() => setShowHiddenPages(!showHiddenPages)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${showHiddenPages ? 'bg-red text-white border-red' : 'border-gray-200 text-navy bg-white hover:border-red'}`}
            >
              {showHiddenPages ? `Hidden (${hiddenPages.size})` : `Show Hidden (${hiddenPages.size})`}
            </button>
          </div>

          <p className="text-sm text-gray mb-3">{sorted.length} results</p>

          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy text-white text-left text-xs uppercase tracking-wider">
                    <th className="px-3 py-3 w-10"></th>
                    {(['type', 'title', 'url', 'date'] as SortField[]).map((field) => (
                      <th
                        key={field}
                        onClick={() => handleSort(field)}
                        className="px-4 py-3 cursor-pointer hover:bg-navy-light transition-colors select-none whitespace-nowrap"
                      >
                        {field === 'url' ? 'URL' : field.charAt(0).toUpperCase() + field.slice(1)}
                        {arrow(field, sortField, sortDir)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((entry) => (
                    <tr key={entry.url} className={`border-b border-gray-100 hover:bg-[#f8fafc] text-sm ${showHiddenPages ? 'opacity-60' : ''}`}>
                      <td className="px-3 py-3">
                        <button
                          onClick={() => toggleHidePage(entry.url)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray hover:text-red"
                          title={showHiddenPages ? 'Unhide' : 'Hide'}
                        >
                          {showHiddenPages ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                          )}
                        </button>
                      </td>
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
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-gray">No pages found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ===== IMAGES TAB ===== */}
      {tab === 'images' && (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by URL or page source..."
                value={imgSearch}
                onChange={(e) => setImgSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-navy placeholder:text-gray focus:outline-none focus:border-red"
              />
            </div>
            <select
              value={imgDomainFilter}
              onChange={(e) => setImgDomainFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy bg-white focus:outline-none focus:border-red cursor-pointer"
            >
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? `All Domains (${images.length})` : `${d} (${images.filter((i) => i.domain === d).length})`}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowHiddenImages(!showHiddenImages)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${showHiddenImages ? 'bg-red text-white border-red' : 'border-gray-200 text-navy bg-white hover:border-red'}`}
            >
              {showHiddenImages ? `Hidden (${hiddenImages.size})` : `Show Hidden (${hiddenImages.size})`}
            </button>
          </div>

          <p className="text-sm text-gray mb-3">{sortedImages.length} results</p>

          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy text-white text-left text-xs uppercase tracking-wider">
                    <th className="px-3 py-3 w-10"></th>
                    <th className="px-2 py-3 w-12">Preview</th>
                    {(['url', 'domain', 'sources'] as ImgSortField[]).map((field) => (
                      <th
                        key={field}
                        onClick={() => handleImgSort(field)}
                        className="px-4 py-3 cursor-pointer hover:bg-navy-light transition-colors select-none whitespace-nowrap"
                      >
                        {field === 'sources' ? 'Used On' : field.charAt(0).toUpperCase() + field.slice(1)}
                        {arrow(field, imgSortField, imgSortDir)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedImages.map((img) => (
                    <tr key={img.url} className={`border-b border-gray-100 hover:bg-[#f8fafc] text-sm align-top ${showHiddenImages ? 'opacity-60' : ''}`}>
                      <td className="px-3 py-3">
                        <button
                          onClick={() => toggleHideImage(img.url)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray hover:text-red"
                          title={showHiddenImages ? 'Unhide' : 'Hide'}
                        >
                          {showHiddenImages ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                          )}
                        </button>
                      </td>
                      <td className="px-2 py-3">
                        <img src={img.url} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" loading="lazy" />
                      </td>
                      <td className="px-4 py-3">
                        <a href={img.url} target="_blank" rel="noopener noreferrer" className="text-navy hover:text-red underline break-all text-xs">
                          {img.url}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-navy/10 text-navy">
                          {img.domain}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          {img.sources.slice(0, 3).map((s) => (
                            <a key={s} href={s} target="_blank" rel="noopener noreferrer" className="text-xs text-navy hover:text-red underline">{s}</a>
                          ))}
                          {img.sources.length > 3 && (
                            <span className="text-xs text-gray">+{img.sources.length - 3} more</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {sortedImages.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-gray">No images found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
