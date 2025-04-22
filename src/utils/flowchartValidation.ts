import { Node, Edge } from "reactflow";

export interface ValidationResult {
  valid: boolean;
  message: string;
  issues?: ValidationIssue[];
}

export interface ValidationIssue {
  type: "error" | "warning";
  message: string;
  nodeIds?: string[];
  edgeIds?: string[];
}

export function validateFlowchart(
  nodes: Node[],
  edges: Edge[]
): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Check if there are nodes
  if (nodes.length === 0) {
    return {
      valid: false,
      message: "Flowchart is empty",
      issues: [{ type: "error", message: "Flowchart has no nodes" }],
    };
  }

  // Check if there's a start node
  const startNodes = nodes.filter((node) => node.type === "start");
  if (startNodes.length === 0) {
    issues.push({
      type: "error",
      message: "Missing start node",
    });
  } else if (startNodes.length > 1) {
    issues.push({
      type: "error",
      message: "Multiple start nodes detected",
      nodeIds: startNodes.map((node) => node.id),
    });
  }

  // Check if there's at least one end node
  const endNodes = nodes.filter((node) => node.type === "end");
  if (endNodes.length === 0) {
    issues.push({
      type: "error",
      message: "Missing end node",
    });
  }

  // Check for unconnected nodes
  const connectedNodeIds = new Set<string>();

  // Add all source and target node IDs from edges
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  // Find nodes not in the connected set
  const unconnectedNodes = nodes.filter(
    (node) => !connectedNodeIds.has(node.id)
  );

  if (unconnectedNodes.length > 0) {
    issues.push({
      type: "error",
      message: `${unconnectedNodes.length} unconnected node(s) detected`,
      nodeIds: unconnectedNodes.map((node) => node.id),
    });
  }

  // Check if start node has incoming connections
  if (startNodes.length === 1) {
    const startNodeId = startNodes[0].id;
    const startNodeIncoming = edges.filter(
      (edge) => edge.target === startNodeId
    );
    if (startNodeIncoming.length > 0) {
      issues.push({
        type: "error",
        message: "Start node should not have incoming connections",
        nodeIds: [startNodeId],
        edgeIds: startNodeIncoming.map((edge) => edge.id),
      });
    }
  }

  // Check if end nodes have outgoing connections
  for (const endNode of endNodes) {
    const endNodeOutgoing = edges.filter((edge) => edge.source === endNode.id);
    if (endNodeOutgoing.length > 0) {
      issues.push({
        type: "error",
        message: "End node has outgoing connections",
        nodeIds: [endNode.id],
        edgeIds: endNodeOutgoing.map((edge) => edge.id),
      });
    }
  }

  // Check for nodes without outputs (except end nodes)
  const nonEndNodes = nodes.filter((node) => node.type !== "end");
  for (const node of nonEndNodes) {
    const outgoingEdges = edges.filter((edge) => edge.source === node.id);
    if (outgoingEdges.length === 0) {
      issues.push({
        type: "warning",
        message: `Node "${node.data.label}" has no outgoing connections`,
        nodeIds: [node.id],
      });
    }
  }

  // Check for cycles
  if (startNodes.length === 1) {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const cycleEdges: string[] = [];

    const findCycle = (nodeId: string, path: Edge[] = []): boolean => {
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        recursionStack.add(nodeId);

        const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
        for (const edge of outgoingEdges) {
          const currentPath = [...path, edge];
          if (
            !visited.has(edge.target) &&
            findCycle(edge.target, currentPath)
          ) {
            return true;
          } else if (recursionStack.has(edge.target)) {
            cycleEdges.push(...currentPath.map((e) => e.id));
            return true;
          }
        }
      }
      recursionStack.delete(nodeId);
      return false;
    };

    if (findCycle(startNodes[0].id)) {
      issues.push({
        type: "warning",
        message: "Cycle detected in flowchart",
        edgeIds: [...new Set(cycleEdges)], // Remove duplicates
      });
    }
  }

  // Check for unreachable nodes from start
  if (startNodes.length === 1) {
    const startNodeId = startNodes[0].id;
    const reachableNodes = new Set<string>();

    const traverseNodes = (nodeId: string) => {
      reachableNodes.add(nodeId);

      const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
      for (const edge of outgoingEdges) {
        if (!reachableNodes.has(edge.target)) {
          traverseNodes(edge.target);
        }
      }
    };

    traverseNodes(startNodeId);

    const unreachableNodes = nodes.filter(
      (node) => !reachableNodes.has(node.id)
    );
    if (unreachableNodes.length > 0) {
      issues.push({
        type: "warning",
        message: `${unreachableNodes.length} node(s) unreachable from start`,
        nodeIds: unreachableNodes.map((node) => node.id),
      });
    }
  }

  // Return validation result
  const errorIssues = issues.filter((issue) => issue.type === "error");
  if (errorIssues.length > 0) {
    return {
      valid: false,
      message: errorIssues[0].message,
      issues,
    };
  }

  if (issues.length > 0) {
    return {
      valid: true,
      message: "Flowchart valid with warnings",
      issues,
    };
  }

  return {
    valid: true,
    message: "Flowchart is valid",
  };
}
