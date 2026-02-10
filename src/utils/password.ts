import bcrypt from "bcrypt";
import "dotenv/config";

const SALT_ROUNDS = typeof process.env.SALT_ROUNDS === "string" ? Number(process.env.SALT_ROUNDS) : 10;

export async function hashPassword(password: string) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}
