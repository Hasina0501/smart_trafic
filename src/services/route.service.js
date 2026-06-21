const prisma = require("../prisma");

const buildGraph = (roads) => {
  const graph = {};

  roads.forEach((road) => {
    const start = `${road.startLat},${road.startLng}`;
    const end = `${road.endLat},${road.endLng}`;

    if (!graph[start]) {
      graph[start] = [];
    }

    if (!graph[end]) {
      graph[end] = [];
    }

    graph[start].push({
      node: end,
      cost: road.distance * road.traffic
    });

    graph[end].push({
      node: start,
      cost: road.distance
    });
  });

  return graph;
};
const updateTraffic = async (id, traffic) => {
  return await prisma.road.update({
    where: {
      id
    },
    data: {
      traffic
    }
  });
};
const calculate = async (start, end) => {
  const roads = await prisma.road.findMany({
    where: {
      isClosed: false
    }
  });

  const graph = buildGraph(roads);

  const distances = {};
  const previous = {};
  const visited = new Set();

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
  });

  distances[start] = 0;

  while (true) {
    let current = null;

    Object.keys(distances).forEach((node) => {
      if (
        !visited.has(node) &&
        (current === null ||
          distances[node] < distances[current])
      ) {
        current = node;
      }
    });

    if (current === null) {
      break;
    }

    if (current === end) {
      break;
    }

    visited.add(current);

    graph[current].forEach((neighbor) => {
      const newDistance =
        distances[current] + neighbor.cost;

      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        previous[neighbor.node] = current;
      }
    });
  }

  const path = [];

  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    distance: distances[end],
    path
  };
};

const getRoads = async () => {
  return await prisma.road.findMany();
};

const closeRoad = async (id) => {
  return await prisma.road.update({
    where: {
      id
    },
    data: {
      isClosed: true
    }
  });
};

const openRoad = async (id) => {
  return await prisma.road.update({
    where: {
      id
    },
    data: {
      isClosed: false
    }
  });
};

module.exports = {
  calculate,
  getRoads,
  closeRoad,
  openRoad,
  updateTraffic
};