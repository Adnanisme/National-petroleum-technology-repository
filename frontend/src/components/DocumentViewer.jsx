import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DocumentViewer = ({ document, content, onDownload }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF load error:', error);
    setError('Failed to load PDF document');
    setLoading(false);
  };

  const goToPrevPage = () => setPageNumber(page => Math.max(1, page - 1));
  const goToNextPage = () => setPageNumber(page => Math.min(numPages, page + 1));
  const zoomIn = () => setScale(scale => Math.min(2.0, scale + 0.2));
  const zoomOut = () => setScale(scale => Math.max(0.5, scale - 0.2));

  const renderPDFViewer = () => {
    if (!document?.file_path) {
      return (
        <div className="flex items-center justify-center h-full text-slate-500">
          <AlertCircle className="h-8 w-8 mr-2" />
          <span>PDF file path not available</span>
        </div>
      );
    }

    const pdfUrl = `http://127.0.0.1:8001/storage/${document.file_path}`;

    return (
      <div className="flex flex-col h-full">
        {/* PDF Controls */}
        <div className="flex items-center justify-between p-3 border-b bg-slate-50">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {pageNumber} of {numPages || '?'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={zoomOut} disabled={scale <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <Button variant="outline" size="sm" onClick={zoomIn} disabled={scale >= 2.0}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto bg-slate-100 p-4">
          <div className="flex justify-center">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="ml-2 text-slate-600">Loading PDF...</span>
              </div>
            )}
            
            {error && (
              <div className="flex items-center justify-center py-8 text-red-600">
                <AlertCircle className="h-8 w-8 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            {!error && (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                  </div>
                }
                className="shadow-lg"
              >
                <Page 
                  pageNumber={pageNumber} 
                  scale={scale}
                  renderAnnotationLayer={true}
                  renderTextLayer={true}
                />
              </Document>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTextViewer = () => {
    if (!content) {
      return (
        <div className="flex items-center justify-center h-full text-slate-500">
          <FileText className="h-8 w-8 mr-2" />
          <span>No content available</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Text Controls */}
        <div className="flex items-center justify-between p-3 border-b bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-600" />
            <span className="text-sm font-medium">{document?.file_name}</span>
            <span className="text-xs text-slate-500 uppercase">
              {document?.file_type} Document
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Text Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white shadow-sm border rounded-lg m-4">
            <div className="p-8">
              <div className="prose prose-slate max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-800">
                  {content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderJSONViewer = () => {
    if (!content) return renderTextViewer();

    try {
      const jsonData = JSON.parse(content);
      
      return (
        <div className="flex flex-col h-full">
          {/* JSON Controls */}
          <div className="flex items-center justify-between p-3 border-b bg-slate-50">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium">{document?.file_name}</span>
              <span className="text-xs text-slate-500 uppercase">JSON Data</span>
            </div>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          {/* JSON Content */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-6xl mx-auto bg-white shadow-sm border rounded-lg m-4">
              <div className="p-6">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  <code>{JSON.stringify(jsonData, null, 2)}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      );
    } catch (e) {
      return renderTextViewer();
    }
  };

  const renderCSVViewer = () => {
    if (!content) return renderTextViewer();

    try {
      const lines = content.split('\n').filter(line => line.trim());
      const headers = lines[0]?.split(',').map(h => h.trim()) || [];
      const rows = lines.slice(1).map(line => 
        line.split(',').map(cell => cell.trim())
      );

      return (
        <div className="flex flex-col h-full">
          {/* CSV Controls */}
          <div className="flex items-center justify-between p-3 border-b bg-slate-50">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium">{document?.file_name}</span>
              <span className="text-xs text-slate-500 uppercase">CSV Data</span>
              <span className="text-xs text-slate-500">
                ({rows.length} rows, {headers.length} columns)
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          {/* CSV Content */}
          <div className="flex-1 overflow-auto">
            <div className="m-4">
              <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        {headers.map((header, index) => (
                          <th
                            key={index}
                            className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {rows.slice(0, 100).map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-50">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3 text-sm text-slate-900">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {rows.length > 100 && (
                    <div className="p-4 text-center text-sm text-slate-500 bg-slate-50">
                      Showing first 100 rows of {rows.length} total rows
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } catch (e) {
      return renderTextViewer();
    }
  };

  const renderUnsupportedViewer = () => (
    <div className="flex flex-col items-center justify-center h-full text-slate-500 bg-slate-50">
      <FileText className="h-16 w-16 mb-4 opacity-50" />
      <h3 className="text-lg font-semibold mb-2">Preview Not Available</h3>
      <p className="text-sm text-center mb-4 max-w-md">
        Preview is not supported for {document?.file_type?.toUpperCase()} files.
        Please download the document to view its contents.
      </p>
      <Button onClick={onDownload} className="bg-emerald-600 hover:bg-emerald-700">
        <Download className="h-4 w-4 mr-2" />
        Download Document
      </Button>
    </div>
  );

  // Main render logic
  if (!document) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <AlertCircle className="h-8 w-8 mr-2" />
        <span>No document selected</span>
      </div>
    );
  }

  const fileType = document.file_type?.toLowerCase();

  switch (fileType) {
    case 'pdf':
      return renderPDFViewer();
    case 'json':
      return renderJSONViewer();
    case 'csv':
      return renderCSVViewer();
    case 'txt':
      return renderTextViewer();
    default:
      return renderUnsupportedViewer();
  }
};

export default DocumentViewer;