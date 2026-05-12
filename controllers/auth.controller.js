import bcrypt from "bcrypt";
export const register = (req, res) => {
const { username, email, password } = req.body;

// password hashing by bcrypt
const hashPassword =bcrypt.hash(password,10)






}
export const login = (req, res) => {

}
export const logout = (req, res) => {
    
}