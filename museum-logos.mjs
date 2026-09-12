import * as THREE from 'three';

// Image-reference empties export their positions, but no visible surface.
// Restore only the two confirmed logo markers; leave exhibit materials intact.
export async function addMuseumLogos(model) {
  const names = ['Vazio.009', 'Vazio.010'];
  const markers = names.map(name => {
    let found;
    model.traverse(object => {
      if (object.userData.name === name || object.name === name || object.name === THREE.PropertyBinding.sanitizeNodeName(name)) found = object;
    });
    return found;
  });
  if (markers.some(marker => !marker)) throw new Error('Museum logo markers are missing.');
  const texture = await new THREE.TextureLoader().loadAsync('./robinhood-chain-icon.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, toneMapped: false});
  const geometry = new THREE.CircleGeometry(1.25, 96);
  model.updateMatrixWorld(true);
  for (const marker of markers) {
    const logo = new THREE.Mesh(geometry, material);
    logo.name = 'Robinhood logo - ' + marker.name;
    marker.getWorldPosition(logo.position);
    model.worldToLocal(logo.position);
    // Face the room from each opposing wall. Circular mesh excludes dark corners.
    logo.rotation.y = logo.position.z > 0 ? Math.PI : 0;
    logo.position.z += logo.position.z > 0 ? -0.03 : 0.03;
    model.add(logo);
  }
}
