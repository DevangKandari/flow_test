import React from "react";
import { MoreHorizontal } from "lucide-react";
import { useFlowchart } from "../contexts/FlowchartContext";
import { FileText, Trash2 } from "lucide-react";

const Sidebar: React.FC = () => {

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Flowchart Elements</h2>
        <div className="space-y-2">
          <div
            className="flex items-center p-2 bg-accent-100 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-700 rounded-md cursor-move hover:bg-accent-200 dark:hover:bg-accent-800/50 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, "start")}
          >
            <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">Start</span>
            </div>
            <span className="text-sm font-medium">Start</span>
          </div>

          <div
            className="flex items-center p-2 bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 rounded-md cursor-move hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, "process")}
          >
            <div className="w-8 h-8 rounded-md bg-primary-500 flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">Proc</span>
            </div>
            <span className="text-sm font-medium">Process</span>
          </div>

          <div
            className="flex items-center p-2 bg-warning-100 dark:bg-warning-900/30 border border-warning-200 dark:border-warning-700 rounded-md cursor-move hover:bg-warning-200 dark:hover:bg-warning-800/50 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, "decision")}
          >
            <div className="w-8 h-8 transform rotate-45 bg-warning-500 flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold transform -rotate-45">
                ?
              </span>
            </div>
            <span className="text-sm font-medium">Decision</span>
          </div>

          <div
            className="flex items-center p-2 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-md cursor-move hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, "io")}
          >
            <div className="w-8 h-8 parallelogram bg-purple-500 flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">I/O</span>
            </div>
            <span className="text-sm font-medium">Input/Output</span>
          </div>

          <div
            className="flex items-center p-2 bg-error-100 dark:bg-error-900/30 border border-error-200 dark:border-error-700 rounded-md cursor-move hover:bg-error-200 dark:hover:bg-error-800/50 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, "end")}
          >
            <div className="w-8 h-8 rounded-full bg-error-500 flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">End</span>
            </div>
            <span className="text-sm font-medium">End</span>
          </div>
        </div>
      </div>

      {/* <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2 flex justify-between items-center">
          <span>Saved Flowcharts</span>
          <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
            {savedFlowcharts.length}
          </span>
        </h2>

        {savedFlowcharts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText size={40} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No saved flowcharts</p>
            <p className="text-xs mt-1">
              Create and save your first flowchart!
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {savedFlowcharts.map((flowchart) => (
              <li
                key={flowchart.id}
                className="p-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <button
                    className="flex-1 text-left text-sm font-medium truncate"
                    onClick={() => loadSavedFlowchart(flowchart.id)}
                  >
                    {flowchart.name || "Untitled Flowchart"}
                  </button>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            `Delete "${
                              flowchart.name || "Untitled Flowchart"
                            }"?`
                          )
                        ) {
                          deleteFlowchart(flowchart.id);
                        }
                      }}
                      className="p-1 text-gray-500 hover:text-error-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(flowchart.updatedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div> */}

      {/* <div className="w-8 h-8 bg-purple-500 flex items-center justify-center mr-3 skew-x-[-12deg]">
        <span className="text-white text-xs font-bold skew-x-[12deg]">I/O</span>
      </div> */}
    </div>
  );
};

export default Sidebar;
