import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const jwtHelper = {
    /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
    generateToken(id) {
        const token = jwt.sign({
            userId: id
        },
            process.env.SECRET, { expiresIn: '7d' }
        );
        return token;
    }
}

export default jwtHelper