export const randomResult = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

export const setupShadows = (object) => {
    object.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
}

export const get = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API didn't answer as expected");
        return await response.json();
    } catch (error) {
        console.log("Couldn't fetch!");
        throw error;
    }
}