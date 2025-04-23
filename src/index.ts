import * as signify from 'signify-ts';

(window as any).signify = signify; // Expose the library to the global scope

const run = async () => {
    await signify.ready();
    const bran = signify.randomPasscode();
    console.log("BRAN PASSWORD:::::::::", bran);

    const url = 'http://127.0.0.1:3901';
    const boot_url = 'http://127.0.0.1:3903';
    const actualSignifyClient = new signify.SignifyClient(
        url,
        bran,
        signify.Tier.low,
        boot_url
    );

    // const actualSignifyClient = new signify.SignifyClient("http://localhost:3901");
    actualSignifyClient.connect().then(() => {
        console.log("Connected to Signify!");
    });
};

run().catch((err) => {
    console.error("Error running Signify client:", err);
});