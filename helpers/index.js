export const zoomCamera = (camera, distance, duration) => {
  const zoomStart = camera.position.z;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;
    const currentDistance = zoomStart - progress * distance;
    camera.position.z = currentDistance;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

export const handleResize = (renderer, camera) => {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
