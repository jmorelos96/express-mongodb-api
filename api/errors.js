const messages = (path, err = null) => {
    return {
        401:{
            message: "Not Authenticated"
        },
        403:{
            message: "Param or body from request are not invalid",
            error: (err) ? err : null
        },
        409:{
            message: `Incorrect endpoint ${path}`
        },
        500: {
            message: "Server Error",
            error: (err) ? err : null
        }
    }
}

module.exports = {
    messages
}