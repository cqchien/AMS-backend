import bcrypt from 'bcrypt';

export class UtilsService {
    /**
     * convert entity to dto class instance
     * @param {{new(entity: E, options: any): T}} model
     * @param {E[] | E} entity
     * @param options
     * @returns {T[] | T}
     */
    public static toDto<T, E>(
        model: new (entity: E, options?: any) => T,
        entity: E,
        options?: Record<string, any>,
    ): T;
    public static toDto<T, E>(
        model: new (entity: E, options?: any) => T,
        entity: E[],
        options?: Record<string, any>,
    ): T[];
    public static toDto<T, E>(
        model: new (entity: E, options?: any) => T,
        entity: E | E[],
        options?: Record<string, any>,
    ): T | T[] {
        if (Array.isArray(entity)) {
            return entity.map((u) => new model(u, options));
        }

        return new model(entity, options);
    }

    /**
     * generate hash from password or string
     * @param {string} password
     * @returns {string}
     */
    static generateHash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    /**
     * generate random string
     * @param length
     */
    static generateRandomString(length: number): string {
        return Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, '')
            .substr(0, length);
    }

    /**
     * generate random integer number
     * @param {number} min
     * @param {number} max
     * @returns {number}}
     */

    static generateRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    static validateHash(password: string, hash: string): Promise<boolean> {
        if (!password || !hash) {
            return Promise.resolve(false);
        }
        return bcrypt.compare(password, hash);
    }

    /**
     * Generate password with default string
     * @param {string} code
     * @return {string} password
     */
    static generatePassword(code: string): string {
        const randomNumber = this.generateRandomInteger(100000, 99999);
        return code + randomNumber.toString();
    }
}
