export const config = () => {
    for(const arg of process.argv) {
        if (arg.includes('--config=')) {
            return require(`../configs/${arg.split('=')[1]}.json`)
        }
    }
    return require(`../configs/default.json`)
}

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

