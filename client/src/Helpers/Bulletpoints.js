const BULLETPOINTS = [ '▶', '●', '■', '◆', '◇', '✱', '⚽' ];

export default function getBulletPoint(depth) {
  const i = depth % BULLETPOINTS.length;
  return BULLETPOINTS[i];
}
