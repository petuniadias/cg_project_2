export const randomResult = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

/** * Executes the callback on the 3D object and all its descendants.
 * Usefull for GROUPS so you don't have to set castShadow and receiveShadow 
 * on each descendant manually.
*/
export const setupShadows = (object) => {
    object.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
}