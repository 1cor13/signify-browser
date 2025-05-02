
async function waitOperation(
    client,
    op,
    signal = undefined
) {
    if (typeof op === 'string') {
        op = await client.operations().get(op);
    }

    op = await client
        .operations()
        .wait(op, { signal: signal ?? AbortSignal.timeout(30000) });
    await deleteOperation(client, op);

    return op;
}

async function deleteOperation(
    client,
    op
) {
    if (op.metadata?.depends) {
        await deleteOperation(client, op.metadata.depends);
    }

    await client.operations().delete(op.name);
}







	await signify.ready();
	console.log('Signify is ready:', signify);

	const url = 'http://127.0.0.1:3901';
	const bootUrl = 'http://127.0.0.1:3903';
	const bran1 = signify.randomPasscode();
	const bran2 = signify.randomPasscode();

	const allieClient = new signify.SignifyClient(
		url,
		bran1,
		signify.Tier.low,
		bootUrl
	);
	await allieClient.boot();
	await allieClient.connect();

	const brettClient = new signify.SignifyClient(
		url,
		bran2,
		signify.Tier.low,
		bootUrl
	);
	await brettClient.boot();
	await brettClient.connect();

	const icpResult1 = await allieClient
    .identifiers()
    .create('aid1', {});
	await waitOperation(allieClient, await icpResult1.op());

	const rpyResult1 = await allieClient
		.identifiers()
		.addEndRole('aid1', 'agent', allieClient?.agent?.pre);
	await waitOperation(allieClient, await rpyResult1.op());

	const oobi1 = await allieClient.oobis().get('aid1', 'agent');

	const oobiOp = await brettClient.oobis().resolve(oobi1.oobis[0], 'aid1');
	await waitOperation(brettClient, oobiOp);

	const aid1 = await allieClient.identifiers().get('aid1');
	const keeper1 = await allieClient.manager?.get(aid1);
	const message = "Test message";
	const messageBytes = signify.b(message);
	const keeper1Sign = await keeper1.sign(messageBytes);
	// console.log("Signed Messaged::::", keeper1Sign);
	const signature = keeper1Sign[0];
	console.log('signature', signature);


	// Brett verifies Allie's Signature
	const aid1StateBybrettClient = await brettClient.keyStates().get(aid1.prefix);
	const siger = new signify.Siger({qb64: signature});
	const verfer = new signify.Verfer({
		qb64: aid1StateBybrettClient[0].k[0]
	});
	const verificationResult = verfer.verify(siger.raw, signify.b(message));
	console.log('verificationResult', verificationResult);