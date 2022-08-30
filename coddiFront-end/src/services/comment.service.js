import axios from "axios";
const API_URL = "http://localhost:8080/api/";
class CommentService {
  createComment(data) {
    return axios.post(API_URL + "comment", data);
  }
  getComments(questionId) {
    return axios.get(API_URL + `comment?questionId=${questionId}`);
  }
}
export default new CommentService();
