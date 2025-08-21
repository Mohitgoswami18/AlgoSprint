import { ApiError } from "../utils/apiError.js";

const dashboardController = (req, res) => {
    const { username } = req.body;
    if(!username) {
        throw new ApiError ()
    }
}

export { dashboardController }