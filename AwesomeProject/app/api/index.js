var API_URL ="http://localhost:3000/v1"

exports.SIGNIN_URL = `${API_URL}/signin`
exports.SIGNIN_URL_WITH_FACEBOOK = `${API_URL}/facebook_auth`
exports.SIGNUP_URL = `${API_URL}/signup`
exports.ADD_QUESTION = `${API_URL}/createQuestion`
exports.GET_QUESTION = `${API_URL}/findAllQuestion`
exports.GET_QUESTION_BY_CATEGORY = `${API_URL}/findQuestionByCategory/`
exports.GET_QUESTION_BY_LOCATION = `${API_URL}/findQuestionByLocation/`
exports.UPDATE_MODEL = `${API_URL}/updateReaction/`
exports.UPDATE_FAVOURITE_MODE = `${API_URL}/updateFavourite/`
exports.ADD_ANSWER = `${API_URL}/createAnswer/`
exports.GET_ANSWERS = `${API_URL}/findAnswers/`
exports.SEARCH_QUESTION = `${API_URL}/searchByWord/`