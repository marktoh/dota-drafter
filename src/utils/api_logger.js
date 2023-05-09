function logApi(name, error, data, additional) {
    if (error) {
        console.error(`logApi: ${name} error`, error, additional)
    } else {
        console.info(`logApi: ${name} success`, data, additional);
    }
}

export {
    logApi
}