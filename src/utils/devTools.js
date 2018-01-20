try {
    const { connectToDevTools } = require('react-devtools-core');

    connectToDevTools({
        isAppActive() {
            return true;
        },
        host: 'localhost',
        port: 8097,
        resolveRNStyle: null,
    });
} catch (err) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(err);
        console.warn('WARNING: the `ws` package must be installed to use `react-devtools`.');
    }
}
