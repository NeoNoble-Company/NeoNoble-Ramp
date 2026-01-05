import React, { useState } from 'react';
import { Layers, Download, FileText, Presentation, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import apiService from '../../services/api';

const SlideHeader = ({ slideNumber, totalSlides }) => {
  const [exporting, setExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const handleExport = async (type) => {
    setExporting(true);
    setExportType(type);
    try {
      if (type === 'pptx') {
        await apiService.exportPPTX();
      } else if (type === 'pdf') {
        await apiService.exportPDF();
      }
    } catch (error) {
      console.error(`Failed to export ${type}:`, error);
      alert(`Failed to export ${type.toUpperCase()}. Please try again.`);
    } finally {
      setExporting(false);
      setExportType(null);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">NeoNoble Ramp</h1>
            <p className="text-xs text-slate-500">Partnership Pitch Deck</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="h-1 w-32 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 ease-out"
                style={{ width: `${((slideNumber + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                disabled={exporting}
              >
                {exporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={() => handleExport('pptx')}
                disabled={exporting}
                className="gap-2 cursor-pointer"
              >
                <Presentation className="w-4 h-4 text-orange-500" />
                <span>PowerPoint (.pptx)</span>
                {exporting && exportType === 'pptx' && (
                  <Loader2 className="w-3 h-3 animate-spin ml-auto" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleExport('pdf')}
                disabled={exporting}
                className="gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>PDF Document (.pdf)</span>
                {exporting && exportType === 'pdf' && (
                  <Loader2 className="w-3 h-3 animate-spin ml-auto" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <a
            href="https://crypto-onramp-2.emergent.host"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors hidden sm:block"
          >
            Visit Platform
          </a>
        </div>
      </div>
    </header>
  );
};

export default SlideHeader;
