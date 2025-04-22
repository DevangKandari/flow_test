import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useFlowchart } from "../contexts/FlowchartContext";
import { useToast } from "../hooks/useToast";

const AppHeader: React.FC = () => {
  const {
    newFlowchart,
    currentFlowchart,
  } = useFlowchart();
  const { toast } = useToast();

  const handleNew = () => {
    if (
      !currentFlowchart ||
      !currentFlowchart.nodes.length ||
      window.confirm("Create new flowchart? Unsaved changes will be lost.")
    ) {
      newFlowchart();
      toast({
        title: "New Flowchart",
        description: "Created a new flowchart",
        type: "info",
      });
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
      <div className="flex items-center space-x-2">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          className="text-primary-500"
        >
          <circle
            cx="12"
            cy="18"
            r="3"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="6"
            cy="6"
            r="3"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="6"
            r="3"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity="0.2"
            strokeWidth="2"
          />
          <line
            x1="6"
            y1="9"
            x2="6"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="6"
            x2="12"
            y2="15"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="18"
            y1="9"
            x2="18"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <h1 className="text-xl font-bold">Flowchart Maker</h1>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleNew}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="New Flowchart"
        >
          <PlusCircle size={20} />
        </button>
        {/* <button
          onClick={handleSave}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Save Flowchart"
          disabled={isSaving}
        > */}
        {/* <Save size={20} className={isSaving ? "animate-pulse" : ""} />
        </button>
        <button
          onClick={handleImport}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Open Flowchart"
        >
          <FolderOpen size={20} />
        </button>
        <button
          onClick={handleExport}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Export Flowchart"
        >
          <FileDown size={20} />
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Help"
        >
          <HelpCircle size={20} />
        </button> */}
      </div>
    </header>
  );
};

export default AppHeader;
