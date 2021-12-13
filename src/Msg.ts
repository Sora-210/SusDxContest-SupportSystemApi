interface Message {
    status:string
    message:string
}
class Msg {
    public static NotFound:Message = {
        status: "Info",
        message: "Not Found"
    }
    public static NotEnoughProp:Message = {
        status: "Error",
        message: "Not Enough Property"
    }
    public static ServerError:Message = {
        status: "Error",
        message: "UndefinedServerError"
    }
    public static getMsg (status:string, message:string):Message {
        return {
            "status": status,
            "message": message
        }
    }
}

export {Msg}