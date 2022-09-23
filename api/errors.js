const messages = (path, err = null) => {
    return {
        401:{
            message: "Not Authenticated"
        },
        409:{
            message: `Incorrect endpoint ${path}`
        },
        500: {
            message: "Server Error",
            stackError: (err) ? err : null
        }
    }
}

module.exports = {
    messages
}