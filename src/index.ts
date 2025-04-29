// import * as signify from 'signify-ts';

export * from 'signify-ts'; // Export all from signify-ts
export * from './utils'; // Export all from utils
/*(window as any).signify = signify; // Expose the library to the global scope

const run = async () => {
    await signify.ready();
    console.log("Signify client is ready");
};

run().catch((err) => {
    console.error("Error running Signify client:", err);
});*/