const getConfig = () => {
    for(const arg of process.argv) {
        if (arg.includes('--config=')) {
            return require(`../configs/${arg.split('=')[1]}.json`)
        }
    }
    console.log('you need to specify a config json via the command line argument --config')
}

export const config = getConfig();

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

