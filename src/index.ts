import * as signify from 'signify-ts';

(window as any).signify = signify; // Expose the library to the global scope

const run = async () => {
    await signify.ready();
    console.log("Signify client is ready");
};

run().catch((err) => {
    console.error("Error running Signify client:", err);
});